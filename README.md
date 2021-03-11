# Cocktail craft API GRAPHQL

## API documentation

```
type BestIngredients {
  id: Int
  nom: String
  alias: [String]
  family_of: [Int]
  hasFamily: Boolean
  count: Int
}

type Cocktails {
  id: Int
  nom: String
  descriptions: [Description]
  ingredients: [Ingredient]
  gout_array: [Int]
  difficulty: String
  user_id: Int
  username: String
  image: String
}

type Description {
  id: Int
  content: String
  preparation: String
  id_cocktail: Int
}

input descriptionInput {
  content: String!
  preparation: String!
  id_cocktail: Int!
}

type Gouts {
  id: Int
  nom: String
}

type Ingredient {
  id: Int
  ingredient_id: Int
  volume: String
  nom: String
  id_cocktail: Int
}

input ingredientInput {
  ingredient_id: Int!
  volume: String!
  id_cocktail: Int!
}

type Ingredients {
  id: Int
  nom: String
  alias: [String]
  family_of: [Int]
  hasFamily: Boolean
}

type Mutation {
  createIngredient(nom: String!, alias: [String], family_of: [Int]): String
  modifyIngredient(
    nom: String!
    alias: [String]
    family_of: [Int]
    id: Int!
  ): String
  deleteIngredient(id: Int!): String
  createGout(nom: String!): String
  modifyGout(nom: String!, id: Int!): String
  deleteGout(id: Int!): String
  createCocktail(
    nom: String!
    gout_array: [Int!]!
    difficulty: String!
    file: Upload
  ): String
  modifyCocktail(
    nom: String!
    gout_array: [Int!]!
    difficulty: String!
    file: Upload
    id: Int!
  ): String
  deleteCocktail(id: Int!): String
  setVisibility(id: Int!, is_visible: Boolean!): String
  createDescriptionCocktail(input: descriptionInput!): String
  createIngredientCocktail(input: ingredientInput!): String
  modifyDescriptionCocktail(input: descriptionInput!): String
  modifyIngredientCocktail(input: ingredientInput!): String
  deleteDescriptionCocktail(input: descriptionInput!): String
  deleteIngredientCocktail(input: ingredientInput!): String
  deleteUser: String
  reportUser(user_id: Int!): String
  banUser(user_id: Int!): String
  addNote(cocktail_id: Int!, rate: Float!): String
  addLovedCocktail(cocktail_id: Int!): String
  deleteLovedCocktail(cocktail_id: Int!): String
  addToHistory(cocktail_id: Int!): String
  addNotifications(message: String!, user_id: Int!): String
  deleteNotifications(id: Int!): String
}

type Note {
  rate: Float
  count: Int
}

type Notifications {
  message: String
  time: String
  id: Int
}

type Query {
  ingredient(id: Int!): Ingredients
  ingredients: [Ingredients]
  ingredientsFamily(family_of: [Int!]!): [Ingredients]
  bestIngredients(inventory: [Int]): [BestIngredients]
  inventorySelection(
    cluster: [Int]
    inventory: [Int]
    preparations: [String]
  ): [Ingredients]
  searchIngredient(search: String, isFamilyIncluded: Boolean): [Ingredients]
  gout(id: Int!): Gouts
  gouts: [Gouts]
  cocktail(id: Int!, is_visible: Boolean): Cocktails
  cocktails(is_visible: Boolean): [Cocktails]
  availCocktails(ingredient_array: [Int!]!): [Cocktails]
  craftedCocktails(cluster: [Int!]!): [Cocktails]
  createdCocktailsByUser: [Cocktails]
  user: User
  cocktailNote(cocktail_id: Int!): Note
  lovedCocktails: [Cocktails]
  history: [Cocktails]
  notifications: [Notifications]
}

type User {
  id: Int
  username: String
  experience: Int
  rank_id: Int
  rank_name: String
  level_progression: Int
  cocktail_created_count: Int
  note_count: Int
  cocktail_created_in_day: Int
  cocktail_crafted_count: Int
}
```

## Présentation du projet

### A quoi ca sert ?

CocktailCraft est une application mobile dans l'objectif de créer des cocktails. Elle permet de découvrir plus facilement de nombreux cocktails à partir des ingrédients que vous aimez. L'application vous accompagne pour choisir les meilleurs ingrédients et faire le plus de cocktails possible. Réussissez vos soirées cocktails avec brio.

### Comment faire ?

Choisissez vos ingrédients, composez vos cocktails à partir de votre sélection, suivez la recette et buvez ! Tout plein de cocktails sont disponibles, des plus simples au plus ardus.

Un cocktail que vous aimez manque ou vous avez composé votre propre cocktail ?
Vous pouvez l'ajouter à nos cocktails existants et le faire partager aux autres utilisateurs. Ces derniers pourront vous laisser un retour en notant votre cocktail

### Autres informations

Depuis votre compte, vous pouvez voir votre avancée sur CocktailCraft : vous pouvez enregistrer les cocktails qui vous ont marqués et voir ceux que vous avez ajouter à l'application. Utilisez l'application afin de gagner des niveaux et monter en rang !
