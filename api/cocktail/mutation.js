const {
    createCocktail : createCocktailInDb,
    modifyCocktail : modifyCocktailInDb,
    deleteCocktail : deleteCocktailInDb,
    getAllCocktails: getCocktails
} = require('./data')


module.exports.createCocktail = ({nom, descriptions, ingredients, gout_array, difficulty}) => {
    return createCocktailInDb(nom, descriptions, ingredients, gout_array, difficulty)
}

module.exports.modifyCocktail = ({nom, descriptions, ingredients, gout_array, difficulty, id}) => {
    return modifyCocktailInDb(nom, descriptions, ingredients, gout_array, difficulty, id)
}

module.exports.deleteCocktail = async({id}) => {
    const cocktails = await getCocktails()
    const checkID = cocktails.find((cocktail) => cocktail.id === id)
    if(checkID){
        return deleteCocktailInDb(id)
    }
    return "Aucun ingrédient avec cet ID"
}