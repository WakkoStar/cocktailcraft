import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOneCocktails } from '../api/cocktails/query';
import { modifyCocktail } from '../api/cocktails/mutation';
import Ingredients from './ingredients';
import Gouts from './gouts';
import Descriptions from './descriptions';

const Cocktail = props => {
	let { id } = useParams();
	let history = useHistory();
	const { gouts, descriptions, ingredients } = props;
	const [cocktail, setCocktail] = useState({
		nom: '',
		difficulty: '',
		ingredients: [],
		descriptions: [],
		gout_array: [],
	});

	useEffect(() => {
		async function fetchData() {
			const cocktail = await getOneCocktails(parseInt(id));
			setCocktail(cocktail);
		}
		fetchData();
	}, [setCocktail, id]);

	const submitChanges = async () => {
		const goutArray = gouts.map(({ goutId }) => parseInt(goutId));
		const msg = await modifyCocktail(
			cocktail.nom,
			goutArray,
			cocktail.difficulty,
			parseInt(id)
		);
		console.info(msg);
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
					CONFIRMER LES MODIFICATIONS
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
