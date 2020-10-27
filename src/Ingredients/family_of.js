import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllIngredients } from '../api/ingredients/query';
import {
	setFamily,
	addFamily,
	updateFamily,
	deleteFamily,
} from '../redux/actions/family_ingredient';

const Family = props => {
	const {
		setFamily,
		addFamily,
		updateFamily,
		deleteFamily,
		family_of,
	} = props;

	const [payloadId, setPayloadId] = useState(0);
	const [ingredients, setIngredients] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const ingredients = await getAllIngredients();
			setIngredients(ingredients);
			setFamily(props.data);
			setPayloadId(props.data.length);
		}
		fetchData();
	}, [props.data, setFamily]);

	return (
		<div className="form-group">
			<label>Famille de </label>
			{family_of.map(({ id, ingredientId }) => {
				return (
					<div
						className="form-row"
						style={{ margin: '1vw' }}
						key={id}
					>
						<div className="col">
							<div class="input-group mb-3">
								<select
									className="custom-select"
									value={ingredientId}
									onChange={e =>
										updateFamily({
											id,
											ingredientId: e.target.value,
										})
									}
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
								<div class="input-group-append">
									<button
										type="button"
										class="btn btn-outline-secondary"
										onClick={() =>
											deleteFamily({
												id,
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
				onClick={() => {
					setPayloadId(payloadId => (payloadId += 1));
					addFamily(payloadId);
				}}
				className="btn btn-primary"
			>
				AJOUTER
			</button>
		</div>
	);
};

const mapStateToProps = state => ({
	family_of: state.family_of,
});

const mapDispatchToProps = dispatch => ({
	setFamily: payload => dispatch(setFamily(payload)),
	addFamily: payload => dispatch(addFamily(payload)),
	updateFamily: payload => dispatch(updateFamily(payload)),
	deleteFamily: payload => dispatch(deleteFamily(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Family);
