import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	setIngredient,
	addIngredient,
	updateIngredient,
	deleteIngredient,
} from '../redux/actions/ingredient_cocktail';

import { getAllIngredients } from '../api/ingredients/query';

const Ingredients = props => {
	const {
		setIngredient,
		addIngredient,
		updateIngredient,
		deleteIngredient,
		ingredients,
	} = props;

	const [payloadId, setPayloadId] = useState(0);
	const [ingredientsInDb, setIngredientsInDb] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const ingredientsInDb = await getAllIngredients();
			setIngredientsInDb(ingredientsInDb);
			setIngredient(props.data);
			setPayloadId(props.data.length);
		}
		fetchData();
	}, [props.data, setIngredient]);

	return (
		<div className="form-group">
			<label>Ingrédients</label>
			{ingredients.map(({ id, ingredient_id, volume }) => {
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
								onChange={e =>
									updateIngredient({
										id,
										ingredient_id: e.target.value,
										volume,
									})
								}
							>
								{ingredientsInDb.map(ingredient => {
									return (
										<option value={ingredient.id}>
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
								onChange={e =>
									updateIngredient({
										id,
										ingredient_id,
										volume: e.target.value,
									})
								}
							/>
						</div>
						<div class="col">
							<button
								type="button"
								class="btn btn-outline-secondary"
								onClick={() =>
									deleteIngredient({
										id,
									})
								}
							>
								EFFACER
							</button>
						</div>
					</div>
				);
			})}
			<button
				type="button"
				onClick={() => {
					setPayloadId(payloadId => (payloadId += 1));
					addIngredient(payloadId);
				}}
				className="btn btn-primary"
			>
				AJOUTER
			</button>
		</div>
	);
};

const mapStateToProps = state => ({
	ingredients: state.ingredients,
});

const mapDispatchToProps = dispatch => ({
	setIngredient: payload => dispatch(setIngredient(payload)),
	addIngredient: payload => dispatch(addIngredient(payload)),
	updateIngredient: payload => dispatch(updateIngredient(payload)),
	deleteIngredient: payload => dispatch(deleteIngredient(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);
