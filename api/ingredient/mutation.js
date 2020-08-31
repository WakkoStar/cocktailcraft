const {
    createIngredient : createIngredientInDb,
    modifyIngredient : modifyIngredientInDb,
    deleteIngredient : deleteIngredientInDb,
    getAllIngredients: getIngredients
} = require('./data')

module.exports.createIngredient = ({name, aliases}) => {
    createIngredientInDb(name, aliases)
    return `${name} créé`
}

module.exports.modifyIngredient = ({name,aliases, id}) => {
    modifyIngredientInDb(name,aliases,id)
    return `Modifié en ${name}`
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