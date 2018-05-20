import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateProductPage from "./pages/CreateProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import Product from "./Product";
import ProductDetailPage from "./pages/ProductDetailPage";
import Profile from "./components/Profile";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import CheckoutForm from "./components/CheckoutForm";
import AllProducts from "./components/AllProducts";
import FourOFour from "./pages/404/404";
import MainLayout from "./MainLayout";
import CustomerLayout from "./CustomerLayout";
import "semantic-ui-css/semantic.min.css";
import CartDetail from "./components/CartDetail";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/subscriptions`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVhZmJjODZjZjY2MmNkNGFlNjM3NTZiNCIsImVtYWlsIjoidXNlcjc3N0B1c2VyLmNvbSIsIm5hbWUiOiJ1c2VyNzc3In0sImlhdCI6MTUyNjYxMTkxNCwiZXhwIjoxNTU4MTY5NTE0fQ.1TM81XVJ_xo17BVdtMk6vBUUvDem9ujkWdB1wRTbSlE`
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    dataIdFromObject: object => object._id
  })
});

const Root = () => {
  return <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/products" render={props => <CustomerLayout {...props}>
                <AllProducts {...props} />
              </CustomerLayout>} />
          <Route exact path="/checkout" render={props => <CustomerLayout {...props}>
                <CheckoutForm {...props} />
              </CustomerLayout>} />
          <Route exact path="/shoppingcart" render={props => <CustomerLayout {...props}>
                <ShoppingCartPage {...props} />
              </CustomerLayout>} />
          <Route exact path="/products/:id" render={props => <CustomerLayout {...props}>
                <ProductDetailPage {...props} />
              </CustomerLayout>} />
          <Route exact path="/manager/profile" render={props => <MainLayout {...props}>
                <Profile {...props} />
              </MainLayout>} />
          <Route exact path="/manager/products" render={props => <MainLayout {...props}>
                <Product {...props} />
              </MainLayout>} />
          <Route exact path="/manager/products/new" render={props => <MainLayout {...props}>
                <CreateProductPage {...props} />
              </MainLayout>} />
          <Route exact path="/manager/products/:id/edit" render={props => <MainLayout {...props}>
                <UpdateProductPage {...props} />
              </MainLayout>} />
          <Route render={() => <FourOFour />} />
          {/* <Route
          render={props => (
            <Auth {...props} submitButtonLabel="Login">
              <Route exact path="/profile" component={Profile} />
            </Auth>
          )}
        /> */}
        </Switch>
      </Router>
    </ApolloProvider>;
};

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
