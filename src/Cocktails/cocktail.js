import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getOneCocktails } from '../api/cocktails/query';

import Ingredients from './ingredients';
import Gouts from './gouts';
import Descriptions from './descriptions';

const Cocktail = () => {
	let { id } = useParams();

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
				<button type="submit" className="btn btn-primary">
					CONFIRMER LES MODIFICATIONS
				</button>
			</form>
		</div>
	);
};

export default Cocktail;
