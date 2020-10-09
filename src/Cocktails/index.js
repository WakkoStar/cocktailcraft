import React, { useState, useEffect } from 'react';

import { useRouteMatch, Link } from 'react-router-dom';
import { getAllCocktails } from '../api/cocktails/query';
import { deleteCocktail } from '../api/cocktails/mutation';

function Cocktails() {
	let match = useRouteMatch();

	const [cocktails, setCocktails] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await getAllCocktails();
			setCocktails(response);
		}
		fetchData();
	}, [setCocktails]);

	const clickDeleteCocktail = async id => {
		const msg = await deleteCocktail(id);
		setCocktails(await getAllCocktails());
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
						<th scope="col">Supprimer</th>
					</tr>
				</thead>
				<tbody>
					{cocktails.map(cocktail => {
						return (
							<tr key={cocktail.id}>
								<th scope="row">{cocktail.id}</th>
								<td>
									<h5>{cocktail.nom}</h5>
								</td>
								<td>
									<button className="btn btn-second">
										<Link
											to={`${match.url}/${cocktail.id}`}
										>
											MODIFIER
										</Link>
									</button>
								</td>

								<td>
									<button
										className="btn btn-primary"
										onClick={() =>
											clickDeleteCocktail(cocktail.id)
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

export default Cocktails;
