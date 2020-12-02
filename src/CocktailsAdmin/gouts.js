import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	setGout,
	addGout,
	updateGout,
	deleteGout,
} from '../redux/actions/gout_cocktail';

import { getAllGouts } from '../api/gouts/query';

const Gouts = props => {
	const { setGout, addGout, updateGout, deleteGout, gouts } = props;
	const [goutsInDb, setGoutsInDb] = useState([]);
	const [payloadId, setPayloadId] = useState(0);
	useEffect(() => {
		async function fetchData() {
			const goutsInDb = await getAllGouts();
			setGoutsInDb(goutsInDb);
		}
		fetchData();
		setGout(props.data);
		setPayloadId(props.data.length);
	}, [props.data, setGoutsInDb]);

	return (
		<div className="form-group">
			<label>Gouts</label>
			{gouts.map(({ id, goutId }) => {
				return (
					<div
						className="form-row"
						style={{ margin: '1vw' }}
						key={id}
					>
						<div className="col">
							<div class="input-group mb-3">
								<select
									className="custom-select"
									value={goutId}
									onChange={e =>
										updateGout({
											id: id,
											goutId: e.target.value,
										})
									}
								>
									{goutsInDb.map(gout => {
										return (
											<option value={gout.id}>
												{gout.nom}
											</option>
										);
									})}
								</select>
								<div class="input-group-append">
									<button
										type="button"
										class="btn btn-outline-secondary"
										onClick={() =>
											deleteGout({
												id,
											})
										}
									>
										EFFACER
									</button>
								</div>
							</div>
						</div>
					</div>
				);
			})}
			<button
				type="button"
				onClick={() => {
					setPayloadId(payloadId => (payloadId += 1));
					addGout(payloadId);
				}}
				className="btn btn-primary"
			>
				AJOUTER
			</button>
		</div>
	);
};

const mapStateToProps = state => ({
	gouts: state.gouts,
});

const mapDispatchToProps = dispatch => ({
	setGout: payload => dispatch(setGout(payload)),
	addGout: payload => dispatch(addGout(payload)),
	updateGout: payload => dispatch(updateGout(payload)),
	deleteGout: payload => dispatch(deleteGout(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gouts);
