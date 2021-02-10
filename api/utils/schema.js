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

const {
	schema: noteSchema,
	resolvers: noteResolvers,
} = require('../note/type');

const {
	schema: notifSchema,
	resolvers: notifResolvers,
} = require('../notifications/type');

module.exports.schema = `
    type Query {
        ingredient(id: Int!): Ingredients
		ingredients: [Ingredients]
		ingredientsFamily(family_of:[Int!]!): [Ingredients]
        bestIngredients(inventory:[Int]): [Ingredients]
        inventorySelection(cluster:[Int], inventory:[Int], preparations:[String]): [Ingredients]
        searchIngredient(search: String, isFamilyIncluded: Boolean): [Ingredients]

        gout(id: Int!): Gouts
        gouts: [Gouts]

        cocktail(id : Int!, is_visible: Boolean): Cocktails
        cocktails(is_visible: Boolean) : [Cocktails]
        availCocktails(ingredient_array : [Int!]!) : [Cocktails]
		craftedCocktails(cluster: [Int!]!): [Cocktails]
		createdCocktailsByUser: [Cocktails]

		user: User

		cocktailNote(cocktail_id: Int!): Note

		lovedCocktails: [Cocktails]

		history: [Cocktails]

		notifications: [Notifications]
    }
    type Mutation {
        createIngredient(nom: String!, alias:[String], family_of:[Int]): String
        modifyIngredient(nom: String!, alias:[String], family_of:[Int], id: Int!): String
        deleteIngredient(id: Int!): String
        
        createGout(nom: String!): String
        modifyGout(nom: String!, id: Int!): String
        deleteGout(id: Int!): String

        createCocktail(nom: String!, gout_array: [Int!]!, difficulty : String!, file: Upload) : String
        modifyCocktail(nom: String!, gout_array: [Int!]!, difficulty : String!, file: Upload, id: Int!) : String
        deleteCocktail(id: Int!): String
		setVisibility(id: Int!, is_visible: Boolean!): String

        createDescriptionCocktail(input: descriptionInput!): String
        createIngredientCocktail(input: ingredientInput!):String

        modifyDescriptionCocktail(input: descriptionInput!): String
        modifyIngredientCocktail(input: ingredientInput!):String

        deleteDescriptionCocktail(input: descriptionInput!): String
		deleteIngredientCocktail(input: ingredientInput!): String
		
		deleteUser: String
		reportUser(user_id: Int!): String
		banUser(user_id: Int!):String

		addNote(cocktail_id: Int!, rate: Float!): String

		addLovedCocktail(cocktail_id: Int!): String
		deleteLovedCocktail(cocktail_id: Int!): String

		addToHistory(cocktail_id: Int!): String

		addNotifications(message: String!, user_id: Int!): String
		deleteNotifications(id: Int!): String
    } 
    ${ingredientSchema}
    ${cocktailSchema}
	${goutSchema}
	${elementCocktailSchema}
	${userSchema}
	${noteSchema}
	${notifSchema}
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
	craftedCocktails,
	lovedCocktails,
	createdCocktailsByUser,
	history,
	createCocktail,
	modifyCocktail,
	deleteCocktail,
	addLovedCocktail,
	deleteLovedCocktail,
	setVisibility,
	addToHistory,
} = cocktailResolvers;

const {
	createDescriptionCocktail,
	createIngredientCocktail,
	modifyDescriptionCocktail,
	modifyIngredientCocktail,
	deleteIngredientCocktail,
	deleteDescriptionCocktail,
} = elementCocktailResolvers;

const { user, deleteUser, reportUser, banUser } = userResolvers;

const { gout, gouts, createGout, modifyGout, deleteGout } = goutResolvers;

const { addNote, cocktailNote } = noteResolvers;

const { addNotifications, deleteNotifications, notifications } = notifResolvers;

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
		craftedCocktails,
		createdCocktailsByUser,

		user,

		cocktailNote,
		lovedCocktails,
		history,

		notifications,
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
		setVisibility,

		createDescriptionCocktail,
		createIngredientCocktail,
		modifyDescriptionCocktail,
		modifyIngredientCocktail,
		deleteIngredientCocktail,
		deleteDescriptionCocktail,

		deleteUser,
		reportUser,
		banUser,

		addNote,

		addLovedCocktail,
		deleteLovedCocktail,
		addToHistory,

		addNotifications,
		deleteNotifications,
	},
};
