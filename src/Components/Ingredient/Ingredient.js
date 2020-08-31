import React,{useState , useEffect, useRef} from "react";
import gql from 'graphql-tag';
import {useParams} from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';
import {Form, Container, Button} from "react-bootstrap"

const GET_INGREDIENT = gql`
    query Ingredient($id: Int!) {
        ingredient(id: $id) {
            id
            name
            aliases
        }
    }
`;

const MODIFY_INGREDIENT = gql`
    mutation ModifyIngredient($name: String, $aliases: [String],$id: Int){
        modifyIngredient(name: $name, aliases: $aliases, id: $id)
    }
`

const Ingredient = () => {

    let { id } = useParams()
    const [ ingredient, setIngredient ] = useState({});
    const { loading, error, data } = useQuery(GET_INGREDIENT, {
        variables: { id : parseInt(id) },
    });
    const [modifyIngredient] = useMutation(MODIFY_INGREDIENT)

    useEffect(() => {
        if(loading === false && data){
            setIngredient(data.ingredient);
        }
    }, [loading, data])

    if (loading) return null;
    if (error) return `Error! ${error}`;

    const updateIngredient = () => {
        const {id, name, aliases} = ingredient
        modifyIngredient({variables: {id, name, aliases}})
    }

    if(ingredient){
        const {name, aliases} = ingredient
        return (
            <Container style={{marginTop: "1%", marginBottom: "1%"}}>   
            <Form autoComplete="off" onSubmit={updateIngredient} style={{width: "60%", marginLeft: "20%"}} action="../ingredients" method="get">
                <h3>Edition d'ingrédient</h3>
    
                <Form.Group controlId="name">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control type="text" 
                    value={name} 
                    onChange={e => {
                        const val = e.target.value;
                        setIngredient(c => {
                            return { ...c, name: val }
                        });
                    }}  
                    />
                </Form.Group>
                    
                <Form.Group controlId="description">
                    <Form.Label>Aliases</Form.Label>
                    <Form.Control as="textarea" rows="10" value={aliases&& aliases.join(",")}
                    onChange={e => {
                        const val = e.target.value;
                        setIngredient(c => {
                            return { ...c, aliases: val.split(",") }
                        });
                    }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Valider
                </Button>
            </Form>
            </Container>
        )
    }
    
}



export default Ingredient