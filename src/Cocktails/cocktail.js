import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getOneCocktails } from '../api/cocktail/query';
import { getAllIngredients } from '../api/ingredients/query';
import { getAllGouts } from '../api/gouts/query';
const Cocktail = () => {
	let { id } = useParams();

	const [cocktail, setCocktail] = useState({
		nom: '',
		difficulty: '',
		ingredients: [],
		descriptions: [],
		gout_array: [],
	});
	const [ingredients, setIngredients] = useState([]);
	const [gouts, setGouts] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const cocktail = await getOneCocktails(parseInt(id));
			setCocktail(cocktail);
			const ingredients = await getAllIngredients();
			setIngredients(ingredients);
			const gouts = await getAllGouts();
			setGouts(gouts);
		}
		fetchData();
	}, [setCocktail, setIngredients, id]);

	return (
		<div className="container" style={{ marginTop: '2vw' }}>
			<form>
				<div className="form-group">
					<label>Nom</label>
					<input
						type="text"
						className="form-control"
						placeholder="Saisir un nom"
						value={cocktail.nom}
						onChange={e => {
							const val = e.target.value;
							setCocktail(prevState => {
								return { ...prevState, nom: val };
							});
						}}
					/>
				</div>
				<div className="form-group">
					<label>Difficulté</label>
					<select
						className="custom-select"
						value={cocktail.difficulty}
						onChange={e => {
							const val = e.target.value;
							setCocktail(prevState => {
								return { ...prevState, difficulty: val };
							});
						}}
					>
						<option value="Très facile">Très facile</option>
						<option value="Facile">Facile</option>
						<option value="Normal">Normal</option>
						<option value="Difficile">Difficile</option>
					</select>
				</div>
				<div className="form-group">
					<label>Gouts</label>
					{cocktail.gout_array.map((goutId, index) => {
						return (
							<div
								className="form-row"
								style={{ margin: '1vw' }}
								key={id}
							>
								<div className="col">
									<select
										className="custom-select"
										value={goutId}
									>
										{gouts.map(gout => {
											return (
												<option value={gout.id}>
													{gout.nom}
												</option>
											);
										})}
									</select>
								</div>
							</div>
						);
					})}
				</div>
				<div className="form-group">
					<label>Ingrédients</label>
					{cocktail.ingredients.map(
						({ id, ingredient_id, nom, volume, cocktail_id }) => {
							return (
								<div
									className="form-row"
									style={{ margin: '1vw' }}
									key={id}
								>
									<div className="col">
										<select
											className="custom-select"
											value={ingredient_id}
										>
											{ingredients.map(ingredient => {
												return (
													<option
														value={ingredient.id}
													>
														{ingredient.nom}
													</option>
												);
											})}
										</select>
									</div>
									<div className="col">
										<input
											type="text"
											className="form-control"
											placeholder="Saisir un volume"
											value={volume}
										/>
									</div>
								</div>
							);
						}
					)}
				</div>
				<div className="form-group">
					<label>Descriptions</label>
					{cocktail.descriptions.map(
						({ id, content, preparation }) => {
							return (
								<div
									className="form-row"
									style={{ margin: '1vw' }}
									key={id}
								>
									<div className="col">
										<textarea
											rows="5"
											type="text"
											className="form-control"
											placeholder="Saisir un volume"
											value={content}
										/>
									</div>
									<div className="col">
										<input
											type="text"
											className="form-control"
											placeholder="Saisir un volume"
											value={preparation}
										/>
									</div>
								</div>
							);
						}
					)}
				</div>
				<button type="submit" className="btn btn-primary">
					Modifier
				</button>
			</form>
		</div>
	);
};

export default Cocktail;
