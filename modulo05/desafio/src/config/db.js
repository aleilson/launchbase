// Conecta o node com o postgres, realiza a desestruturação do Pool para que não precise colocar o login e senha
// nas querys, assim é feito a configuração abaixo e conecta no banco direto sem solicitar novamente o acesso.
const { Pool } = require("pg")

module.exports = new Pool({
    user: 'postgres',
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "my_teacher"
})