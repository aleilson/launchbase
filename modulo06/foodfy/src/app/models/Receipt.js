const db = require ('../../config/db')
const { date } =  require ('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`
            SELECT receipts.*, chefs.name AS chef_name
            FROM receipts
            LEFT JOIN chefs ON (receipts.chef_id = chefs.id)`, function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })

    },
    create(data, callback ) {

        const query = `
            INSERT INTO receipts (
                image,
                title,
                ingredients,
                preparation,
                information,
                chef_id,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef.id,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){

            if(err) throw `Database error ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {

        db.query(`
        SELECT receipts.*, chefs.name AS chef_name
        FROM receipts 
        LEFT JOIN chefs ON (receipts.chef_id = chefs.id)
        WHERE receipts.id = $1`, [id], function(err, results){
            if(err) throw `Database error ${err}`

            callback(results.rows[0])
        })
    },
    findBy(filter, callback){

        db.query(`
            SELECT receipts.*, chefs.name AS chef_name
            FROM receipts
            LEFT JOIN chefs ON (receipts.chef_id = chefs.id)
            WHERE receipts.title ILIKE '%${filter}%'`, function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })

    },
    update(data, callback){

        const query = `
        UPDATE receipts SET
            image=($1),
            title=($2),
            ingredients=($3),
            preparation=($4),
            information=($5),
            chef_id=($6)
        WHERE id = $7
        `

        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database error ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(` DELETE FROM receipts WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database error ${err}`

            callback()
        })
    },
    chefsSelectOptions(callback){
        db.query(`SELECT name, id  FROM chefs`, function(err, results){
            if(err) throw `Database error ${err}`

            callback(results.rows)
        })
    },
    paginate(params){
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM receipts
            )  AS total`

        if( filter ) {

            filterQuery = `
            WHERE receipts.title ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM receipts
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT receipts.*, ${totalQuery} , chefs.name AS chef_name
        FROM receipts
        LEFT JOIN chefs ON (receipts.chef_id = chefs.id)
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `Database error! ${err}`

            callback(results.rows)
        })
    }
}