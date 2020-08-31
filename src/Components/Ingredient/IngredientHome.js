import React from "react"
import {
    BrowserRouter as Router,
    useRouteMatch,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
import IngredientList from "./IngredientList"
import Ingredient from "./Ingredient"
import NewIngredient from "./NewIngredient"
const Home = () => {

    let {path} = useRouteMatch()
    return(
        <Router>
        <Switch>
            <Route exact path={path}>
            <a href="../">Retour</a>
                <IngredientList/>
            </Route>
            <Route exact path={`${path}/new`}>
                <NewIngredient/>
            </Route>
            <Route path={`${path}/:id`}>
                <Ingredient/>
            </Route>
        </Switch>
        </Router>
    )
}

export default Home