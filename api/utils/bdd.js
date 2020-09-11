//bdd
const {Client} = require("pg")
const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "HUGOcrado24",
    database: "cocktails"
})
// const client = new Client({
//     host: "node67901-env-8002935.hidora.com",
//     user: "webadmin",
//     port: "11127",
//     password: "vtrajAEID5",
//     database: "cocktails"
// })

module.exports = client