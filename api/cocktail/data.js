
var _ = require('lodash')
const { deleteIngredient, modifyIngredient } = require('../ingredient/data')
const client = require('../utils/bdd')

module.exports.getAllCocktails = async() => {
    const resIngredients = await client.query('SELECT * FROM cocktails c FULL JOIN ingredient_cocktail ic ON c.id = ic.id_cocktail ORDER BY c.nom')
    const resDescriptions = await client.query('SELECT * FROM cocktails c FULL JOIN description_cocktail dc ON c.id = dc.id_cocktail ORDER BY c.nom')
    const cocktails = await getDescriptionsAndIngredientsOfCocktails(resDescriptions.rows.concat(resIngredients.rows))
    /*
    schéma : 
    {
        id: 1,
        nom: mojito,
        descriptions: [
            {
                content: "Mettre la menthe....",
                preparation : "Fait directement au verre"
            },
        ],
        ingredients: [
            {
                ingredient_id : 1,
                volume: "un trait"
            },
            {
                ingredient_id: 3,
                volume: "20 grammes"
            }
        ],
        gout_array: [1, 2, 4, 8],
        difficulty: "Facile"
    }
    */
    return cocktails
}

const getDescriptionsAndIngredientsOfCocktails = async(cocktails) => {
    
    const res = await client.query('SELECT * FROM cocktails');
    const distinctCocktails = res.rows
    
    const fullfilledCocktails = distinctCocktails.map((el) => {
        //selection des lignes a aggreger
        const cocktailArray = cocktails.filter(({id_cocktail}) => id_cocktail === el.id)
        //aggreger les lignes en un objet
        return cocktailArray.reduce((cocktailFull, cocktailPart) => {
            //{id,nom,description,ingredient}
            const {content, preparation} = cocktailPart
            const {ingredient_id, volume} = cocktailPart

            return {
                ...cocktailFull,
                descriptions: content ? _.concat(cocktailFull.descriptions, {content, preparation, cocktail_id: el.id}) : cocktailFull.descriptions,
                ingredients: ingredient_id ? _.concat(cocktailFull.ingredients, {ingredient_id, volume, cocktail_id: el.id}) : cocktailFull.ingredients
            }
        }, {...el, descriptions: [], ingredients: []})
    })

    return fullfilledCocktails
}

module.exports.createCocktail = (nom, gout_array, difficulty) => {
    const text = 'INSERT INTO cocktails (nom, gout_array, difficulty) VALUES ($1,$2,$3)'
    const values = [nom, gout_array, difficulty]

    client.query(text, values, (err, res) => {
        if (err) return err.stack
    })

    return `${nom} vient d'être crée`
}

module.exports.createDescriptionsOfCocktail = (descriptions, id_cocktail) => {
    descriptions.map(({content, preparation}) => {
        const text = 'INSERT INTO description_cocktail (content, preparation, id_cocktail) VALUES ($1,$2,$3)'
        const values = [content, preparation, id_cocktail]

        client.query(text,values, (err, res) => {
            if (err) console.log(err.stack)
        })
    })
}

module.exports.createIngredientOfCocktail = (ingredients,id_cocktail) => {
    ingredients.map(({ingredient_id, volume}) => {
        const text = 'INSERT INTO ingredient_cocktail (ingredient_id, volume, id_cocktail) VALUES ($1,$2,$3)'
        const values = [ingredient_id, volume, id_cocktail]

        client.query(text,values, (err, res) => {
            if (err) console.log(err.stack)
        })
    })
}


module.exports.modifyCocktail = async(nom, gout_array, difficulty, id) => {
    const text =  'UPDATE cocktails SET nom = $1, gout_array = $2, difficulty = $3 WHERE id = $4'
    const values = [nom, gout_array, difficulty, id]

    client.query(text, values, (err, res) => {
        if (err) return err.stack
    })

    return `${nom} est modifié`
}

module.exports.updateIngredientOfCocktail = (ingredients, id) => {
    ingredients.map(({ingredient_id, volume}) => {
        const text = 'UPDATE ingredient_cocktail SET ingredient_id = $1, volume = $2 WHERE id = $3'
        const values = [ingredient_id, volume, id]

        client.query(text, values, (err, res) => {
            if (err) console.log(err.stack)
        })
    })
}

module.exports.updateDescriptionOfCocktail = (descriptions, id) => {
    descriptions.map(({content, preparation}) => {
        const text = 'UPDATE description_cocktail SET content = $1, preparation = $2 WHERE id = $3'
        const values = [content, preparation, id]

        client.query(text, values, (err, res) => {
            if (err) console.log(err.stack)
        })
    })
}
module.exports.deleteOfCocktail = (id, db) => {
    const text = `DELETE FROM ${db} WHERE id_cocktail = $1`
    const values = [id]

    client.query(text, values, (err, res) => {
        if (err) return err.stack
    })

    return `${id} supprimé de ${db} `
}

module.exports.deleteCocktail = (id) => {
    const text = `DELETE FROM ${db} WHERE ${id.name} = $1`
    const values = [id.index]

    client.query(text, values, (err, res) => {
        if (err) return err.stack
    })

    return `${id.index} supprimé de ${db} `
}