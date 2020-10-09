import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getOneGouts } from '../api/gouts/query';
const Gout = () => {
	let { id } = useParams();

	const [gout, setGout] = useState({
		nom: '',
	});

	useEffect(() => {
		async function fetchData() {
			const gout = await getOneGouts(parseInt(id));
			setGout(gout);
		}
		fetchData();
	}, [setGout, id]);

	return (
		<div className="container" style={{ marginTop: '2vw' }}>
			<form>
				<div className="form-group">
					<label>Nom</label>
					<input
						type="text"
						className="form-control"
						placeholder="Saisir un nom"
						value={gout.nom}
						onChange={e => {
							const val = e.target.value;
							setGout(prevState => {
								return { ...prevState, nom: val };
							});
						}}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Modifier
				</button>
			</form>
		</div>
	);
};

export default Gout;
