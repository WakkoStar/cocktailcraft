const client = require('../utils/bdd')

module.exports.getAllCocktails = async() => {
    const res = await client.query('SELECT * FROM cocktails ORDER BY name')
    return res.rows
}

module.exports.createCocktail = (name, ingredient_id, gout_id, description, difficulty_id) => {
    const text = 'INSERT INTO cocktails (name, ingredient_id, gout_id, description, difficulty_id) VALUES ($1,$2,$3,$4,$5)'
    const values = [name, ingredient_id, gout_id, description, difficulty_id]

    client.query(text, values, (err, res) => {
        if (err) console.log(err.stack)
    })
}

module.exports.modifyCocktail = (name, ingredient_id, gout_id, description, difficulty_id, id) => {
    const text =  'UPDATE cocktails SET name = $1, ingredient_id = $2, gout_id = $3, description = $4, difficulty_id = $5 WHERE id = $6'
    const values = [name, ingredient_id, gout_id, description, difficulty_id, id]

    client.query(text, values, (err, res) => {
        if (err) console.log(err.stack)
    })
}

module.exports.deleteCocktail = (id) => {
    const text = 'DELETE FROM cocktails WHERE id = $1'
    const values = [id]

    client.query(text, values, (err, res) => {
        if (err) console.log(err.stack)
    })
}