const client = require('../utils/bdd')


module.exports.getAllIngredients = async() => {
    const res = await client.query('SELECT * FROM ingredient ORDER BY nom')
    return res.rows
}

module.exports.createIngredient = (nom, alias, family_of) => {
    const text = 'INSERT INTO ingredient (nom, alias, family_of) VALUES ($1, $2, $3)'
    const values = [nom, alias, family_of]

    client.query(text, values, (err, res) => {
        if (err) throw err
    })
}

module.exports.modifyIngredient = ({nom, alias, family_of, id}) => {
    const text =  'UPDATE ingredient SET nom = $1, alias=$2, family_of=$3 WHERE id = $4'
    const values = [nom, alias, family_of, id]

    client.query(text, values, (err, res) => {
        if (err) throw err
    })
}

module.exports.deleteIngredient = ({id}) => {
    const text = 'DELETE FROM ingredient WHERE id = $1'
    const values = [id]

    client.query(text, values, (err, res) => {
        if (err) throw err
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
    gout_array : [id],
    difficulty : [id],
}


Autres schémas :

gout {
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