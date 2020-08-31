import React,{useState , useEffect, useRef} from "react";
import gql from 'graphql-tag';
import {useParams} from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';
import {Form, Container, Button} from "react-bootstrap"

const CREATE_INGREDIENT = gql`
    mutation CreateIngredient($name: String, $aliases: [String]){
        createIngredient(name: $name, aliases: $aliases)
    }
`

const Ingredient = () => {

    const [ ingredient, setIngredient ] = useState({name: "", aliases:[]});
    const [createIngredient] = useMutation(CREATE_INGREDIENT)

    const postIngredient = () => {
        const {name, aliases} = ingredient
        createIngredient({variables: {name, aliases}})
    }

    if(ingredient){
        const {name, aliases} = ingredient
        return (
            <Container style={{marginTop: "1%", marginBottom: "1%"}}>   
            <Form autoComplete="off" onSubmit={postIngredient} style={{width: "60%", marginLeft: "20%"}} action="../ingredients" method="get">
                <h3>Création d'ingrédient</h3>
    
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