const {getAllCocktails: getCocktails} = require("./data")

module.exports.getAllCocktails = async() => {
    const cocktails = await getCocktails()
    return cocktails
}

module.exports.getOneCocktails = async({id}) => {
    const cocktails = await getCocktails()
    return cocktails.filter((cocktail) => cocktail.id === id)[0]
}

module.exports.getAvailableCocktails = async({ingredient_id : ingredients}) => {
    const cocktails = await getCocktails()
    const availCocktails = cocktails.filter(
        //For each cocktail
        (cocktail) => {
            //check if all ingredients of the cocktail
            return cocktail.ingredient_id.every(
                (id) => {
                    //is included within the parameter
                    return ingredients.includes(id)
                }
            )
        }
    )
    return availCocktails
}

module.exports.getCreatedCocktails = async({cluster}) => {
    const cocktails = await getCocktails()
    const createdCocktails = cocktails.filter(({ingredient_id}) => {
        const inCoktail = ingredient_id.every(id => cluster.includes(id))
        const inCluster = cluster.every(id => ingredient_id.includes(id))
        
        return inCoktail && inCluster
    })
    return createdCocktails
}