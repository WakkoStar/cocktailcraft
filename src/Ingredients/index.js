import React, { useState, useEffect } from 'react';

import { useRouteMatch, Link } from 'react-router-dom';
import { getAllIngredients } from '../api/ingredients/query';
import { deleteIngredient } from '../api/ingredients/mutation';

function Ingredients() {
	let match = useRouteMatch();

	const [ingredients, setIngredients] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await getAllIngredients();
			setIngredients(response);
		}
		fetchData();
	}, [setIngredients]);

	const clickDeleteIngredient = async id => {
		const msg = await deleteIngredient(id);
		setIngredients(await getAllIngredients());
		alert(msg);
	};

	return (
		<div>
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
										<button className="btn btn-second">
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

export default Ingredients;
