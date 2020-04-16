const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {
        
        // Informando qual a leitura no Postbird trazendo todos cadastrados e estruturando quais alunos cada professor tem em ordem decrescente
        db.query(`
            SELECT instructors.*, count(members) AS total_students
            FROM instructors
            LEFT JOIN members ON (members.instructor_id = instructors.id)
            GROUP BY instructors.id
            ORDER BY total_students DESC`, function(err, results){
            // throw é um outro meio de identificar o erro e informar
            if(err)  throw `Database Error! ${err}`
            
            // O result é o resultado, o row é um array onde temos o valores.
            callback(results.rows)
        })

    },
    create(data, callback) {

        // Criando a query no postbird com os campos do formulário. Os values são referente os placeholders
        const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        
        // Tratamos todas os values igual as desestruturação do req.body
        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).iso,
            date(Date.now()).iso
        ]
        
        // Informando onde vamos salvar e onde iremos redirecionar após a criação
        db.query(query, values, function(err, results){
            if(err)  throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){
        
        // Buscando um único dado cadastrado no banco 
        db.query(`
            SELECT * 
            FROM instructors 
            WHERE id = $1`, [id], function(err, results){
                if(err)  throw `Database Error! ${err}`
                callback(results.rows[0])
        })
    },
    findBy(filter, callback){
        // Informando qual a leitura no Postbird trazendo todos cadastrados e estruturando quais alunos cada professor tem em ordem decrescente
        db.query(`
            SELECT instructors.*, count(members) AS total_students
            FROM instructors
            LEFT JOIN members ON (members.instructor_id = instructors.id)
            WHERE instructors.name ILIKE '%${filter}%'
            OR instructors.services ILIKE '%${filter}%'
            GROUP BY instructors.id
            ORDER BY total_students DESC`, function(err, results){
            // throw é um outro meio de identificar o erro e informar
            if(err)  throw `Database Error! ${err}`
            
            // O result é o resultado, o row é um array onde temos o valores.
            callback(results.rows)
        })
    },
    update(data, callback){

        // Meio de atualizar os dados no banco Postbird, nunca realizar sem o WHERE id, pois o mesmo é para informar a alteração única.
        const query = `
        UPDATE instructors SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            gender=($4),
            services=($5)
        WHERE id = $6
        `
        // Informando o que vou pegar dos values
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]

        // Realizando a escrita no data base
        db.query(query, values, function(err, results){
            if(err)  throw `Database Error! ${err}`
            
            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM instructors WHERE id = $1`, [id], function(err,results){
            if(err)  throw `Database Error! ${err}`

            return callback()

        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `
                (SELECT count(*) from instructors
            ) AS total`

        if(filter){

            filterQuery = `
            WHERE instructors.name ILIKE '%${filter}%'
            OR instructors.services ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM instructors
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT instructors.*, ${totalQuery}, count (members) as total_students
        FROM instructors
        LEFT JOIN members ON (instructors.id = members.instructor_id)
        ${filterQuery}
        GROUP BY instructors.id LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if (err) throw  `Database Error ${err}`

            callback(results.rows)
        })
    }
}