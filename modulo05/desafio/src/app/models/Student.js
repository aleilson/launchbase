const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback){

        db.query(`
            SELECT * 
            FROM students
            ORDER BY name ASC `, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback){

        const query = `
            INSERT INTO students (
                name,
                avatar_url,
                email,
                birth,
                school_year,
                school_load,
                created_at,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            date(data.birth).iso,
            data.school_year,
            data.school_load,
            date(Date.now()).iso,   
            data.teacher
        ]
        
        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){

        db.query(`
        SELECT students.*, teachers.name AS teacher_name
        FROM students 
        LEFT JOIN teachers ON (students.teacher_id = teachers.id)
        WHERE students.id = $1`, [id], function(err, results){
            if(err) throw `Database Error! ${err}`
            callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
        UPDATE students SET
            name=($1),
            avatar_url=($2),
            email=($3),
            birth=($4),
            school_year=($5),
            school_load=($6),
            teacher_id=($7)
        WHERE id = $8
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            date(data.birth).iso,
            data.school_year,
            data.school_load,
            data.teacher,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err)  throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results){
            if(err)  throw `Database Error! ${err}`
            
            return callback()
        })
    },
    teachersSelectOptions(callback){
        db.query(`SELECT name, id FROM teachers`, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    paginate(params){
        const { filter, limit, offset, callback} = params

        let query = "",
            filterQuery = "",
            totalQuery = `
                (SELECT count(*) from students
            ) AS total`

        if(filter){

            filterQuery = `
            WHERE students.name ILIKE '%${filter}%'
            OR students.email ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM students
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT students.*, ${totalQuery}
        FROM students
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results){
            if(err) throw `Database Error ${err}`

            callback(results.rows)
        })
    }
}