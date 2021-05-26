// const app = require('./server'); // Link to your server file
// const supertest = require('supertest');
// const { deleteCocktail } = require('./api/cocktail/mutation');
// const {
// 	deleteDescriptionCocktail,
// 	deleteIngredientCocktail,
// } = require('./api/cocktail/ingredient_and_description/mutation');
// const request = supertest(app);

// describe('Cocktails - queries', () => {
// 	it('should fetch cocktails', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query: '{ cocktails{ id, nom} }',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				const cocktails = res.body.data.cocktails;
// 				expect(cocktails.find(({ id }) => id === 69).nom).toEqual(
// 					'Hugo'
// 				);
// 				done();
// 			});
// 	});

// 	it('should fetch cocktails for user', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query: '{ createdCocktailsByUser{id, nom} }',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				const cocktails = res.body.data.createdCocktailsByUser;
// 				expect(cocktails.length).toBeGreaterThan(0);
// 				done();
// 			});
// 	});

// 	it('should fetch cocktails loved', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query: '{lovedCocktails{id, nom}}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				const cocktails = res.body.data.lovedCocktails;
// 				expect(cocktails.length).toBeGreaterThan(0);
// 				done();
// 			});
// 	});

// 	it('should fetch cocktails history', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query: '{history{id, nom}}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				const cocktails = res.body.data.history;
// 				expect(cocktails.length).toBeGreaterThan(0);
// 				done();
// 			});
// 	});

// 	it('should fetch cocktail Note', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query: '{cocktailNote(cocktail_id: 85){rate, count}}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				const cocktail = res.body.data.cocktailNote;
// 				expect(cocktail.count).toBeGreaterThan(0);
// 				done();
// 			});
// 	});

// 	it('should  not fetch cocktail Note because id cocktail not founded', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query: '{cocktailNote(cocktail_id: 2929385){rate, count}}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				const errMsg = res.body.errors[0].message;
// 				expect(errMsg).toEqual(
// 					'Unexpected error value: "Cocktail not found"'
// 				);
// 				done();
// 			});
// 	});

// 	it('should fetch cocktail Hugo', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query: '{cocktail(id: 69){id, nom}}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				const cocktail = res.body.data.cocktail;
// 				expect(cocktail.nom).toEqual('Hugo');
// 				done();
// 			});
// 	});

// 	it('shouldnt fetch cocktail, no id founded', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query: '{cocktail(id: 3929){id, nom}}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				const errMsg = res.body.errors[0].message;
// 				expect(errMsg).toEqual(
// 					'Unexpected error value: "cocktail no founded"'
// 				);
// 				done();
// 			});
// 	});

// 	it('shouldnt fetch dev cocktail when is_admin is false', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query: '{cocktail(id: 69, is_visible: false){id, nom}}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const errMsg = res.body.errors[0].message;
// 				if (err) return done(err);
// 				expect(errMsg).toEqual('Unexpected error value: "Not admin"');
// 				done();
// 			});
// 	});
// });

// describe('Cocktails - mutations', () => {
// 	let idCocktail = 1032049;

// 	it('should create Cocktail', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query:
// 					'mutation{createCocktail(nom: "test", gout_array:[2,5], difficulty: "Très facile")}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const id = res.body.data.createCocktail;
// 				idCocktail = parseInt(id);
// 				if (err) return done(err);
// 				expect(idCocktail).toBeGreaterThan(100);
// 				done();
// 			});
// 	});

// 	it('should  not create Cocktail because test already exists', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query:
// 					'mutation{createCocktail(nom: "test", gout_array:[2,5], difficulty: "Très facile")}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const errMsg = res.body.errors[0].message;
// 				if (err) return done(err);
// 				expect(errMsg).toEqual(
// 					'Unexpected error value: "Cocktail already exists or you can\'t create new cocktail"'
// 				);
// 				done();
// 			});
// 	});

// 	it('shouldnt modify Cocktail', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query:
// 					'mutation{modifyCocktail(id: 2, nom: "test", gout_array:[2,5], difficulty: "Très facile")}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const errMsg = res.body.errors[0].message;
// 				if (err) return done(err);
// 				expect(errMsg).toEqual('Unexpected error value: "Not admin"');
// 				done();
// 			});
// 	});

// 	it('shouldnt delete Cocktail because not admin', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query: 'mutation{deleteCocktail(id: 3)}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const errMsg = res.body.errors[0].message;
// 				if (err) return done(err);
// 				expect(errMsg).toEqual('Unexpected error value: "Not admin"');
// 				done();
// 			});
// 	});

// 	it('should create Description', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query:
// 					'mutation{createDescriptionCocktail(input:{content: "test test test",preparation: "Au shaker", id_cocktail: ' +
// 					idCocktail +
// 					' })}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const msg = res.body.data.createDescriptionCocktail;
// 				if (err) return done(err);
// 				expect(msg).toEqual('Description created');
// 				done();
// 			});
// 	});

// 	it('should not create Description because preparation is already exists', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query:
// 					'mutation{createDescriptionCocktail(input:{content: "test test test",preparation: "Au shaker", id_cocktail: ' +
// 					idCocktail +
// 					' })}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const errMsg = res.body.errors[0].message;
// 				if (err) return done(err);
// 				expect(errMsg).toEqual(
// 					'Unexpected error value: "Preparation already added"'
// 				);
// 				done();
// 			});
// 	});

// 	it('should not create Description because content is invalid', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query:
// 					'mutation{createDescriptionCocktail(input:{content: "te",preparation: "Directement dans le verre", id_cocktail: ' +
// 					idCocktail +
// 					' })}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const errMsg = res.body.errors[0].message;
// 				if (err) return done(err);
// 				expect(errMsg).toEqual(
// 					'Unexpected error value: "Can\'t create description, no valid"'
// 				);
// 				done();
// 			});
// 	});

// 	it('should not create Description because preparation is invalid', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query:
// 					'mutation{createDescriptionCocktail(input:{content: "test test test",preparation: "Dans le verre", id_cocktail: ' +
// 					idCocktail +
// 					' })}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const errMsg = res.body.errors[0].message;
// 				if (err) return done(err);
// 				expect(errMsg).toEqual(
// 					'Unexpected error value: "Can\'t create description, no valid"'
// 				);
// 				done();
// 			});
// 	});

// 	it('should not create Description because id_cocktail is invalid', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query:
// 					'mutation{createDescriptionCocktail(input:{content: "test test test",preparation: "Dans le verre", id_cocktail: ' +
// 					1293993 +
// 					' })}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const errMsg = res.body.errors[0].message;
// 				if (err) return done(err);
// 				expect(errMsg).toEqual(
// 					'Unexpected error value: "Can\'t create description, no valid"'
// 				);
// 				done();
// 			});
// 	});

// 	it('should create Ingredient', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query:
// 					'mutation{createIngredientCocktail(input:{ingredient_id: 38,volume: "2 cL", id_cocktail: ' +
// 					idCocktail +
// 					' })}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const msg = res.body.data.createIngredientCocktail;
// 				if (err) return done(err);
// 				expect(msg).toEqual('Ingredient created');
// 				done();
// 			});
// 	});

// 	it('should not create Ingredient because ingredient_id not valid', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query:
// 					'mutation{createIngredientCocktail(input:{ingredient_id: 2393,volume: "2 cL", id_cocktail: ' +
// 					idCocktail +
// 					' })}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const errMsg = res.body.errors[0].message;
// 				if (err) return done(err);
// 				expect(errMsg).toEqual(
// 					'Unexpected error value: "Cant create this ingredient, no valid"'
// 				);
// 				done();
// 			});
// 	});

// 	it('should not create Ingredient because volume not valid', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query:
// 					'mutation{createIngredientCocktail(input:{ingredient_id: 38,volume: "2 couille", id_cocktail: ' +
// 					idCocktail +
// 					' })}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const errMsg = res.body.errors[0].message;
// 				if (err) return done(err);
// 				expect(errMsg).toEqual(
// 					'Unexpected error value: "Cant create this ingredient, no valid"'
// 				);
// 				done();
// 			});
// 	});

// 	it('should not create Ingredient because id_cocktail not valid', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query:
// 					'mutation{createIngredientCocktail(input:{ingredient_id: 2393,volume: "2 cL", id_cocktail: ' +
// 					2392 +
// 					' })}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const errMsg = res.body.errors[0].message;
// 				if (err) return done(err);
// 				expect(errMsg).toEqual(
// 					'Unexpected error value: "Cant create this ingredient, no valid"'
// 				);
// 				done();
// 			});
// 	});

// 	it('should not create Ingredient because cocktail is visible', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query:
// 					'mutation{createIngredientCocktail(input:{ingredient_id: 2393,volume: "2 cL", id_cocktail: ' +
// 					0 +
// 					' })}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const errMsg = res.body.errors[0].message;
// 				if (err) return done(err);
// 				expect(errMsg).toEqual(
// 					'Unexpected error value: "Cant create this ingredient, no valid"'
// 				);
// 				done();
// 			});
// 	});

// 	it('should not change visibility', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query:
// 					'mutation {setVisibility(id: ' +
// 					idCocktail +
// 					', is_visible: true)}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				const errMsg = res.body.data.setVisibility;
// 				if (err) return done(err);
// 				expect(errMsg).toEqual('Not admin');
// 				done();
// 			});
// 	});

// 	it('should fetch notifications', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query: '{notifications{message}}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				const notif = res.body.data.notifications[0];
// 				expect(notif.message).toEqual(
// 					'Votre cocktail "test" a été soumis, nous traitons votre demande...'
// 				);
// 				done();
// 			});
// 	});

// 	it('add to history', async done => {
// 		request
// 			.post('/graphql')
// 			.send({
// 				query: '{notifications{message}}',
// 			})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(200)
// 			.end(function (err, res) {
// 				if (err) return done(err);
// 				const notif = res.body.data.notifications[0];
// 				expect(notif.message).toEqual(
// 					'Votre cocktail "test" a été soumis, nous traitons votre demande...'
// 				);
// 				done();
// 			});
// 	});

// 	afterAll(() => {
// 		Promise.all([
// 			deleteDescriptionCocktail(
// 				null,
// 				{
// 					input: {
// 						content: '',
// 						preparation: 'Au shaker',
// 						id_cocktail: idCocktail,
// 					},
// 				},
// 				{ user: { is_admin: true } }
// 			),
// 			deleteIngredientCocktail(
// 				null,
// 				{
// 					input: {
// 						ingredient_id: 38,
// 						volume: '',
// 						id_cocktail: idCocktail,
// 					},
// 				},
// 				{ user: { is_admin: true } }
// 			),
// 		]).then(() => {
// 			deleteCocktail(
// 				null,
// 				{ id: idCocktail },
// 				{ user: { is_admin: true } }
// 			);
// 		});
// 	});
// });
