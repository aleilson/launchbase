const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {
        
        // Informando qual a leitura no Postbird trazendo todos cadastrados
        db.query(`SELECT * FROM members ORDER BY name ASC`, function(err, results){
            // throw é um outro meio de identificar o erro e informar
            if(err)  throw `Database Error! ${err}`
            
            // O result é o resultado, o row é um array onde temos o valores.
            callback(results.rows)
        })

    },
    create(data, callback) {

        // Criando a query no postbird com os campos do formulário. Os values são referente os placeholders
        const query = `
            INSERT INTO members (
                name,
                avatar_url,
                gender,
                email,
                birth,
                blood,
                weight,
                height,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `
        
        // Tratamos todas os values igual as desestruturação do req.body
        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.instructor
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
            SELECT members.*, instructors.name AS instructor_name
            FROM members 
            LEFT JOIN instructors ON (members.instructor_id = instructors.id)
            WHERE members.id = $1`, [id], function(err, results){
                if(err)  throw `Database Error! ${err}`
                callback(results.rows[0])
        })
    },
    update(data, callback){

        // Meio de atualizar os dados no banco Postbird, nunca realizar sem o WHERE id, pois o mesmo é para informar a alteração única.
        const query = `
        UPDATE members SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            gender=($4),
            email=($5),
            blood=($6),
            weight=($7),
            height=($8),
            instructor_id=($9)
        WHERE id = $10
        `
        // Informando o que vou pegar dos values
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.email,
            data.blood,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]

        // Realizando a escrita no data base
        db.query(query, values, function(err, results){
            if(err)  throw `Database Error! ${err}`
            
            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id], function(err,results){
            if(err)  throw `Database Error! ${err}`

            return callback()

        })
    },
    instructorsSelectOptions(callback){
        db.query(`SELECT name, id FROM instructors`, function(err, results){
            if(err) throw `Database Error ${err}`

            callback(results.rows)
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `
                (SELECT count(*) from members
            ) AS total`

        if(filter){

            filterQuery = `
            WHERE members.name ILIKE '%${filter}%'
            OR members.email ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM members
                ${filterQuery}
            ) AS total`
        }

        query = `
            SELECT members.*, ${totalQuery}
            FROM members
            ${filterQuery}
            LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if (err) throw  `Database Error ${err}`

            callback(results.rows)
        })
    }
}