const { age, date } =  require ('../../lib/utils')
const Receipt = require('../models/Receipt')

module.exports = {

    index(req, res){

       Receipt.all(function(recipes){
            return res.render("admin/recipes/index", { recipes })
       })
    },
    create(req, res){
        
        Receipt.chefsSelectOptions(function(options){

            return res.render("admin/recipes/create", { chefOptions: options })
        })
    },

    post(req, res){

        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please fill all fields')
            }
        }
    
        Receipt.create(req.body, function(recipe){

            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
    },

    show(req, res){

        Receipt.find(req.params.id, function(recipe){
            if(!recipe) return res.send("Receipt not found!!")

            recipe.created_at = date(recipe.created_at).format

            return  res.render("admin/recipes/show", {recipe} )
        })  
    },

    edit(req, res){

        Receipt.find(req.params.id, function(recipe){
            if(!recipe) return res.send("Receipt not found!!")

            Receipt.chefsSelectOptions(function(options){
                return res.render("admin/recipes/edit", { recipe, chefOptions: options })
            })
        })
    
    },
    
    put(req, res){
        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please fill all fields')
            }
        }

        Receipt.update(req.body, function(){
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },

    delete(req, res){

        Receipt.delete(req.body.id, function(){
            return res.redirect(`/admin/recipes`)
        })
    
    }
}

