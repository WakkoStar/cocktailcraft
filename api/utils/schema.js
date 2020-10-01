const {
	schema: ingredientSchema,
	resolvers: ingredientResolvers,
} = require('../ingredient/type');
const {
	schema: cocktailSchema,
	resolvers: cocktailResolvers,
} = require('../cocktail/type');
const {
	schema: goutSchema,
	resolvers: goutResolvers,
} = require('../gout/type');

module.exports.schema = `
    type Query {
        ingredient(id: Int!): Ingredients
        ingredients: [Ingredients]
        bestIngredients(inventory:[Int]): [Ingredients]
        inventorySelection(cluster:[Int], inventory:[Int], filter_gout:[Int], filter_difficulty:[Int]): [Ingredients]
        searchIngredient(search: String): [Ingredients]

        gout(id: Int!): Gouts
        gouts: [Gouts]

        cocktail(id : Int!): Cocktails
        cocktails : [Cocktails]
        availCocktails(ingredient_array : [Int!]!) : [Cocktails]
        createdCocktails(cluster: [Int!]!): [Cocktails]
    }
    type Mutation {
        createIngredient(nom: String!, alias:[String], family_of:[Int]): String
        modifyIngredient(nom: String!, alias:[String], family_of:[Int], id: Int!): String
        deleteIngredient(id: Int!): String
        
        createGout(nom: String!): String
        modifyGout(nom: String!, id: Int!): String
        deleteGout(id: Int!): String

        createCocktail(nom: String!, gout_array: [Int!]!, difficulty : String!) : String
        modifyCocktail(nom: String!, gout_array: [Int!]!, difficulty : String!, id: Int!) : String
        deleteCocktail(id: Int!): String

        createDescriptionCocktail(input: [descriptionInput!]!): String
        createIngredientCocktail(input: [ingredientInput!]!):String

        modifyDescriptionCocktail(input: [descriptionInput!]!, id: Int!): String
        modifyIngredientCocktail(input: [ingredientInput!]!, id: Int!):String

        deleteDescriptionCocktail(id: Int!): String
        deleteIngredientCocktail(id: Int!): String
    } 
    ${ingredientSchema}
    ${cocktailSchema}
    ${goutSchema}
`;

const {
	ingredient,
	ingredients,
	bestIngredients,
	inventorySelection,
	searchIngredient,
	createIngredient,
	modifyIngredient,
	deleteIngredient,
} = ingredientResolvers;

const {
	cocktail,
	cocktails,
	availCocktails,
	createdCocktails,
	createCocktail,
	modifyCocktail,
	deleteCocktail,
	createDescriptionCocktail,
	createIngredientCocktail,
	modifyDescriptionCocktail,
	modifyIngredientCocktail,
	deleteIngredientCocktail,
	deleteDescriptionCocktail,
} = cocktailResolvers;

const { gout, gouts, createGout, modifyGout, deleteGout } = goutResolvers;

module.exports.root = {
	Query: {
		ingredient,
		ingredients,
		bestIngredients,
		searchIngredient,
		inventorySelection,

		gout,
		gouts,

		cocktail,
		cocktails,
		availCocktails,
		createdCocktails,
	},
	Mutation: {
		createIngredient,
		modifyIngredient,
		deleteIngredient,

		createGout,
		modifyGout,
		deleteGout,

		createCocktail,
		modifyCocktail,
		deleteCocktail,

		createDescriptionCocktail,
		createIngredientCocktail,
		modifyDescriptionCocktail,
		modifyIngredientCocktail,
		deleteIngredientCocktail,
		deleteDescriptionCocktail,
	},
};
