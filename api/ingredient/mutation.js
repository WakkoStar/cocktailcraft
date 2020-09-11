const {
    createIngredient : createIngredientInDb,
    modifyIngredient : modifyIngredientInDb,
    deleteIngredient : deleteIngredientInDb,
    getAllIngredients: getIngredients
} = require('./data')

module.exports.createIngredient = ({nom, alias, family_of}) => {
    return createIngredientInDb(nom, alias, family_of)
}

module.exports.modifyIngredient = ({nom, alias, family_of, id}) => {
    return modifyIngredientInDb(nom, alias, family_of, id)
}

module.exports.deleteIngredient = async({id}) => {
    const ingredients = await getIngredients()
    const checkID = ingredients.find((ingredient) => ingredient.id === id)
    if(checkID){
        deleteIngredientInDb(id)
        return `L'élément est supprimé`
    }
    return "Aucun ingrédient avec cet ID"
}