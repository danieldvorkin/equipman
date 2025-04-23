import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
