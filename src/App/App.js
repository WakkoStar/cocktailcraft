import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import Cocktails from '../Cocktails';
import ModifyCocktail from '../Cocktails/cocktail';
import Ingredients from '../Ingredients';
import ModifyIngredient from '../Ingredients/ingredient';
import Gouts from '../Gouts'
import ModifyGout from '../Gouts/gout'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() {
	return (
		<div>
			<Router>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<ul className="navbar-nav">
						<li className="navbar-brand">
							<h4>COCKTAILMANIA</h4>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/cocktails">
								Cocktails
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/ingredients">
								Ingrédients
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/gouts">
								Gouts
							</Link>
						</li>
					</ul>
				</nav>
				<Switch>
					<Route exact path="/gouts">
						<Gouts />
					</Route>
					<Route exact path="/ingredients">
						<Ingredients />
					</Route>
					<Route exact path="/cocktails">
						<Cocktails />
					</Route>
					<Route exact path="/gouts/:id">
						<ModifyGout/>
					</Route>
					<Route exact path="/ingredients/:id">
						<ModifyIngredient />
					</Route>
					<Route exact path="/cocktails/:id">
						<ModifyCocktail />
					</Route>
					
				</Switch>
			</Router>
		</div>
	);
}

export default App;
