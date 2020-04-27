const { date } =  require ('../../lib/utils')
const Chef = require('../models/Chef')

module.exports = {

    index(req, res){
       Chef.all()
       .then(function(results){
            const chefs = results.rows
            return res.render("admin/chefs/index", { chefs })
           
        }).catch(function(err){
            throw new Error(err)
        })
    },
    create(req, res){
        return res.render("admin/chefs/create")
    },
    async post(req, res){

        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please fill all fields')
            }
        }
    
        let results = await Chef.create(req.body)
        const chefId = results.rows[0].id

        return res.redirect(`/admin/chefs/${chefId}`)
    },
    async show(req, res){

        let results = await Chef.find(req.params.id)
        const chef = results.rows[0]

        if(!chef) return res.send("Chef not found!!")
        chef.created_at = date(chef.created_at).format

        results = await Chef.recipesAll(chef.id)
        const recipesOption = results.rows

        return res.render("admin/chefs/show", { chef, recipesOption })

    },
    async edit(req, res){
        let results = await Chef.find(req.params.id)
        const chef = results.rows[0]

        if(!chef) return res.send("Chef not found!!")
        return  res.render("admin/chefs/edit", {chef} )
    },
    async put(req, res){
        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please fill all fields')
            }
        }
        await Chef.update(req.body)

        return res.redirect(`/admin/chefs/${req.body.id}`)
    },
    async delete(req, res){
        await Chef.delete(req.body.id)

        return res.redirect(`/admin/chefs`)
    }
}

