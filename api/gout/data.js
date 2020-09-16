const client = require('../utils/bdd')


module.exports.getAllGouts = async() => {
    const res = await client.query('SELECT * FROM gout')
    return res.rows
}

module.exports.createGout = (nom) => {
    const text = 'INSERT INTO gout (nom) VALUES ($1)'
    const values = [nom]
    
    client.query(text, values, (err, res) => {
        if (err) throw err
    })
}

module.exports.modifyGout = ({nom, id}) => {
    const text =  'UPDATE gout SET nom = $1 WHERE id = $2'
    const values = [nom, id]

    client.query(text, values, (err, res) => {
        if (err) throw err
    })
}

module.exports.deleteGout = ({id}) => {
    const text = 'DELETE FROM gout WHERE id = $1'
    const values = [id]

    client.query(text, values, (err, res) => {
        if (err) throw err
    })
}
/*
gout {
    id: Int
    nom: String
}
*/