import React,{useState , useEffect, useRef} from "react";
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {Form, Container, Button} from "react-bootstrap"
import { Multiselect } from 'multiselect-react-dropdown';

const GET_INGREDIENTS = gql`
    {
        ingredients {
            id
            name
        }
    }
`;

const GET_GOUTS = gql`
    {
        gouts {
            id
            name
        }
    }
`;

const CREATE_COCKTAIL = gql`
    mutation CreateCocktail($name: String, $description: String, $ingredient_id: [Int], $gout_id: [Int], $difficulty_id: Int){
        createCocktail(name: $name, description: $description, ingredient_id: $ingredient_id, gout_id: $gout_id, difficulty_id: $difficulty_id)
    }
`

const Cocktail = () => {


    const [ cocktail, setCocktail ] = useState({name: "", description: "", ingredient_id:[], gout_id:[], difficulty_id:1});
    const [postCocktail] = useMutation(CREATE_COCKTAIL)

    const createCocktail = () => {
        const {id, name, description, ingredient_id, gout_id, difficulty_id} = cocktail
        postCocktail({variables: {name, description, ingredient_id, gout_id,difficulty_id: parseInt(difficulty_id) , id}})
    }

    const updateIngredients = (ingredients) => {
        setCocktail((c) => {return {...c, ingredient_id: ingredients.map(({id}) => id)}})
    }
    const updateGouts = (gouts) => {
        setCocktail((c) => {return {...c, gout_id: gouts.map(({id}) => id)}})
    }

    if(cocktail){
        const {name, description, ingredient_id, gout_id, difficulty_id} = cocktail
        return (
            <Container style={{marginTop: "1%", marginBottom: "1%"}}>
    
            
            <Form autoComplete="off" onSubmit={createCocktail} style={{width: "60%", marginLeft: "20%"}} action="../cocktails" method="get">
                <h3>Création d'un cocktail</h3>
    
                <Form.Group controlId="name">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control type="text" 
                    value={name} 
                    onChange={e => {
                        const val = e.target.value;
                        setCocktail(c => {
                            return { ...c, name: val }
                        });
                    }}  
                    />
                </Form.Group>
    
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows="10" value={description}
                    onChange={e => {
                        const val = e.target.value;
                        setCocktail(c => {
                            return { ...c, description: val }
                        });
                    }}
                    />
                </Form.Group>
    
                <Form.Group controlId="ingredient_id">
                <Form.Label>Ingredients</Form.Label>
                    <Ingredients ingredients={ingredient_id} updateCallback={updateIngredients}/>
                </Form.Group>

                <Form.Group controlId="gout_id">
                <Form.Label>Gouts</Form.Label>
                    <Gouts gouts={gout_id} updateCallback={updateGouts}/>
                </Form.Group>
                
                <Form.Group controlId="difficulty_id">
                    <Form.Label>Difficulté </Form.Label>
                    <Form.Control as="select"
                    onChange={e => {
                        const val = e.target.value;
                        setCocktail(c => {
                            return { ...c, difficulty_id: val }
                        });
                    }}
                    >
                    <option value={0} selected={difficulty_id === 0} >0</option>
                    <option value={1} selected={difficulty_id === 1} >1</option>
                    <option value={2} selected={difficulty_id === 2}>2</option>
                    <option value={3} selected={difficulty_id === 3}>3</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Valider
                </Button>
            </Form>
            
            </Container>
        )
    }
    
}

const Ingredients = ({ingredients, updateCallback}) => {
    const { loading, error, data } = useQuery(GET_INGREDIENTS);
    const selection = useRef(null)

    if (loading) return null;
    if (error) return `Error! ${error}`;
    
    const updateCocktail = () => {
        updateCallback(selection.current.getSelectedItems())
    }

    const selectedIngredients = ingredients && data.ingredients.filter(({id}) => ingredients.includes(id))
    return (
        <Multiselect
            options={data.ingredients} // Options to display in the dropdown
            selectedValues={selectedIngredients} // Preselected value to persist in dropdown
            displayValue="name" // Property name to display in the dropdown options
            ref={selection}
            onSelect={updateCocktail}
            onRemove={updateCocktail}
        />
    )
}

const Gouts = ({gouts, updateCallback}) => {
    const { loading, error, data } = useQuery(GET_GOUTS);
    const selection = useRef(null)

    if (loading) return null;
    if (error) return `Error! ${error}`;

    const updateCocktail = () => {
        updateCallback(selection.current.getSelectedItems())
    }

    const selectedGouts = gouts && data.gouts.filter(({id}) => gouts.includes(id))
    return (
        <Multiselect
            options={data.gouts} // Options to display in the dropdown
            selectedValues={selectedGouts} // Preselected value to persist in dropdown
            displayValue="name" // Property name to display in the dropdown options
            ref={selection}
            onSelect={updateCocktail}
            onRemove={updateCocktail}
        />
    )
}


export default Cocktail