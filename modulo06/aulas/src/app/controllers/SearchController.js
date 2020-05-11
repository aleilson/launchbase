const { formatPrice } = require('../../lib/utils')

const Product = require("../models/Product")

module.exports = {
    async index(req, res){

        try{
            
            // declarando um objeto vazio com variavel
            let results,
                params = {}

            // Desestruturação do que vou utilizar do req.query
            const { filter, category } = req.query

            params.filter = filter

            // Se tiver categoria mostrar categoria dentro do params (ideia no Product.js)
            if(category){
                params.category = category
            }

            // retornando a busca do search com params
            results = await Product.search(params)

            // Buscando a primeira imagem do produto
            async function getImage(productId){
                let results = await Product.files(productId)
                const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

                return files[0]
            }

            // array de promessas
            const productsPromise = results.rows.map(async product => {
                product.img = await getImage(product.id)
                product.oldPrice = formatPrice(product.old_price)
                product.price = formatPrice(product.price)
                return product
            })

            // execução do array de promessa
            const products = await Promise.all(productsPromise)

            //  declarando o nome para req.filter e todos produtos
            const search = {
                term: req.query.filter,
                total: products.length
            }

            // retornando um objeto com map trazendo id e name dos produtos de categoria e nome da categoria
            const categories = products.map(product => ({
                id: product.category_id,
                name: product.category_name
            })).reduce((categoriesFiltered, category) => {

                const found = categoriesFiltered.some(cat => cat.id == category.id)

                if(!found){
                    categoriesFiltered.push(category)
                }

                return categoriesFiltered
            }, [])
           

            return res.render("search/index", { products, search, categories })

        } catch(err){
            console.error(err)
        }
    }
}