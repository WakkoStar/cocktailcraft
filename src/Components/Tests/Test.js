import React,{useState, useEffect} from "react"
import {Container} from "react-bootstrap"
import { useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import DispoCocktail from "./DispoCocktail"
import Inventory from "./Inventory"
import Craft from "./Craft"
import CreateCocktail from "./CreateCocktail"

const GET_INGREDIENTS = gql`
  query BestIngredients($inventory: [Int]){
    bestIngredients(inventory: $inventory) {
        id
        name
    }
  }
`;


const Test = () => {

    const [ingredients, setIngredients] = useState([])
    const [clusterArray, setClusterArray] = useState([])
    const [inventoryArray, setInventoryArray] = useState([])
    const [inventorySelected, setInventorySelected] = useState([])

    const { loading, error, data } = useQuery(GET_INGREDIENTS, {
        variables: { inventory:[] }
    });

    useEffect(() => {
        if(loading === false && data){
            setIngredients(data.bestIngredients);
        }
    }, [loading, data])
    
    if (loading) return null;
    if (error) return `Error! ${error}`;
    
    const updateCluster = (array) => {
        setClusterArray(array)
    }

    const updateInventory = (selection, array) => {
        setInventoryArray(array)
        setInventorySelected(selection)
    }   

    if(ingredients){
        return(
            <Container style={{marginTop: "1%", marginBottom: "1%"}}>
                <DispoCocktail ingredient_id={inventoryArray}/>
                <Inventory allIngredients={ingredients} updateCallback={updateInventory} />
                <Craft inventory={inventorySelected} updateCallback={updateCluster} />
                <CreateCocktail cluster={clusterArray} />
            </Container>
        )
    }
    
}

export default Test