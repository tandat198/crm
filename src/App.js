import React, { Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import OrderPage from "./pages/OrderPage";
=======
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
>>>>>>> b4c4d37e86615b2a671989de828401cdd293c012

class App extends React.Component {
    render() {
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
    }
}

export default App;
