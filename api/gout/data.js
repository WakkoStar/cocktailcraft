const client = require('../utils/bdd')


module.exports.getAllGouts = async() => {
    const res = await client.query('SELECT * FROM gout')
    return res.rows
}