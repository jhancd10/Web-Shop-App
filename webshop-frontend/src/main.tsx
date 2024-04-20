import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import { BrowserRouter } from "react-router-dom"
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client"

const graphqlApi = import.meta.env.VITE_GRAPHQL_API_URL

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: graphqlApi
  })
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
)
