const {
	schema: ingredientSchema,
	resolvers: ingredientResolvers,
} = require('../ingredient/type');
const {
	schema: cocktailSchema,
	resolvers: cocktailResolvers,
} = require('../cocktail/type');

const {
	schema: elementCocktailSchema,
	resolvers: elementCocktailResolvers,
} = require('../cocktail/ingredient_and_description/type');

const {
	schema: goutSchema,
	resolvers: goutResolvers,
} = require('../gout/type');

const {
	schema: userSchema,
	resolvers: userResolvers,
} = require('../users/type');

module.exports.schema = `
    type Query {
        ingredient(id: Int!): Ingredients
		ingredients: [Ingredients]
		ingredientsFamily(family_of:[Int!]!): [Ingredients]
        bestIngredients(inventory:[Int]): [Ingredients]
        inventorySelection(cluster:[Int], inventory:[Int], filter_gout:[Int], filter_difficulty:[Int]): [Ingredients]
        searchIngredient(search: String): [Ingredients]

        gout(id: Int!): Gouts
        gouts: [Gouts]

        cocktail(id : Int!): Cocktails
        cocktails : [Cocktails]
        availCocktails(ingredient_array : [Int!]!) : [Cocktails]
		createdCocktails(cluster: [Int!]!): [Cocktails]
		
		user(id: Int!): User
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

        createDescriptionCocktail(input: descriptionInput!): String
        createIngredientCocktail(input: ingredientInput!):String

        modifyDescriptionCocktail(input: descriptionInput!): String
        modifyIngredientCocktail(input: ingredientInput!):String

        deleteDescriptionCocktail(input: descriptionInput!): String
		deleteIngredientCocktail(input: ingredientInput!): String
		
		deleteUser(id: Int): String
    } 
    ${ingredientSchema}
    ${cocktailSchema}
	${goutSchema}
	${elementCocktailSchema}
	${userSchema}
`;

const {
	ingredient,
	ingredients,
	ingredientsFamily,
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
} = cocktailResolvers;

const {
	createDescriptionCocktail,
	createIngredientCocktail,
	modifyDescriptionCocktail,
	modifyIngredientCocktail,
	deleteIngredientCocktail,
	deleteDescriptionCocktail,
} = elementCocktailResolvers;

const { user, deleteUser } = userResolvers;

const { gout, gouts, createGout, modifyGout, deleteGout } = goutResolvers;

module.exports.root = {
	Query: {
		ingredient,
		ingredients,
		ingredientsFamily,
		bestIngredients,
		searchIngredient,
		inventorySelection,

		gout,
		gouts,

		cocktail,
		cocktails,
		availCocktails,
		createdCocktails,

		user,
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

		deleteUser,
	},
};
