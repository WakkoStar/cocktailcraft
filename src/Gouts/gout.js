import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getOneGouts } from '../api/gouts/query';
import { modifyGout } from '../api/gouts/mutation';
const Gout = () => {
	let { id } = useParams();

	const [gout, setGout] = useState({
		nom: '',
	});

	const submitChanges = async () => {
		const msg = await modifyGout(gout.nom, parseInt(gout.id));
		alert(msg);
		window.location = '../';
	};

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

export default Gout;
