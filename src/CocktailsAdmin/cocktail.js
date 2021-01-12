import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOneFalseCocktails } from '../api/cocktails/query';
import {
	modifyCocktail,
	setVisibility,
	deleteCocktail,
} from '../api/cocktails/mutation';
import {
	refreshIngredient,
	refreshDescription,
} from '../api/cocktails/ingredient_and_description/mutation';
import { reportUser, banUser } from '../api/user/mutation';
import Ingredients from './ingredients';
import Gouts from './gouts';
import Descriptions from './descriptions';
import { addNotifications } from '../api/notifications/mutation';

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
		user_id: -1,
	});

	useEffect(() => {
		async function fetchData() {
			const cocktail = await getOneFalseCocktails(parseInt(id));
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
		await setVisibility(parseInt(id), true);

		console.log(msg);
		history.push('/admin-cocktails');
		await addNotifications(
			`Votre cocktail, '${cocktail.nom}', a été accepté !`,
			parseInt(cocktail.user_id)
		);
	};

	const setDeleteCocktail = async () => {
		const msg = await deleteCocktail(parseInt(id));
		await refreshIngredient(cocktail.ingredients, [], parseInt(id));
		await refreshDescription(cocktail.descriptions, [], parseInt(id));
		console.log(msg);
		history.push('/admin-cocktails');
		await addNotifications(
			`Malheureusement, votre cocktail, '${cocktail.nom}', a été refusé. Soit il existe déjà, soit il ne correspond aux normes attendues`,
			parseInt(cocktail.user_id)
		);
	};

	const setReportUser = async () => {
		await setDeleteCocktail();
		reportUser(parseInt(cocktail.user_id));
		await addNotifications(
			`Votre cocktail, '${cocktail.nom}', a été refusé. 
			Il ne respecte pas le règlement, vous avez reçu un avertissement`,
			parseInt(cocktail.user_id)
		);
	};

	const setBanUser = async () => {
		await setDeleteCocktail();
		banUser(parseInt(cocktail.user_id));
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
					ACCEPTER
				</button>
				<button
					type="button"
					className="btn btn-primary"
					onClick={setDeleteCocktail}
				>
					REFUSER
				</button>
				<button
					type="button"
					className="btn btn-primary"
					onClick={setReportUser}
				>
					REPORTER USER
				</button>
				<button
					type="button"
					className="btn btn-primary"
					onClick={setBanUser}
				>
					BANNIR USER
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
