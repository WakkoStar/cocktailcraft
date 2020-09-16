import {client} from "./client"
import {gql} from "apollo-boost"

export const getFirstGout = async() => {
    const query = gql`
        {
            gout(id: 1) {
                id
                nom
            }
        }
        `;
    const res = await client.query({query: query})
    return res.data.gout
}
