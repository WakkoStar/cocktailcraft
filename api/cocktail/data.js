const { deleteIngredient, modifyIngredient } = require('../ingredient/data')
const client = require('../utils/bdd')

module.exports.getAllCocktails = async() => {
    const res = await client.query('SELECT * FROM cocktails ORDER BY name')
    return res.rows
}

module.exports.createCocktail = (nom, ingredients, gout_array, descriptions, difficulty) => {

    const description_array = createAndGetDescriptionsOfCocktail(descriptions)
    const ingredient_array = createAndGetIngredientOfCocktail(ingredients)
    
    const text = 'INSERT INTO cocktails (nom,difficulty,ingredient_array,gout_array,description_array) VALUES ($1,$2,$3,$4,$5)'
    const values = [nom, difficulty, ingredient_array, gout_array, description_array]

    client.query(text, values, (err, res) => {
        if (err) return err.stack
    })

    return `${nom} vient d'être crée`
}

const createAndGetDescriptionsOfCocktail = (descriptions) => {
    return descriptions.map(({content, preparation}) => {
        const text = 'INSERT INTO description_cocktail (content, preparation) VALUES ($1,$2)'
        const values = [content, preparation]

        client.query(text,values, (err, res) => {
            if (err) console.log(err.stack)
            return res.rows.id
        })
    })
}

const createAndGetIngredientOfCocktail = (ingredients) => {
    return ingredients.map(({ingredient_id, volume}) => {
        const text = 'INSERT INTO ingredient_cocktail (ingredient_id, volume) VALUES ($1,$2)'
        const values = [ingredient_id, volume]

        client.query(text,values, (err, res) => {
            if (err) console.log(err.stack)
            return res.rows.id
        })
    })
}


module.exports.modifyCocktail = (nom, difficulty, ingredients, descriptions, gout_array, id) => {

    const ingredient_array = modifyIngredientInCocktail(ingredients)

    const text =  'UPDATE cocktails SET nom = $1, ingredient_array = $2, gout_array = $3, description_array = $4, difficulty = $5 WHERE id = $6'
    const values = [name, ingredient_id, gout_id, description, difficulty_id, id]

    client.query(text, values, (err, res) => {
        if (err) console.log(err.stack)
    })
    
}

const modifyIngredientInCocktail = ({prevIngredients, currIngredients}) => {
    /*
    prevIngredients = [Int]
    currIngredients = [{ingredient_id: Int, volume: Int}]
    */
    const currIngredientsIds = currIngredients.map(({id}) => id)
    
    const ingredientToDelete = prevIngredients.filter((id) => !currIngredientsIds.includes(id))
    const ingredientToCreate = currIngredients.filter(({id}) => id === "")
    const ingredientsToUpdate = currIngredients.filter((id) => id !== "")

    const newIngredient_array = createAndGetIngredientOfCocktail(ingredientToCreate)
    const updatedIngredient_array = updateIngredientOfCocktail(ingredientsToUpdate)
    deleteIngredientOfCocktail(ingredientToDelete)

    return updatedIngredient_array.concat(newIngredient_array)

}

const modifyDescriptionInCocktail = ({prevDescriptions, currDescriptions}) => {
    /*
    prevDescriptions = [Int]
    currDescriptions = [{ingredient_id: Int, volume: Int}]
    */
    const currDescriptionsIds = currDescriptions.map(({id}) => id)
    
    const descriptionToDelete = prevDescriptions.filter((id) => !currDescriptionsIds.includes(id))
    const descriptionToCreate = currDescriptions.filter(({id}) => id === "")
    const descriptionsToUpdate = currDescriptions.filter((id) => id !== "")

    const newDescription_array = createAndGetDescriptionOfCocktail(descriptionToCreate)
    const updatedDescription_array = updateDescriptionOfCocktail(descriptionsToUpdate)
    deleteDescriptionOfCocktail(descriptionToDelete)

    return updatedDescription_array.concat(newDescription_array)

}

module.exports.deleteCocktail = (id) => {
    const text = 'DELETE FROM cocktails WHERE id = $1'
    const values = [id]

    client.query(text, values, (err, res) => {
        if (err) console.log(err.stack)
    })
}