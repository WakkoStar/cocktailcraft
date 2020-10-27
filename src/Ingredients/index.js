import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import {
	getAllIngredients,
	getFamilyIngredients,
} from '../api/ingredients/query';
import { deleteIngredient } from '../api/ingredients/mutation';
import { setFilter } from '../redux/actions/filter_family_of';
import _, { parseInt } from 'lodash';
function Ingredients(props) {
	let match = useRouteMatch();

	const [ingredients, setIngredients] = useState([]);
	const { family_of_filter, setFilter } = props;
	useEffect(() => {
		async function fetchData() {
			const response = await getAllIngredients();
			setIngredients(response);
		}
		_.isNil(family_of_filter) && fetchData();
	}, [setIngredients, setFilter, family_of_filter]);

	const clickDeleteIngredient = async id => {
		const msg = await deleteIngredient(id);
		setIngredients(await getAllIngredients());
		alert(msg);
	};

	const updateIngredient = async id => {
		setFilter({ value: id });
		const familyFilter = [id];
		const response = await getFamilyIngredients(familyFilter);
		setIngredients(response);
	};

	const resetFilter = async () => {
		setFilter({ value: null });
		const response = await getAllIngredients();
		setIngredients(response);
	};

	return (
		<div>
			<button className="btn">
				<Link to={`${match.url}/new`}>CREER</Link>
			</button>
			<button className="btn" onClick={resetFilter}>
				RESET FILTER
			</button>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Nom</th>
						<th scope="col">Modifier</th>
						<th scope="col">Voir famille</th>
						<th scope="col">Supprimer</th>
					</tr>
				</thead>
				<tbody>
					{ingredients.map(ingredient => {
						return (
							<tr key={ingredient.id}>
								<th scope="row">{ingredient.id}</th>
								<td>
									<h5>{ingredient.nom}</h5>
								</td>
								<td>
									<button className="btn btn-second">
										<Link
											to={`${match.url}/${ingredient.id}`}
										>
											MODIFIER
										</Link>
									</button>
								</td>
								<td>
									{ingredient.hasFamily ? (
										<button
											className="btn btn-second"
											onClick={() =>
												updateIngredient(ingredient.id)
											}
										>
											VOIR FAMILLE
										</button>
									) : (
										''
									)}
								</td>

								<td>
									<button
										className="btn btn-primary"
										onClick={() =>
											clickDeleteIngredient(ingredient.id)
										}
									>
										SUPPRIMER
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

const mapDispatchToProps = dispatch => ({
	setFilter: payload => dispatch(setFilter(payload)),
});

const mapStateToProps = state => ({
	family_of_filter: state.family_of_filter,
});

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);
