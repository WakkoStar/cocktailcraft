import React,{useEffect} from "react"
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

const CREATED_COCKTAILS = gql`
    query CreatedCocktails($cluster: [Int]){
        createdCocktails(cluster: $cluster){
            name
            description
        }
    }
`

const Cocktail = ({cluster}) => {
    const [getCreatedCocktails, {data}] = useLazyQuery(CREATED_COCKTAILS)
    useEffect(() => {
        getCreatedCocktails({variables: {cluster}})
    }, [cluster, getCreatedCocktails])

    return(
            <div>
                <h2>Cocktail crafté</h2>
                {
                    data && data.createdCocktails.map((cocktail) => {
                        console.log(cocktail)
                        return(
                            <div>
                                <p>-- {cocktail.name}</p>
                                <p>{cocktail.description}</p>
                            </div>
                        )
                    })
                }
            </div>
    )
}

export default Cocktail