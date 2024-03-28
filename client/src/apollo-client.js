import { ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache', // Disable caching for watchQuery
        },
        query: {
          fetchPolicy: 'no-cache', // Disable caching for query
        },
        mutate: {
          fetchPolicy: 'no-cache', // Disable caching for mutate
        },
      },
});

export default client;