import React,{useRef, useState, useEffect} from "react"
import {useLazyQuery } from '@apollo/react-hooks';
import { Multiselect } from 'multiselect-react-dropdown';
import gql from 'graphql-tag';

const GET_INGREDIENTS = gql`
  query BestIngredients($inventory: [Int]){
    bestIngredients(inventory: $inventory) {
        id
        name
    }
  }
`;

const GET_INVENTORY_SELECTION = gql`
  query InventorySelection($inventory: [Int], $cluster: [Int], $f_gout: [Int], $f_difficulty: [Int]){
    inventorySelection(inventory: $inventory, cluster : $cluster, filter_gout:$f_gout, filter_difficulty:$f_difficulty) {
        id
        name
    }
  }
`;



const Inventory = ({allIngredients, updateCallback}) => {
    
    const inventory = useRef([])
    const [ingredients, setIngredients] = useState()
    const [getFilteredIngredients, {data}] = useLazyQuery(GET_INGREDIENTS)
    const [getInventorySelection, {data: newData}] = useLazyQuery(GET_INVENTORY_SELECTION)

    useEffect(() => {
        setIngredients(allIngredients)
        if(data){
            setIngredients(data.bestIngredients);
        }
    }, [data, allIngredients, inventory])
    
    
    const updateIngredients = () => {
        let inventorySelected = inventory.current.getSelectedItems()
        const inventoryArray = inventorySelected.map((el) => el.id)
        getFilteredIngredients({ variables: { inventory : inventoryArray } })
        getInventorySelection({variables: { inventory: inventoryArray, cluster: [], f_gout: [], f_difficulty: [] }})
        updateCallback(newData && newData.inventorySelection, inventoryArray)
    }

    return(
            <div>
                <h2>Inventaire</h2>
                <Multiselect autoComplete="off"
                    options={ingredients && ingredients} // Options to display in the dropdown
                    displayValue="name" // Property name to display in the dropdown options
                    ref={inventory}
                    onSelect={updateIngredients}
                    onRemove={updateIngredients}
                />
            </div>
    )
}

export default Inventory