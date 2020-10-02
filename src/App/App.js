import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

import { getAllCocktails } from '../api/cocktail/query';
import { deleteCocktail } from '../api/cocktail/mutations';
function App() {
	const [cocktails, setCocktails] = useState([]);

	useEffect(() => {
		console.log('a');
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
						console.log(cocktails);
						return (
							<tr key={cocktail.id}>
								<th scope="row">{cocktail.id}</th>
								<td>
									<h3>{cocktail.nom}</h3>
								</td>
								<td>
									<button className="btn btn-primary">
										MODIFIER
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

export default App;
