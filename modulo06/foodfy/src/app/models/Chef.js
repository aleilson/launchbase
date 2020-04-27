const db = require ('../../config/db')
const { date } =  require ('../../lib/utils')

module.exports = {

    all() {
        return db.query(`
            SELECT chefs.*, count(receipts) AS total_recipes
            FROM chefs
            LEFT JOIN receipts ON (chefs.id = receipts.chef_id)
            GROUP BY chefs.id
            ORDER BY total_recipes DESC
        `)

    },
    create(data) {

        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso
        ]

        return db.query(query, values)
    },
    find(id) {

        const query = `
            SELECT * 
            FROM chefs 
            WHERE id = $1
        `

        return db.query(query, [id])
    },
    recipesAll(id){

        const query = `
        SELECT * 
        FROM receipts 
        WHERE receipts.chef_id = $1`

        return db.query(query, [id]);
    },
    update(data){

        const query = `
        UPDATE chefs SET
            name=($1),
            avatar_url=($2)
        WHERE id = $3
        `

        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id){
        return db.query(` DELETE FROM chefs WHERE id = $1`, [id])
    }
}