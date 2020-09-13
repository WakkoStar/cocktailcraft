
var _ = require('lodash')
const { deleteIngredient, modifyIngredient } = require('../ingredient/data')
const client = require('../utils/bdd')

module.exports.getAllCocktails = async() => {
    const res = await client.query('SELECT * FROM cocktails c JOIN ingredient_cocktail ic ON c.id = ic.cocktail_id JOIN description_cocktail dc ON c.id = dc.cocktail_id ORDER BY c.nom')
    const cocktails = getDescriptionsAndIngredientsOfCocktails(res.rows)
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

const getDescriptionsAndIngredientsOfCocktails = (cocktails) => {
    const distinctCocktails = _.uniqWith(cocktails, _.isEqual);
    const fullfilledCocktails = distinctCocktails.map((el) => {
        //selection des lignes a aggreger
        const cocktailArray = cocktails.filter(({id}) => id === el.id)
        //aggreger les lignes en un objet
        return cocktailArray.reduce((cocktailFull, cocktailPart) => {
            //{id,nom,description,ingredient}
            return {
                ...cocktailFull,
                descriptions: cocktailFull.description.concat(cocktailPart.description),
                ingredients: cocktailFull.ingredients.concat(cocktailPart.ingredients)
            }
        }, {})
    })
    return fullfilledCocktails
}

module.exports.createCocktail = (nom, descriptions, ingredients, gout_array, difficulty) => {

    const text = 'INSERT INTO cocktails (nom, gout_array, difficulty) VALUES ($1,$2,$3)'
    const values = [nom, gout_array, difficulty]

    client.query(text, values, (err, res) => {
        if (err) return err.stack
        createAndGetDescriptionsOfCocktail(descriptions, res.rows.id)
        createAndGetIngredientOfCocktail(ingredients, res.rows.id)
    })

    return `${nom} vient d'être crée`
}

const createAndGetDescriptionsOfCocktail = (descriptions, cocktail_id) => {
    descriptions.map(({content, preparation}) => {
        const text = 'INSERT INTO description_cocktail (content, preparation, cocktail_id) VALUES ($1,$2,$3)'
        const values = [content, preparation, cocktail_id]

        client.query(text,values, (err, res) => {
            if (err) console.log(err.stack)
        })
    })
}

const createAndGetIngredientOfCocktail = (ingredients, cocktail_id) => {
    ingredients.map(({ingredient_id, volume}) => {
        const text = 'INSERT INTO ingredient_cocktail (ingredient_id, volume, cocktail_id) VALUES ($1,$2,$3)'
        const values = [ingredient_id, volume, cocktail_id]

        client.query(text,values, (err, res) => {
            if (err) console.log(err.stack)
        })
    })
}


module.exports.modifyCocktail = (nom, descriptions, ingredients, gout_array, difficulty, id) => {

    modifyInCocktail({...ingredients, db: 'ingredient_cocktail'}, id)
    modifyInCocktail({...descriptions, db: 'description_cocktail'}, id)

    const text =  'UPDATE cocktails SET nom = $1, gout_array = $2, difficulty = $3 WHERE id = $4'
    const values = [nom, gout_array, difficulty, id]

    client.query(text, values, (err, res) => {
        if (err) return err.stack
    })

    return `${nom} est modifié`
    
}

const modifyInCocktail = (object, cocktail_id) => {
    const res = await client.query(`SELECT * FROM ${object.db} WHERE cocktail_id = ${cocktail_id}`)
    const prev = res.rows
    const currIds = object.map(({id}) => id)
    
    const toDelete = prev.filter(({id}) => !currIds.includes(id)) //pas inclus > ca dégage
    const toCreate = object.filter(({id}) => id === "")//nouveau 
    const toUpdate = object.filter(({id}) => id !== "")//pas nouveau

    if(object.db === "ingredient_cocktail"){
        createAndGetIngredientOfCocktail(toCreate)
        updateIngredientOfCocktail(toUpdate)
    }else if(object.db === "description_cocktail"){
        createAndGetDescriptionOfCocktail(toCreate)
        updateDescriptionOfCocktail(toUpdate)
    }

    deleteOfCocktail(toDelete, object.db)
}

const updateIngredientOfCocktail = (ingredients) => {
    ingredients.map(({ingredient_id, volume, id}) => {
        const text = 'UPDATE ingredient_cocktail SET ingredient_id = $1, volume = $2 WHERE id = $3'
        const values = [ingredient_id, volume, id]

        client.query(text, values, (err, res) => {
            if (err) console.log(err.stack)
        })
    })
}

const updateDescriptionOfCocktail = (descriptions) => {
    descriptions.map(({content, preparation, id}) => {
        const text = 'UPDATE description_cocktail SET content = $1, preparation = $2 WHERE id = $3'
        const values = [content, preparation, id]

        client.query(text, values, (err, res) => {
            if (err) console.log(err.stack)
        })
    })
}

const deleteOfCocktail = (object, db) => {
    object.map(({id}) => {
        const text = `DELETE FROM ${db} WHERE id = $1`
        const values = [id]

        client.query(text, values, (err, res) => {
            if (err) return err.stack
        })
    })

    return `${id} supprimé de ${db}`
}

module.exports.deleteCocktail = (id) => {
    const message = 
    deleteOfCocktail({id}, 'ingredient_cocktail') +
    deleteOfCocktail({id}, 'description_cocktail') +
    deleteOfCocktail({id}, 'cocktails')
    return message
}