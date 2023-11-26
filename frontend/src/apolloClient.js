import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://light-dev-auth-backend.onrender.com/auth",
  cache: new InMemoryCache(),
});

export default client;
