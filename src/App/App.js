import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Container, ListGroup} from "react-bootstrap"

import CocktailHome from "../Components/Cocktail/CocktailHome"
import IngredientHome from "../Components/Ingredient/IngredientHome"
import Test from "../Components/Tests/Test"

const link = new HttpLink({ uri: 'https://env-7682161.hidora.com/graphql' });
const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
});

function App() {
  
  return (
    <ApolloProvider client={client}>
      <Router basename="/">
        <Switch>
          <Route exact path="/">
            <Container style={{marginTop: "1%"}}>
                <h2>CocktailMania API</h2>
              <ListGroup>
                <ListGroup.Item><Link to="/cocktails">Cocktails</Link></ListGroup.Item>
                <ListGroup.Item><Link to="/ingredients">Ingrédients</Link></ListGroup.Item>
                <ListGroup.Item><Link to="/tests">Tester</Link></ListGroup.Item>
              </ListGroup>
            </Container>
          </Route>
          <Route path="/cocktails">
            <CocktailHome/>
          </Route>
          <Route path="/ingredients">
            <IngredientHome/>
          </Route>
          <Route path="/tests">
            <Test/>
          </Route>
        </Switch>
        
      </Router>
    </ApolloProvider>
  );
}

export default App;
