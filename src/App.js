import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import OrderPage from "./pages/OrderPage";

const App = (props) => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/products' component={ProductPage} />
                <Route exact path='/categories' component={CategoryPage} />
                <Route exact path='/orders' component={OrderPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
