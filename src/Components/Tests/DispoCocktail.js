import React,{useEffect, useState} from "react"
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { concat } from "apollo-boost";

const AVAIL_COCKTAILS = gql`
  query AvailCocktails($ingredient_id: [Int!]!){
        availCocktails(ingredient_id: $ingredient_id){
            name
            gout_id
            difficulty_id
        }
  }
`

const Cocktails = ({ingredient_id}) => {
    const [getAvailCocktails, {data}] = useLazyQuery(AVAIL_COCKTAILS)
    const [arrayGout, setArrayGout] = useState([])
    useEffect(() => {
        getAvailCocktails({ variables: {ingredient_id}})
        if(data){
                const mapGout = data.availCocktails.map(({gout_id}) => gout_id.join(",")).join(',')
                const arrayGout = mapGout.split(",").reduce((array, current) => {
                    if(!array.includes(parseInt(current))) array.push(parseInt(current))
                    return array
                },[])
                setArrayGout(arrayGout)
            }
    }, [ingredient_id, getAvailCocktails])

    const CountCocktail = () => {
        if(data){
            return <p>{data && data.availCocktails.length} cocktails disponibles</p>
        }else{
            return <p>0 cocktails disponibles</p>
        }
    }

    return(
            <div>
                <h2>Cocktail disponible</h2>
                <CountCocktail />
                {
                    arrayGout.map(
                        (id) => <Gouts id={id} cocktails={data && data.availCocktails}/>
                    )
                }
            </div>
    )
}

export default Cocktails


const GET_GOUT = gql`
    query Gout($id: Int!){
        gout(id: $id){
            name
        }
    }
`

const Gouts = ({id, cocktails}) => {
    const { loading, error, data } = useQuery(GET_GOUT, {
        variables: { id : parseInt(id) },
    });

    const countCocktail = cocktails && cocktails.filter(({gout_id}) => gout_id.includes(id)).length

    if(!isNaN(id)){
        return <p style={{marginBottom: 0}}>Dont {countCocktail} {data && data.gout.name}</p>
    }
    
    return false
}