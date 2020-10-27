import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createCocktail } from '../api/cocktails/mutation';
import {
	refreshIngredient,
	refreshDescription,
} from '../api/cocktails/ingredient_and_description/mutation';
import Ingredients from './ingredients';
import Gouts from './gouts';
import Descriptions from './descriptions';

const Cocktail = props => {
	let history = useHistory();
	const { gouts, descriptions, ingredients } = props;
	const [cocktail, setCocktail] = useState({
		nom: '',
		difficulty: 'Très facile',
		ingredients: [],
		descriptions: [],
		gout_array: [],
	});

	const submitChanges = async () => {
		const goutArray = gouts.map(({ goutId }) => parseInt(goutId));
		const msg = await createCocktail(
			cocktail.nom,
			goutArray,
			cocktail.difficulty
		);
		console.info(msg);
		const id = msg.replace(/^\D+/g, '');
		await refreshIngredient(
			cocktail.ingredients,
			ingredients,
			parseInt(id)
		);
		await refreshDescription(
			cocktail.descriptions,
			descriptions,
			parseInt(id)
		);
		history.push('/cocktails');
	};
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
				<Gouts data={cocktail.gout_array} />
				<Ingredients data={cocktail.ingredients} />
				<Descriptions data={cocktail.descriptions} />
				<button
					type="button"
					className="btn btn-primary"
					onClick={submitChanges}
				>
					CREER LE COCKTAIL
				</button>
			</form>
		</div>
	);
};

const mapStateToProps = state => ({
	gouts: state.gouts,
	ingredients: state.ingredients,
	descriptions: state.descriptions,
});

export default connect(mapStateToProps, {})(Cocktail);
