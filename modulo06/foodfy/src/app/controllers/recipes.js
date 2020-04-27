const { age, date } =  require ('../../lib/utils')
const Receipt = require('../models/Receipt')
const File = require('../models/File')

module.exports = {

    index(req, res){
       Receipt.all()
       .then(function(results){
            const recipes = results.rows
            return res.render("admin/recipes/index", { recipes })

        }).catch(function(err){
            throw new Error(err)
        })
    },
    
    create(req, res){
        Receipt.chefsSelectOptions()
        .then(function(results){
            const chefOptions = results.rows
            return res.render("admin/recipes/create", { chefOptions })

        }).catch(function(err){
            throw new Error(err)
        })
    },

    async post(req, res){
        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please fill all fields')
            }
        }

        if(req.files.length == 0){
            return res.send('Please, send at least one image')
        }
    
        let results = await Receipt.create(req.body)
        const recipeId = results.rows[0].id

        const filesPromise = req.files.map(file => File.create({...file}))
        await Promise.all(filesPromise)
        
        return res.redirect(`/admin/recipes/${recipeId}/edit`)
    },

    async show(req, res){
        let results = await Receipt.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.send("Receipt not found!!")

        recipe.created_at = date(recipe.created_at).format
        return  res.render("admin/recipes/show", {recipe} )
    },

    async edit(req, res){
        let results = await Receipt.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.send("Receipt not found!!")

        results = await Receipt.chefsSelectOptions()
        const chefOptions = results.rows

        results = await Receipt.files(id)

        return res.render("admin/recipes/edit", { recipe, chefOptions })
    },
    
    async put(req, res){
        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please fill all fields')
            }
        }

        await Receipt.update(req.body)

        return res.redirect(`/admin/recipes/${req.body.id}`)
    },

    async delete(req, res){
        await Receipt.delete(req.body.id)

        return res.redirect(`/admin/recipes`)
    }
}

