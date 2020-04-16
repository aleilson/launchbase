const sobre = require("../description/about")
const home = require("../description/home")
const Receipt = require('../models/Receipt')
const Chef = require("../models/Chef")


module.exports = {

    home(req, res){

        Receipt.all(function(recipes){
            return res.render("foodfy/home", {infoHome: home,  recipes })
        })

    },
    about(req, res){

        return res.render("foodfy/sobre", {sobreInfo: sobre})
    },
    receitas(req, res){

       let { filter, page, limit } = req.query

       page = page || 1
       limit = limit || 6
       let offset = limit * (page - 1)

       const params = {
           filter,
           page,
           limit,
           offset,
           callback(recipes){

               const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
               }
                return res.render("foodfy/receitas", { recipes, pagination, filter })
           }
       }

       Receipt.paginate(params)

        // if (filter) {

        //     Receipt.findBy(filter, function(recipes){
        //         return res.render("foodfy/receitas", { recipes })

        //     })
        //     console.log('Caixa com filtro')
        // } else {

        //     Receipt.all(function(recipes){
        //         return res.render("foodfy/receitas", { recipes })
        //    })
        //    console.log('Caixa sem filtro')
        // }
    },
    recipes(req, res){
        Receipt.find(req.params.id, function(recipe){
            if(!recipe) return res.send("Receipt not found!!")

            return  res.render("foodfy/recipes", {recipe} )
        })  
    },
    chefs(req, res){
        Chef.all(function(chefs){
            return res.render("foodfy/chefs", { chefs })
       })
    }
}