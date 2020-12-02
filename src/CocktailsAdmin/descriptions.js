import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
	setDescription,
	addDescription,
	updateDescription,
	deleteDescription,
} from '../redux/actions/description_cocktail';

const Descriptions = props => {
	const {
		setDescription,
		addDescription,
		updateDescription,
		deleteDescription,
		descriptions,
	} = props;
	const [payloadId, setPayloadId] = useState(0);

	useEffect(() => {
		setDescription(props.data);
		setPayloadId(props.data.length);
	}, [props.data]);

	return (
		<div className="form-group">
			<label>Descriptions</label>
			{descriptions.map(({ id, content, preparation }) => {
				return (
					<div
						className="form-row"
						style={{ margin: '1vw' }}
						key={id}
					>
						<div className="col">
							<textarea
								rows="5"
								type="text"
								className="form-control"
								placeholder="Saisir une description"
								value={content}
								onChange={e =>
									updateDescription({
										id,
										content: e.target.value,
										preparation,
									})
								}
							/>
						</div>
						<div className="col">
							<select
								className="custom-select"
								value={preparation}
								onChange={e =>
									updateDescription({
										id,
										content,
										preparation: e.target.value,
									})
								}
							>
								<option value="Directement dans un verre">
									Directement dans un verre
								</option>
								<option value="Shaker">Shaker</option>
								<option value="Pichet">Pichet</option>
							</select>
							<button
								type="button"
								class="btn btn-outline-primary	"
							>
								GENERER
							</button>
							<button
								type="button"
								onClick={() => deleteDescription({ id })}
								class="btn btn-outline-secondary"
							>
								EFFACER
							</button>
						</div>
					</div>
				);
			})}
			<button
				type="button"
				onClick={() => {
					setPayloadId(payloadId => (payloadId += 1));
					addDescription(payloadId);
				}}
				className="btn btn-primary"
			>
				AJOUTER
			</button>
		</div>
	);
};

const mapStateToProps = state => ({
	descriptions: state.descriptions,
});

const mapDispatchToProps = dispatch => ({
	setDescription: payload => dispatch(setDescription(payload)),
	addDescription: payload => dispatch(addDescription(payload)),
	updateDescription: payload => dispatch(updateDescription(payload)),
	deleteDescription: payload => dispatch(deleteDescription(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Descriptions);
