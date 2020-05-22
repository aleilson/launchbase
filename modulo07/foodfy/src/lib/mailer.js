const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "2e10ef439cf3a3",
        pass: "02f5552363b176"
    }
})