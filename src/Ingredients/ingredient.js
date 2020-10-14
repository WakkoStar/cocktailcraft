import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { getOneIngredients } from '../api/ingredients/query';
import { modifyIngredient } from '../api/ingredients/mutation';

import Alias from './alias';
import Family from './family_of';

const Ingredient = props => {
	let { id } = useParams();

	const [ingredient, setIngredient] = useState({
		nom: '',
		alias: [],
		family_of: [],
	});

	useEffect(() => {
		async function fetchData() {
			const ingredient = await getOneIngredients(parseInt(id));
			setIngredient(ingredient);
		}
		fetchData();
	}, [setIngredient, id]);

	const submitChanges = async () => {
		const msg = await modifyIngredient(
			ingredient.nom,
			{},
			ingredient.family_of,
			parseInt(id)
		);
		alert(msg);
		window.location = '../';
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
							setIngredient(prevState => {
								return { ...prevState, nom: val };
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
					Modifier
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
