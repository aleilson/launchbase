const db = require ('../../config/db')

module.exports = {

    all() {
        return db.query(`
            SELECT chefs.*, count(receipts) AS total_recipes
            FROM chefs
            LEFT JOIN receipts ON (receipts.chef_id = chefs.id)
            GROUP BY chefs.id
            ORDER BY total_recipes DESC
        `)

    },
    create(data) {
        try{
            const query = `
                INSERT INTO chefs (
                    name,
                    file_id
                ) VALUES ($1, $2)
                RETURNING id
            `

            const values = [
                data.name,
                data.fileId,
            ]

            return db.query(query, values)
        } catch (err) {
            throw new Error(err);
        }
    },
    find(id) {

        try {
            return db.query(`
              SELECT chefs.*, COUNT(receipts) AS total_recipes
              FROM chefs 
              LEFT JOIN receipts ON (receipts.chef_id = chefs.id)
              WHERE chefs.id = $1
              GROUP BY chefs.id`,
              [id]
            );
          } catch (err) {
            throw new Error(err);
        }
    },
    findRecipesByChef(id) {
        try {
          return db.query(`
            SELECT receipts.*
            FROM chefs
            LEFT JOIN receipts ON (receipts.chef_id = chefs.id)
            WHERE receipts.chef_id = $1
            ORDER BY receipts.id`,
            [id]
          );
        } catch (err) {
          throw new Error(err);
        }
    },
    recipesAll(id){

        const query = `
        SELECT * 
        FROM receipts 
        WHERE receipts.chef_id = $1`

        return db.query(query, [id]);
    },
    update(data){
        try{
            const query = `
            UPDATE chefs SET
                name=($1),
                file_id=($2)
            WHERE id = $3
            `

            const values = [
                data.name,
                data.fileId,
                data.id,
            ]

            return db.query(query, values)
        } catch (err) {
            throw new Error(err);
        }

    },
    delete(id){
        return db.query(` DELETE FROM chefs WHERE id = $1`, [id])
    }
}