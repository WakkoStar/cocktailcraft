const {
    createCocktail : createCocktailInDb,
    modifyCocktail : modifyCocktailInDb,
    deleteCocktail : deleteCocktailInDb,
    getAllCocktails: getCocktails
} = require('./data')


module.exports.createCocktail = ({nom, ingredients, gout_array, descriptions, difficulty}) => {
    createCocktailInDb(nom, ingredients, gout_array, description, difficulty)
    return `${name} créé`
}

module.exports.modifyCocktail = ({nom, ingredients, gout_array, descriptions, difficulty, id}) => {
    modifyCocktailInDb(name, descriptions, gout_id, ingredients, difficulty, id)
    return `${name} modifié`
}

module.exports.deleteCocktail = async({id}) => {
    const cocktails = await getCocktails()
    const checkID = cocktails.find((cocktail) => cocktail.id === id)
    if(checkID){
        deleteCocktailInDb(id)
        return `L'élément est supprimé`
    }
    return "Aucun ingrédient avec cet ID"
}