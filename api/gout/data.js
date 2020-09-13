const client = require('../utils/bdd')


module.exports.getAllGouts = async() => {
    const res = await client.query('SELECT * FROM gout')
    return res.rows
}

module.exports.createGout = (nom) => {
    const text = 'INSERT INTO ingredient (nom) VALUES ($1)'
    const values = [nom]

    client.query(text, values, (err, res) => {
        if (err) return err.stack
    })

    return `${nom} vient d'être crée`
}

module.exports.modifyGout = (nom, id) => {
    const text =  'UPDATE ingredient SET nom = $1 WHERE id = $2'
    const values = [nom, id]

    client.query(text, values, (err, res) => {
        if (err) return err.stack
    })

    return `${nom} vient d'être modifié`
}

module.exports.deleteGout = (id) => {
    const text = 'DELETE FROM ingredient WHERE id = $1'
    const values = [id]

    client.query(text, values, (err, res) => {
        if (err) console.log(err.stack)
    })
}