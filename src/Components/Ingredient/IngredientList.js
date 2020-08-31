import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {Link, useRouteMatch} from "react-router-dom";
import {Table, Container, Button} from "react-bootstrap"

const GET_INGREDIENTS = gql`
  {
    ingredients {
        id
        name
        aliases
    }
  }
`;

const DELETE_INGREDIENTS = gql`
mutation DeleteIngredient($id: Int){
    deleteIngredient(id: $id)
}
`

const IngredientList = () => {

    const { loading, error, data } = useQuery(GET_INGREDIENTS);
    const[supprIngredient] = useMutation(DELETE_INGREDIENTS)
    let {url} = useRouteMatch()
    
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const deleteIngredient = (id) => {
      const r = window.confirm("Vous etes sur de supprimer ce cocktail ?")
      if(r) supprIngredient({variables: {id}})
      window.location.reload(false);
    }

    return (
      <Container style={{marginTop: "1%"}}>

      <h2> Ingredients </h2>
      <Link to={`${url}/new`}><Button>CREER</Button></Link>
      <Table striped bordered hover style={{marginTop: "1%"}}> 
        {data.ingredients.map(({id, name, aliases}) => (
          <tr key={id}>
            <td>
                {name}
            </td>
            <td>
                {aliases && aliases.join(',')}
            </td>
            <td>
                <Link to={`${url}/${id}`}>Modifier</Link>
            </td>
            <td>
              <Button onClick={() => deleteIngredient(id)}>Supprimer</Button>
            </td>
          </tr>
        ))}
      </Table>

      </Container>
    );
  }

export default IngredientList;