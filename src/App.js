import React, { Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

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
