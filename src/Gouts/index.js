import React, { useState, useEffect } from 'react';

import { useRouteMatch, Link } from 'react-router-dom';
import { getAllGouts } from '../api/gouts/query';
import { deleteGout } from '../api/gouts/mutation';

function Gouts() {
	let match = useRouteMatch();

	const [gouts, setGouts] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await getAllGouts();
			setGouts(response);
		}
		fetchData();
	}, [setGouts]);

	const clickDeleteGout = async id => {
		const msg = await deleteGout(id);
		setGouts(await getAllGouts());
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
					{gouts.map(gout => {
						return (
							<tr key={gout.id}>
								<th scope="row">{gout.id}</th>
								<td>
									<h5>{gout.nom}</h5>
								</td>
								<td>
									<button className="btn btn-second">
										<Link
											to={`${match.url}/${gout.id}`}
										>
											MODIFIER
										</Link>
									</button>
								</td>
								<td>
									<button
										className="btn btn-primary"
										onClick={() =>
											clickDeleteGout(gout.id)
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

export default Gouts;
