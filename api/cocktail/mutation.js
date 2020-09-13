var _ = require('lodash')
const {
    createCocktail : createCocktailInDb,
    modifyCocktail : modifyCocktailInDb,
    deleteCocktail : deleteCocktailInDb,
    getAllCocktails: getCocktails,
    createDescriptionsOfCocktail,
    createIngredientOfCocktail,
    updateDescriptionOfCocktail,
    updateIngredientOfCocktail,
    deleteOfCocktail
} = require('./data')

const executeRequestInDb = async(params, callback, msg) => {
    if(_.some(params, _.isUndefined)) throw new Error("empty fields")
    const cocktails = await getCocktails()
    const existsCocktail = cocktails.find((cocktail) => cocktail.id == params.id)
    if(existsCocktail) {
        callback({...params})
        return `${msg} (cocktail: ${existsCocktail.nom})`
    }else{
        throw new Error('no ID founded')
    }
}

module.exports.createCocktail = ({nom, gout_array, difficulty}) => {
    if(!nom || !gout_array || !difficulty) throw new Error("empty fields")
    const cocktails = await getCocktails()
    const existsCocktail = cocktails.find((cocktail) => cocktail.nom == nom)
    if(existsCocktail) {
        throw new Error('Cocktail already exists')
    }else {
        createCocktailInDb(nom, gout_array, difficulty)
        return `${nom} vient d'etre créé avec succès`
    }
}

module.exports.modifyCocktail = async({nom, gout_array, difficulty, id}) => {
    return await executeRequestInDb(
        {nom, gout_array, difficulty, id}, 
        modifyCocktailInDb, 
        `Le cocktail vient d'être modifié avec succès` 
    )
}

module.exports.deleteCocktail = async({id}) => {
    return await executeRequestInDb(
        {id}, 
        deleteCocktailInDb, 
        `Le cocktail vient d'être supprimé avec succès` 
    )
}

module.exports.createDescriptionCocktail = async({input, id_cocktail}) => {
    return await executeRequestInDb(
        {input,id: id_cocktail}, 
        createDescriptionsOfCocktail, 
        `La description du cocktail vient d'être créé avec succès` 
    )
}

module.exports.createIngredientCocktail = async({input, id_cocktail}) => {
    return await executeRequestInDb(
        {input,id: id_cocktail}, 
        createIngredientOfCocktail, 
        `Les ingrédients du cocktail vient d'être créé avec succès` 
    )
}

module.exports.modifyDescriptionCocktail = async({input, id}) => {
    return await executeRequestInDb(
        {input,id}, 
        updateDescriptionOfCocktail, 
        `Les descriptions du cocktail vient d'être modifiés avec succès` 
    )
}

module.exports.modifyIngredientCocktail = async({input, id}) => {
    return await executeRequestInDb(
        {input,id}, 
        updateIngredientOfCocktail, 
        `Les ingrédients du cocktail vient d'être modifiés avec succès` 
    )
}

module.exports.deleteIngredientCocktail = async({id}) => {
    return await executeRequestInDb(
        {id, db : "ingredient_cocktail"}, 
        deleteOfCocktail, 
        `Les ingrédients du cocktail vient d'être supprimés avec succès` 
    )
}
module.exports.deleteDescriptionCocktail = async({id}) => {
    return await executeRequestInDb(
        {id, db : "description_cocktail"}, 
        deleteOfCocktail, 
        `Les descriptions du cocktail vient d'être supprimés avec succès` 
    )
}

