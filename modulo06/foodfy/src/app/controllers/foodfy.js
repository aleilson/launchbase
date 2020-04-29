const sobre = require("../description/about")
const home = require("../description/home")
const Receipt = require('../models/Receipt')
const RecipeFile = require('../models/RecipeFile')
const File = require('../models/File')
const Chef = require("../models/Chef")


module.exports = {

    async home(req, res){
        try {

            let results = await Receipt.all();
            const recipes = results.rows;
           
            async function getImage(recipeId) {
                const results = await RecipeFile.find(recipeId);
                const files = results.rows.map(file => ({
                  ...file,
                  src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
                }))
                
                return files[0];
            }
        
            const filesPromise = await results.rows.map(recipe => getImage(recipe.id));
            const recipesFiles = await Promise.all(filesPromise);
    
            return res.render('foodfy/home', { infoHome: home, recipes, recipesFiles });

        } catch (err) {
            throw new Error(err);
        }
    },

    about(req, res){

        return res.render("foodfy/sobre", {sobreInfo: sobre})
    },
    async receitas(req, res){

       let { filter, page, limit } = req.query

       page = page || 1
       limit = limit || 6
       let offset = limit * (page - 1)

        let results = await Receipt.all();
        const recipes = results.rows;

        async function getImage(recipeId) {
            const results = await RecipeFile.find(recipeId);
            const files = results.rows.map(file => ({
              ...file,
              src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }))
    
            return files[0];
        }

        const filesPromise = await results.rows.map(recipe => getImage(recipe.id));
        const recipesFiles = await Promise.all(filesPromise)

        const params = {
           filter,
           page,
           limit,
           offset,
           recipes,
           recipesFiles,
           callback(recipes){

               const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
               }
                return res.render("foodfy/receitas", { recipes, pagination, filter, recipesFiles })
           }
        }

       Receipt.paginate(params)
    },
    async recipes(req, res){
        const recipeId = req.params.id

        let results = await Receipt.find(req.params.id)
        const recipe = results.rows[0]

        if (!recipe) return res.send("Receipt not found!!")

        results = await RecipeFile.findByRecipeId(recipeId);
        const recipeFilesPromise = results.rows.map(file => File.find(file.file_id));
        results = await Promise.all(recipeFilesPromise);

        let recipeFiles = results.map(result => result.rows[0]);
        recipeFiles = recipeFiles.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`,
        }));

        return  res.render("foodfy/recipes", {recipe, recipeFiles} )
    },
    async chefs(req, res){
        try {
            let results = await Chef.all();
            const chefs = results.rows;

            const chefsFilesPromise = await chefs.map(chef => File.find(chef.file_id));
            results = await Promise.all(chefsFilesPromise);
    
            let chefsFiles = results.map(result => result.rows[0]);
            chefsFiles = chefsFiles.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`,
            }));

            return res.render("foodfy/chefs", { chefs, chefsFiles })

        } catch (err) {
            throw new Error(err);
        }
    }
}