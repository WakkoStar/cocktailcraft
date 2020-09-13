const {
    createCocktail : createCocktailInDb,
    modifyCocktail : modifyCocktailInDb,
    deleteCocktail : deleteCocktailInDb,
    getAllCocktails: getCocktails,
    createDescriptionsOfCocktail,
    createIngredientOfCocktail,
    updateDescriptionOfCocktail,
    updateIngredientOfCocktail
} = require('./data')


module.exports.createCocktail = ({nom, descriptions, ingredients, gout_array, difficulty}) => {
    return createCocktailInDb(nom, descriptions, ingredients, gout_array, difficulty)
}

module.exports.modifyCocktail = ({nom, descriptions, ingredients, gout_array, difficulty, id}) => {
    return modifyCocktailInDb(nom, descriptions, ingredients, gout_array, difficulty, id)
}

module.exports.deleteCocktail = async({id}) => {
    
    const cocktails = await getCocktails()
    
    const checkID = cocktails.findIndex((cocktail) => cocktail.id === id)
    if(checkID){
        return deleteCocktailInDb(id)
    }
    return "Aucun ingrédient avec cet ID"
}

module.exports.createDescriptionCocktail = ({input, id_cocktail}) => {
    return createDescriptionsOfCocktail(input, id_cocktail)
}

module.exports.createIngredientCocktail = ({input, id_cocktail}) => {
    return createIngredientOfCocktail(input, id_cocktail)
}

module.exports.modifyDescriptionCocktail = ({input, id}) => {
    return updateDescriptionOfCocktail(input, id)
}

module.exports.modifyIngredientCocktail = ({input, id}) => {
    return updateIngredientOfCocktail(input, id)
}