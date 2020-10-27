import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createIngredient } from '../api/ingredients/mutation';
import { useHistory } from 'react-router-dom';
import Alias from './alias';
import Family from './family_of';

const Ingredient = props => {
	const { aliases, family_of } = props;

	const [ingredient, setIngredient] = useState({
		nom: '',
		alias: [],
		family_of: [],
	});

	let history = useHistory();

	const submitChanges = async () => {
		const aliasIngredient = aliases.map(({ nom }) => nom);
		const family_ofIngredient = family_of.map(({ ingredientId }) =>
			parseInt(ingredientId)
		);

		const msg = await createIngredient(
			ingredient.nom,
			aliasIngredient,
			family_ofIngredient
		);
		console.info(msg);
		history.push('/ingredients');
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
						value={ingredient.nom}
						onChange={e => {
							const val = e.target.value;
							setIngredient(ingredient => {
								return { ...ingredient, nom: val };
							});
						}}
					/>
				</div>
				<Alias data={ingredient.alias} />
				<Family data={ingredient.family_of} />
				<button
					type="button"
					className="btn btn-primary"
					onClick={submitChanges}
				>
					CREER
				</button>
			</form>
		</div>
	);
};
const mapStateToProps = state => ({
	aliases: state.aliases,
	family_of: state.family_of,
});

export default connect(mapStateToProps, {})(Ingredient);
