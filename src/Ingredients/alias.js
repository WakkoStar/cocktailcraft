import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
	setAlias,
	addAlias,
	updateAlias,
	deleteAlias,
} from '../redux/actions/alias_ingredient';
const Alias = props => {
	const { setAlias, addAlias, updateAlias, deleteAlias, aliases } = props;
	const [payloadId, setPayloadId] = useState(0);

	useEffect(() => {
		async function fetchData() {
			setAlias(props.data);
			setPayloadId(props.data.length);
		}
		fetchData();
	}, [props.data]);
	return (
		<div className="form-group">
			<label>Alias</label>
			{aliases.map(alias => {
				return (
					<div
						className="form-row"
						style={{ margin: '1vw' }}
						key={alias.id}
					>
						<div className="col">
							<div class="input-group mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="Saisir un nom"
									value={alias.nom}
									onChange={e =>
										updateAlias({
											id: alias.id,
											nom: e.target.value,
										})
									}
								/>
								<div class="input-group-append">
									<button
										type="button"
										class="btn btn-outline-secondary"
										onClick={() =>
											deleteAlias({
												id: alias.id,
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
					addAlias(payloadId);
				}}
				className="btn btn-primary"
			>
				AJOUTER
			</button>
		</div>
	);
};

const mapStateToProps = state => ({
	aliases: state.aliases,
});

const mapDispatchToProps = dispatch => ({
	setAlias: payload => dispatch(setAlias(payload)),
	addAlias: payload => dispatch(addAlias(payload)),
	updateAlias: payload => dispatch(updateAlias(payload)),
	deleteAlias: payload => dispatch(deleteAlias(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alias);
