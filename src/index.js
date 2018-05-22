import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, createHttpLink } from "apollo-link-http";
import { split, ApolloLink } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import "./index.css";
import App, { Search } from "./App";
import registerServiceWorker from "./registerServiceWorker";
import {
  BrowserRouter as Router,
  Route,
  Switch,  
} from "react-router-dom";
import CreateProductPage from "./pages/CreateProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import Product from "./Product";
import ProductDetailPage from "./pages/ProductDetailPage";
import Profile from "./components/Profile";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import CheckoutForm from "./components/CheckoutForm";
import AllProducts from "./components/AllProducts";
import AllVendors from "./components/AllVendors";
import CustomerProfile from "./components/CustomerProfile";
import FourOFour from "./pages/404/404";
import Auth from "./components/Auth";
import MainLayout from "./MainLayout";
import CustomerLayout from "./CustomerLayout";
import "semantic-ui-css/semantic.min.css";
import CartDetail from "./components/CartDetail";


// const httpLink = new HttpLink({
//   uri: "http://localhost:4000/graphql"
// });

const httpLink = createHttpLink({
  uri: "https://60ec4565.ngrok.io/graphql",
  credentials: "include"
});
const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token") || null
    }
  });
  return forward(operation);
});

const enhancedLink = middlewareLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/subscriptions`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem("token")
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  //httpLink
  enhancedLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    dataIdFromObject: object => object._id
  })
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route
            exact
            path="/vendors"
            render={props => (
              <CustomerLayout {...props}>
                <AllVendors {...props} />
              </CustomerLayout>
            )}
          />
          <Route
            exact
            path="/vendors/:id"
            render={props => (
              <CustomerLayout {...props}>
                <AllProducts {...props} />
              </CustomerLayout>
            )}
          />
          <Route
            exact
            path="/customers/:id/profile"
            render={props => (
              <CustomerLayout {...props}>
                <CustomerProfile />
              </CustomerLayout>
            )}
          />
          <Route
            exact
            path="/"
            render={props => (
              <CustomerLayout {...props}>
                <AllVendors {...props} />
              </CustomerLayout>
            )}
          />
          <Route exact path="/products/search" component={Search} />

          <Route
            exact
            path="/checkout"
            render={props => (
              <CustomerLayout {...props}>
                <CheckoutForm {...props} />
              </CustomerLayout>
            )}
          />
          <Route
            exact
            path="/shoppingcart"
            render={props => (
              <CustomerLayout {...props}>
                <ShoppingCartPage {...props} />
              </CustomerLayout>
            )}
          />
          <Route
            exact
            path="/vendors/:id/products/:id"
            render={props => (
              <CustomerLayout {...props}>
                <ProductDetailPage {...props} />
              </CustomerLayout>
            )}
          />
          <Route
            exact
            path="/login"
            render={props => <Auth {...props} submitButtonLabel="Log in" />}
          />
          <Route
            exact
            path="/signup"
            render={props => <Auth {...props} submitButtonLabel="Sign up" />}
          />

          <Route
            exact
            path="/manager/:id/profile"
            render={props => (
              <Auth {...props} submitButtonLabel="Log in">
                <MainLayout {...props}>
                  <Profile {...props} />
                </MainLayout>
              </Auth>
            )}
          />

          <Route
            exact
            path="/manager/:id"
            render={props => (
              <Auth {...props} submitButtonLabel="Log in">
                <MainLayout {...props}>
                  <Product {...props} />
                </MainLayout>
              </Auth>
            )}
          />

          <Route
            exact
            path="/manager/:id/products"
            render={props => (
              <Auth {...props} submitButtonLabel="Log in">
                <MainLayout {...props}>
                  <Product {...props} />
                </MainLayout>
              </Auth>
            )}
          />

          <Route
            exact
            path="/manager/:id/products/new"
            render={props => (
              <Auth {...props} submitButtonLabel="Log in">
                <MainLayout {...props}>
                  <CreateProductPage {...props} />
                </MainLayout>
              </Auth>
            )}
          />

          <Route
            exact
            path="/manager/:id/products/:id/edit"
            render={props => (
              <Auth {...props} submitButtonLabel="Log in">
                <MainLayout {...props}>
                  <UpdateProductPage {...props} />
                </MainLayout>
              </Auth>
            )}
          />

          <Route path="*" render={() => <FourOFour />} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
