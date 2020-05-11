const { formatPrice } = require('../../lib/utils')

const Product = require("../models/Product")

module.exports = {
    async index(req, res){

        try{
            // Pegando todos os products
            let results = await Product.all()
            const products = results.rows

            if(!products) return res.send("Products not found!")

            // Buscando imagens de cada produto pelo productId
            async function getImage(productId){
                let results = await Product.files(productId)
                const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

                return files[0]
            }

            //Array de promesas 
            const productsPromise = products.map(async product => {
                product.img = await getImage(product.id)
                product.oldPrice = formatPrice(product.old_price)
                product.price = formatPrice(product.price)
                return product
            }).filter((product, index) => index > 2 ? false : true) //Filtrando somente 3 products na index

            //Executando a productsPromise quando tudo tiver pronto
            const lastAdded = await Promise.all(productsPromise)

            return res.render("home/index", {products: lastAdded})

        } catch(err){
            console.error(err)
        }
    }
}