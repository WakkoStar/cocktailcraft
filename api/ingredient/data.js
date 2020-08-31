const client = require('../utils/bdd')


module.exports.getAllIngredients = async() => {
    const res = await client.query('SELECT * FROM ingredient ORDER BY name')
    return res.rows
}

module.exports.createIngredient = (name, aliases) => {
    const text = 'INSERT INTO ingredient (name, aliases) VALUES ($1, $2)'
    const values = [name, aliases]

    client.query(text, values, (err, res) => {
        if (err) console.log(err.stack)
    })
}

module.exports.modifyIngredient = (name,aliases, id) => {
    const text =  'UPDATE ingredient SET name = $1, aliases=$2   WHERE id = $3'
    const values = [name,aliases, id]

    client.query(text, values, (err, res) => {
        if (err) console.log(err.stack)
    })
}

module.exports.deleteIngredient = (id) => {
    const text = 'DELETE FROM ingredient WHERE id = $1'
    const values = [id]

    client.query(text, values, (err, res) => {
        if (err) console.log(err.stack)
    })
}


/*
Schéma d'un ingrédient : 
{
    id: id,
    nom : String,
    family_of : id,
    aliases : [String],
}

Schéma d'un cocktail : 
{
    nom : String,
    ingredient_array : [{id : id, vol : int}],
    gout_array : [id],
    difficulty_id : [id],
    description_array : [{content : blob, preparation_id : id}],
}


Autres schémas :

gout {
    id,
    nom
}
difficulty {
    id,
    nom
}
preparation {
    id, 
    nom
}

Automatiser la description : 
Directement au verre : 
Remplir de 6 à 8 glacons un verre. Ajouter igredient_array[0].vol cl  de ingredient_array[0].nom, ..., 
et igredient_array[last].vol cl de ingredient_array[last].nom. Touiller. Boire très frais.

Au shaker : 
Dans un shaker rempli de glaçons. Ajouter igredient_array[0].vol cl  de ingredient_array[0].nom, ..., 
et igredient_array[last].vol cl de ingredient_array[last].nom. Agiter fortement, verser dans un verre.

 */