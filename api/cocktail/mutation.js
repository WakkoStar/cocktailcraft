const {
    createCocktail : createCocktailInDb,
    modifyCocktail : modifyCocktailInDb,
    deleteCocktail : deleteCocktailInDb,
    getAllCocktails: getCocktails
} = require('./data')


module.exports.createCocktail = ({name, ingredient_id, gout_id, description, difficulty_id}) => {
    createCocktailInDb(name, ingredient_id, gout_id, description, difficulty_id)
    return `${name} créé`
}

module.exports.modifyCocktail = ({name, ingredient_id, gout_id, description, difficulty_id, id}) => {
    modifyCocktailInDb(name, ingredient_id, gout_id, description, difficulty_id, id)
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