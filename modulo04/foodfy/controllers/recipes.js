const fs = require('fs')
const data = require("../data.json")


// INDEX
exports.index = function(req, res){

    return res.render("admin/recipes/index", { receitas: data.recipes })
}

// CREATE
exports.create = function(req, res){
    
    return res.render("admin/recipes/create")
}

// POST
exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send('Please fill all fields')
        }
    }

    let { name, recipes_url, ingredients, preparations, additional, author } = req.body

    const id = Number(data.recipes.length + 1)

    data.recipes.push({
        id,
        name,
        recipes_url,
        ingredients,
        preparations,
        additional,
        author
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write file error!')

        return res.redirect("/admin/recipes")
    })
}

// SHOW
exports.show = function(req, res){

    const { id } = req.params

    const foundRecipes = data.recipes.find(function(recipes){

        return recipes.id == id
    })

    if(!foundRecipes) return res.send("Write file not found!")

    const recipes = {
        ...foundRecipes
    }

    return res.render("admin/recipes/show", { recipes })
}

// EDIT
exports.edit = function(req, res){

    const { id } = req.params

    const foundRecipes = data.recipes.find(function(recipes){

        return recipes.id == id
    })

    if(!foundRecipes) return res.send("Write file not found!")

    const recipes = {
        ...foundRecipes
    }

    return res.render('admin/recipes/edit', {recipes})

}

// PUT
exports.put = function(req, res){
    const { id } = req.body


    let index = 0

    const foundRecipes = data.recipes.find(function(recipes, foundIndex){

        if(id == recipes.id){
            index= foundIndex

            return true
        }
    })

    if(!foundRecipes) return res.send("Recipe not found!")

    const recipe = {
        ...foundRecipes,
        ...req.body,
        id: Number(req.body.id)
    }

    data.recipes[index] = recipe

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write error!')

        return res.redirect(`/admin/recipes/${id}`)
    })
}

// DELETE
exports.delete = function(req, res){

    const { id } = req.body

    const filteredRecipes = data.recipes.filter(function(recipe){
        return recipe.id != id
    })

    data.recipes = filteredRecipes

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write file error!')

        return res.redirect('/admin/recipes')
    })

}