const sobre = require("../description/about")
const home = require("../description/home")
const Receipt = require('../models/Receipt')
const Chef = require("../models/Chef")


module.exports = {

    home(req, res){

        Receipt.all()
       .then(function(results){
            const recipes = results.rows
            return res.render("foodfy/home", { infoHome: home, recipes })

        }).catch(function(err){
            throw new Error(err)
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
    async recipes(req, res){
        let results = await Receipt.find(req.params.id)
        const recipe = results.rows[0]

        if(!recipe) return res.send("Receipt not found!!")
        return  res.render("foodfy/recipes", {recipe} )
    },
    chefs(req, res){
       Chef.all()
       .then(function(results){
            const chefs = results.rows
            return res.render("foodfy/chefs", { chefs })
           
        }).catch(function(err){
            throw new Error(err)
        })
    }
}