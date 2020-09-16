//bdd
const {Client} = require("pg")
const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "Ys4aosyev4",
    database: "cocktailcraft"
})
// const client = new Client({
//     host: "node67901-env-8002935.hidora.com",
//     user: "webadmin",
//     port: "11127",
//     password: "vtrajAEID5",
//     database: "cocktails"
// })

module.exports = client