const db = require ('../../config/db')
const { date } =  require ('../../lib/utils')

module.exports = {
    all() {
        return db.query(`
        SELECT receipts.*, chefs.name AS chef_name
        FROM receipts
        LEFT JOIN chefs ON (receipts.chef_id = chefs.id)
        ORDER BY created_at DESC`)

    },
    create(data) {

        const query = `
            INSERT INTO receipts (
                title,
                ingredients,
                preparation,
                information,
                chef_id,
                user_id,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef,
            data.user_id || 1,
            date(Date.now()).iso
        ]

        return db.query(query, values)
        
    },
    find(id) {

        return db.query(`
        SELECT receipts.*, chefs.name AS chef_name
        FROM receipts 
        LEFT JOIN chefs ON (receipts.chef_id = chefs.id)
        WHERE receipts.id = $1`, [id])

    },
    findBy(filter){

        return db.query(`
            SELECT receipts.*, chefs.name AS chef_name
            FROM receipts
            LEFT JOIN chefs ON (receipts.chef_id = chefs.id)
            WHERE receipts.title ILIKE '%${filter}%'`, function(err, results){
            if(err) throw `Database error! ${err}`
        })
    },
    update(data){

        const query = `
        UPDATE receipts SET
            title=($1),
            ingredients=($2),
            preparation=($3),
            information=($4),
            chef_id=($5)
        WHERE id = $6
        `

        const values = [
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.chef,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id){
        return db.query(` DELETE FROM receipts WHERE id = $1`, [id])
    },
    chefsSelectOptions(){
        return db.query(`SELECT name, id  FROM chefs`)
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
            OR chefs.name ILIKE '%${filter}%'
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