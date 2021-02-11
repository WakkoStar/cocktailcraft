module.exports.mockCocktail = {
	id: '18',
	nom: 'Mojito',
	gout_array: ['19', '1'],
	difficulty: 'Moyen',
	user_id: '0',
	username: 'Hugo',
	is_visible: true,
	image: 'Mojito.jpg',
	ingredients: [
		{
			el_id: '30',
			ingredient_id: '138',
			nom: 'Sucre',
			volume: '2.5 morceau(x)',
			id_cocktail: '18',
			id: '30',
		},
		{
			el_id: '29',
			ingredient_id: '23',
			nom: 'Rhum blanc',
			volume: '4 cL',
			id_cocktail: '18',
			id: '29',
		},
		{
			el_id: '31',
			ingredient_id: '162',
			nom: 'feuille(s) de Menthe',
			volume: '5 Aucune unité',
			id_cocktail: '18',
			id: '31',
		},
	],
	descriptions: [
		{
			el_id: '20',
			content: `Dans un shaker, mettez 5 feuille(s) de menthe∰∎≹Puis 4 cl de rhum blanc∰∎≹Puis 2.5 morceau(x) de sucre∰∎≹Ajouter 6 à 8 glaçons dans le 
shaker.∰∎≹Shakez une dizaine de secondes.∰∎≹Remplissez le verre de 2 à 4 glaçons.∰∎≹Mélangez avec une cuillère à mélange ou équivalent.∰∎≹Se boit frais.∰∎≹`,
			preparation: 'Au shaker',
			id_cocktail: '18',
			id: '20',
		},
	],
	isExist: true,
};

module.exports.mockNotes = [
	{ id: 0, cocktail_id: 0, user_id: 0, rate: 4 },
	{ id: 1, cocktail_id: 0, user_id: 1, rate: 0 },
];

module.exports.mockNotifications = [
	{ id: 0, user_id: 0, time: null, message: 'test' },
	{ id: 1, user_id: 0, time: null, message: 'test' },
];

module.exports.mockNotification = { message: 'test', user_id: 0 };

module.exports.mockIngredients = [
	{
		id: 0,
		nom: 'Curacao bleu',
		alias: [],
		family_of: [2, 3],
	},
	{
		id: 1,
		nom: 'Rhum Ambré',
		alias: ['Negritta', 'Saint-James'],
		family_of: [5],
	},
	{
		id: 2,
		nom: 'Triple sec',
		alias: [''],
		family_of: [],
	},
	{
		id: 3,
		nom: 'Curacao',
		family_of: [],
		alias: [],
	},
	{
		id: 4,
		nom: 'Pontarlier',
		family_of: [],
		alias: ['Pont-doux'],
	},
	{
		id: 5,
		nom: 'Rhum',
		family_of: [],
		alias: [],
	},
];

module.exports.mockIngredient = {
	id: 0,
	nom: 'Curacao bleu',
	alias: [],
	family_of: [2, 3],
	isExist: true,
};

module.exports.mockUser = {
	id: 0,
	username: 'Hugo',
	cocktail_created_in_day: -990,
	is_admin: true,
	provider_id: 2827765287470350,
	experience: 200,
	provider_name: 'facebook',
	report_count: 0,
	has_ban: false,
	cocktail_crafted_count: 25,
};

module.exports.mockLevels = [
	{ id: 1, rank: 'Bleu', experience: 0 },
	{ id: 2, rank: 'Débutant', experience: 100 },
	{ id: 3, rank: 'Aspirant', experience: 300 },
];

module.exports.mockCtx = {
	user: {
		is_admin: true,
		id: 0,
		cocktail_created_in_day: 2,
		experience: 100,
	},
};

module.exports.mockGouts = [
	{ id: 0, nom: 'Menthe' },
	{ id: 1, nom: 'Rhum' },
];

module.exports.mockHistory = [
	{
		cocktail_id: '18',
		nom: 'Mojito',
		gout_array: ['19', '1'],
		difficulty: 'Moyen',
		user_id: '0',
		username: 'Hugo',
		image: 'Mojito.jpg',
	},
	{
		cocktail_id: '19',
		nom: 'Bellini',
		gout_array: ['18', '2'],
		difficulty: 'Facile',
		user_id: '0',
		username: 'Hugo',
		image: 'Bellini.jpg',
		isExist: true,
	},
];

module.exports.mockLoved = [
	{
		cocktail_id: '18',
		nom: 'Mojito',
		gout_array: ['19', '1'],
		difficulty: 'Moyen',
		user_id: '0',
		username: 'Hugo',
		image: 'Mojito.jpg',
	},
	{
		cocktail_id: '19',
		nom: 'Bellini',
		gout_array: ['18', '2'],
		difficulty: 'Facile',
		user_id: '0',
		username: 'Hugo',
		image: 'Bellini.jpg',
		isExist: true,
	},
];

module.exports.mockCocktails = [
	{
		id: '18',
		nom: 'Mojito',
		gout_array: ['19', '1'],
		difficulty: 'Moyen',
		user_id: '0',
		username: 'Hugo',
		image: 'Mojito.jpg',
		is_visible: true,
		isExist: true,
	},
	{
		id: '19',
		nom: 'Bellini',
		gout_array: ['18', '2'],
		difficulty: 'Facile',
		user_id: '0',
		username: 'Hugo',
		image: 'Bellini.jpg',
		is_visible: true,
		isExist: true,
	},
	{
		id: '20',
		nom: 'test',
		gout_array: ['18', '2'],
		difficulty: 'Facile',
		user_id: '0',
		username: 'Hugo',
		image: 'Bellini.jpg',
		is_visible: true,
		isExist: true,
	},
	{
		id: '21',
		nom: 'test2',
		gout_array: ['18', '2'],
		difficulty: 'Facile',
		user_id: '0',
		username: 'Hugo',
		image: 'Bellini.jpg',
		is_visible: true,
		isExist: true,
	},
];

module.exports.mockDevCocktails = [
	{
		id: '18',
		nom: 'Mojito',
		gout_array: ['19', '1'],
		difficulty: 'Moyen',
		user_id: '0',
		username: 'Hugo',
		image: 'Mojito.jpg',
		is_visible: false,
		isExist: true,
	},
	{
		id: '19',
		nom: 'Bellini',
		gout_array: ['18', '2'],
		difficulty: 'Facile',
		user_id: '0',
		username: 'Hugo',
		image: 'Bellini.jpg',
		is_visible: false,
		isExist: true,
	},
	{
		id: '20',
		nom: 'test',
		gout_array: ['18', '2'],
		difficulty: 'Facile',
		user_id: '0',
		username: 'Hugo',
		image: 'Bellini.jpg',
		is_visible: false,
		isExist: true,
	},
	{
		id: '21',
		nom: 'test2',
		gout_array: ['18', '2'],
		difficulty: 'Facile',
		user_id: '0',
		username: 'Hugo',
		image: 'Bellini.jpg',
		is_visible: false,
		isExist: true,
	},
];

module.exports.mockDevCocktail = {
	id: '18',
	nom: 'Mojito',
	gout_array: ['19', '1'],
	difficulty: 'Moyen',
	user_id: '0',
	username: 'Hugo',
	image: 'Mojito.jpg',
	ingredients: [
		{
			el_id: '30',
			ingredient_id: '138',
			nom: 'Sucre',
			volume: '2.5 morceau(x)',
			id_cocktail: '18',
			id: '30',
		},
		{
			el_id: '29',
			ingredient_id: '23',
			nom: 'Rhum blanc',
			volume: '4 cL',
			id_cocktail: '18',
			id: '29',
		},
		{
			el_id: '31',
			ingredient_id: '162',
			nom: 'feuille(s) de Menthe',
			volume: '5 Aucune unité',
			id_cocktail: '18',
			id: '31',
		},
	],
	descriptions: [
		{
			el_id: '20',
			content: `Dans un shaker, mettez 5 feuille(s) de menthe∰∎≹Puis 4 cl de rhum blanc∰∎≹Puis 2.5 morceau(x) de sucre∰∎≹Ajouter 6 à 8 glaçons dans le 
shaker.∰∎≹Shakez une dizaine de secondes.∰∎≹Remplissez le verre de 2 à 4 glaçons.∰∎≹Mélangez avec une cuillère à mélange ou équivalent.∰∎≹Se boit frais.∰∎≹`,
			preparation: 'Au shaker',
			id_cocktail: '18',
			id: '20',
		},
	],
	is_visible: false,
	isExist: true,
};
