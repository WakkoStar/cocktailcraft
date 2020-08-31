import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {Link, useRouteMatch} from "react-router-dom";
import {Table, Container, Button} from "react-bootstrap"
const GET_COCKTAILS = gql`
  {
    cocktails {
        id
        name
    }
  }
`;

const DELETE_COCKTAIL = gql`
  mutation DeleteCocktail($id: Int){
    deleteCocktail(id: $id)
  }
`
const CocktailList = () => {

    const { loading, error, data } = useQuery(GET_COCKTAILS);
    const[supprCocktail] = useMutation(DELETE_COCKTAIL)
    let {url} = useRouteMatch()
    
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const deleteCocktail = (id) => {
      const r = window.confirm("Vous etes sur de supprimer ce cocktail ?")
      if(r) supprCocktail({variables: {id}})
    }
    return (
      <Container style={{marginTop: "1%"}}>

      <h2> Cocktails </h2>
      <Link to={`${url}/new`}><Button>CREER</Button></Link>
      <Table striped bordered hover style={{marginTop: "1%"}}> 
        {data.cocktails.map(({id, name}) => (
          <tr key={id}>
            <td>
                {name}
            </td>
            <td>
                <Link to={`${url}/${id}`}>Modifier</Link>
            </td>
            <td>
              <Button onClick={() => deleteCocktail(id)}>Supprimer</Button>
            </td>
          </tr>
        ))}
      </Table>

      </Container>
    );
  }

export default CocktailList;