import React from 'react';
import { createGout } from '../api/gouts/mutation';
const Gout = () => {
	const submitChanges = async () => {
		const nom = document.getElementById('inputNom').value;
		const msg = await createGout(nom);
		alert(msg);
		window.location = '../';
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
						id="inputNom"
					/>
				</div>
				<button
					type="button"
					className="btn btn-primary"
					onClick={submitChanges}
				>
					Creer
				</button>
			</form>
		</div>
	);
};

export default Gout;
