import React,{useRef, useState, useEffect} from "react"
import { useLazyQuery } from '@apollo/react-hooks';
import { Multiselect } from 'multiselect-react-dropdown';
import gql from 'graphql-tag';

const GET_INVENTORY_SELECTION = gql`
  query InventorySelection($inventory: [Int], $cluster: [Int], $f_gout: [Int], $f_difficulty: [Int]){
    inventorySelection(inventory: $inventory, cluster : $cluster, filter_gout:$f_gout, filter_difficulty:$f_difficulty) {
        id
        name
    }
  }
`;


const Craft = ({inventory, updateCallback}) => {
    
    //ingredients selected
    const cluster = useRef([])
    //all ingredients can be selected
    const [clusterList, setClusterList] = useState()

    const [getInventorySelection, {data}] = useLazyQuery(GET_INVENTORY_SELECTION)

    useEffect(() => {
        setClusterList(inventory)
        if(data){
            setClusterList(data.inventorySelection)
        }
    }, [data,inventory])

    const updateInventory = () => {
        let clusterSelected = cluster.current.getSelectedItems()
        const clusterArray = clusterSelected.map(el => el.id)
        //clusterArray for created cocktails
        updateCallback(clusterArray)
        getInventorySelection({variables: { inventory: inventory.map(e => e.id), cluster: clusterArray, f_gout: [], f_difficulty: [] }})
    }

    return(
            <div>
                <h2>Craft</h2>
                <Multiselect autoComplete="off"
                    options={clusterList && clusterList} // Options to display in the dropdown
                    displayValue="name" // Property name to display in the dropdown options
                    ref={cluster}
                    onSelect={updateInventory}
                    onRemove={updateInventory}
                />
            </div>
    )
}

export default Craft