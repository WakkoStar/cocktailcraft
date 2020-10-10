import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOneIngredients } from '../api/ingredients/query';
import { getAllIngredients } from '../api/ingredients/query';

import {
	setAlias,
	addAlias,
	updateAlias,
	deleteAlias,
} from '../redux/actions/alias_ingredient';

const Ingredient = props => {
	const { setAlias, addAlias, updateAlias, deleteAlias, aliases } = props;
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
			setAlias(ingredient.alias);
		}
		fetchData();
	}, [setIngredient, setIngredients, setAlias, id]);

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
					{aliases.map(alias => {
						return (
							<div
								className="form-row"
								style={{ margin: '1vw' }}
								key={alias.id}
							>
								<div className="col">
									<div class="input-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Saisir un nom"
											value={alias.nom}
											onChange={e =>
												updateAlias({
													id: alias.id,
													nom: e.target.value,
												})
											}
										/>
										<div class="input-group-append">
											<button
												type="button"
												class="btn btn-outline-secondary"
												onClick={() =>
													deleteAlias({
														id: alias.id,
													})
												}
											>
												EFFACER
											</button>
										</div>
									</div>
								</div>
							</div>
						);
					})}
					<button
						type="button"
						onClick={addAlias}
						className="btn btn-primary"
					>
						AJOUTER
					</button>
				</div>
				<button type="button" className="btn btn-primary">
					Modifier
				</button>
			</form>
		</div>
	);
};

const mapStateToProps = state => ({
	aliases: state.aliases,
});

const mapDispatchToProps = dispatch => ({
	setAlias: payload => dispatch(setAlias(payload)),
	addAlias: payload => dispatch(addAlias(payload)),
	updateAlias: payload => dispatch(updateAlias(payload)),
	deleteAlias: payload => dispatch(deleteAlias(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);
