import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Cocktails from '../Cocktails';
import ModifyCocktail from '../Cocktails/cocktail';
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
					<Route exact path="/cocktails">
						<Cocktails />
					</Route>
					<Route path="/cocktails/:id">
						<ModifyCocktail />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
