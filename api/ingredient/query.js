const {getAllIngredients: getIngredients} = require('./data')
const {getAllCocktails} = require("../cocktail/data")

module.exports.getAllIngredients = async() => {
    const ingredients = await getIngredients()
    return ingredients
}

module.exports.getOneIngredients = async({id}) => {
    const ingredients = await getIngredients()
    return ingredients.filter((ingredient) => ingredient.id === id)[0]
}

module.exports.searchIngredient = async({search}) => {
    const ingredients = await getIngredients()
    
    const minSearch = search.toLowerCase()
    
    const results = ingredients.filter(({name, alias}) => {
        const withName = name.toLowerCase().includes(minSearch)
        let withAliases = false
        if(alias) withAliases = alias.some((el) => el.toLowerCase().includes(minSearch))
        return withName || withAliases
    })
    return results
}

//count amount of ingredients
const getIngredientCount = (res, id) => {    

    let filteredCocktails = res.filter(({ingredient_array}) => {
        return ingredient_array.includes(id)
    })
    return filteredCocktails.length
}
//inventory = {2, 4, 5, 9} => id of ingredient
module.exports.getBestIngredients = async({inventory}) => {
    const ingredients = await getIngredients()
    const cocktails = await getAllCocktails()
    //filter cocktails who don't have the inventory
    let res
    if(inventory.length > 0) {
        res = cocktails.filter(({ingredient_array}) => {
            return inventory.some((id) => ingredient_array.includes(id))
        })
    }else{
        res = cocktails
    }
    //add count property
    let countedIng = ingredients.map((ingredient) => {
        return {...ingredient, count: getIngredientCount(res, ingredient.id)}
    })
   
    //sort by count
    let sortedIng = countedIng.sort((a, b) => b.count - a.count)
    //filter inventory
    return sortedIng.filter((ingredient) => !inventory.includes(ingredient.id))
}


//filter cocktails 
const filterCocktails = (cocktails, filter_gout, filter_difficulty) => {

    const filteredCocktails = cocktails.filter(({gout_id, difficulty}) => {
        let inGout = true
        if(filter_gout.length > 0) inGout = gout_id.some((id) => filter_gout.includes(id))

        let inDifficulty = true
        if(filter_difficulty.length > 0) inDifficulty = filter_difficulty.includes(difficulty)

        return inGout && inDifficulty
    })

    return filteredCocktails
}

module.exports.inventorySelection = async({inventory, cluster, filter_gout, filter_difficulty}) => {
    //get ingredients of the inventory
    const ingredients = await getIngredients()
    const inventoryIng = ingredients.filter(({id}) => inventory.includes(id))
    
    //get cocktails filtered by the cluster
    const cocktails = await getAllCocktails()
    
    //select only cocktail available with the cluster
    let clusterCocktails = cocktails.filter(({ingredient_array}) => {
            //tous les ingrédients du cluster sont dans le cocktail
            let inCluster = true
            //si le cluster est supérieur à 0, on séléctionne les cocktails avec TOUT les ingrédients séléctionnés
            if(cluster.length > 0) inCluster = cluster.every((id) => ingredient_array.includes(id))
            //tous les ingrédients du cocktail sont dans l'inventaire
            const inInventory = inngredient_array.every(id => inventory.includes(id))
            return inCluster && inInventory
        })
    //redefine clusterCocktails with difficulty and gout
    clusterCocktails = filterCocktails(clusterCocktails, filter_gout, filter_difficulty)
    
    //add count property for the cocktails available
    let countedIng = inventoryIng.map((ingredient) => {
        return {...ingredient, count: getIngredientCount(clusterCocktails, ingredient.id)}
    })
    //sort by count
    let sortedIng = countedIng.sort((a, b) => b.count - a.count)
    return sortedIng.filter((ingredient) => {
        return !cluster.includes(ingredient.id) && ingredient.count
    })
}
