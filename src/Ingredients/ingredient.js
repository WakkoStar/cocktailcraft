import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getOneIngredients } from '../api/ingredients/query';
import { getAllIngredients } from '../api/ingredients/query';
const Ingredient = () => {
	let { id } = useParams();

	const [ingredient, setIngredient] = useState({
		nom: '',
		alias: [],
		family_of: [],
	});
	const [ingredients, setIngredients] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const ingredient = await getOneIngredients(parseInt(id));
			setIngredient(ingredient);
			const ingredients = await getAllIngredients();
			setIngredients(ingredients);
		}
		fetchData();
	}, [setIngredient, setIngredients, id]);

	return (
		<div className="container" style={{ marginTop: '2vw' }}>
			<form>
				<div className="form-group">
					<label>Nom</label>
					<input
						type="text"
						className="form-control"
						placeholder="Saisir un nom"
						value={ingredient.nom}
						onChange={e => {
							const val = e.target.value;
							setIngredient(prevState => {
								return { ...prevState, nom: val };
							});
						}}
					/>
				</div>
				<div className="form-group">
					<label>Famille de </label>
					{ingredient.family_of.map(ingredientId => {
						return (
							<div
								className="form-row"
								style={{ margin: '1vw' }}
								key={id}
							>
								<div className="col">
									<select
										className="custom-select"
										value={ingredientId}
									>
										<option value="-1">Aucun</option>
										{ingredients.map(ingredient => {
											return (
												<option value={ingredient.id}>
													{ingredient.nom}
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
					<label>Alias</label>
					{ingredient.alias.map(alias => {
						return (
							<div
								className="form-row"
								style={{ margin: '1vw' }}
								key={id}
							>
								<div className="col">
									<input
										type="text"
										className="form-control"
										placeholder="Saisir un volume"
										value={alias}
									/>
								</div>
							</div>
						);
					})}
				</div>
				<button type="submit" className="btn btn-primary">
					Modifier
				</button>
			</form>
		</div>
	);
};

export default Ingredient;
