import React, { Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/OrderPage";
import Header from "./components/Header";

class App extends React.Component {
    render() {
        return (
            <Fragment>
                <Header />
                <HomePage />
            </Fragment>
        );
    }
}

export default App;
