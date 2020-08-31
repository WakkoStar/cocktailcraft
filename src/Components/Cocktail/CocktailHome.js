import React from "react"
import {
    BrowserRouter as Router,
    useRouteMatch,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
import CocktailList from "./CocktailList"
import Cocktail from "./Cocktail"
import NewCocktail from "./NewCocktail"

const Home = () => {
    let {path} = useRouteMatch()
    return(
        <Router>
        <Switch>
            
            <Route exact path={path}>
            <a href="../">Retour</a>
                <CocktailList/>
            </Route>
            <Route exact path={`${path}/new`}>
                <NewCocktail/>
            </Route>
            <Route path={`${path}/:id`}>
                <Cocktail/>
            </Route>
        </Switch>
        </Router>
    )
}

export default Home