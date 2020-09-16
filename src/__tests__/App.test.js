import client from "./client"
import {getFirstGout} from "./query"

jest.mock('./client')


it('return the name of the first gout', async() => {
    client.query.mockResolvedValue({
        data: {
            gout: [
                {
                    id: 1,
                    nom: "Sucré"
                },
                {
                    id: 2,
                    nom: "Mentholé"
                }
            ]
        }
    })

    const firstGout = await getFirstGout()
    expect(firstGout.nom).toEqual('Sucré')
})
/*
describe("Gouts queries", () => {
    
    test('get one gout', async() => {
        const query = gql`
        {
            gout(id: 0) {
                id
                nom
            }
        }
        `;
        
        return client.query({query})
        .then(({data}) => {
            return expect(data.gout.id).toBe(0)
        })
        .catch((error) => {
            return error
        })
    })
    
    test('no ID for this gout', async() => {
        const query = gql`
        {
            gout(id: -2) {
                id
                nom
            }
        }
        `;
        
        return client.query({query})
        .catch( error => {
            return expect(error.message).toMatch(/no founded/);
        })
    })
})

describe('Create gouts mutations', () => {

    test("create gout", async(done) => {

        const mutation = gql`
        mutation {
            createGout(nom: "test")
        }
        `;

        return client.mutate({mutation})
        .then(({data}) => {
            console.log("create gout success")
            expect(data.createGout).toMatch(/succès/);
            done()
        })
        .catch((error) => {
            done(error)
        })
    })

    test("can't create same gout", async(done) => {

        const mutation = gql`
        mutation {
            createGout(nom: "test")
        }
        `;

        return client.mutate({mutation})
        .catch((error) => {
            expect(error.message).toMatch(/already exists/);
            done()
        })
    })
    
})

describe("Delete gouts mutations", () => {
    test("delete gout", async() => {
        expect.assertions(1)
        const goutTest = (await getAllGouts()).find(({gout}) => gout.nom)
        console.log(goutTest)
        expect(goutTest.nom).toEqual('test')
        const mutation = gql`
        mutation {
            deleteGout(id: ${goutTest.id})
        }
        `;
        
        client.mutate({mutation})
        .then(({data}) => {
            console.log("delete gout sucess")
            expect(data.deleteGout).toMatch(/succès/);
            done()
        })
        .catch((error) => {
            done(error)
        })
    });

    test("delete gout", async(done) => {
        const mutation = gql`
        mutation {
            deleteGout(id: -1)
        }
        `;
        
        return client.mutate({mutation})
        .catch((error) => {
            expect(error.message).toMatch(/no founded/);
            done()
        })
    });
})
    
    */