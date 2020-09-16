const {ApolloClient} = require('apollo-boost')
const {InMemoryCache} = require('apollo-cache-inmemory')
const { HttpLink } = require('apollo-link-http')
const fetch = require('isomorphic-fetch');

const link = new HttpLink({ fetch, uri: 'http://localhost:4000/graphql'});
const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
});

export default client