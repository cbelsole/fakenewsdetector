import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, Route } from "react-router";
import store, { history } from "./store";
import Home from "./containers/home";
import "./index.css";

render(
  <Provider store={store}>
    <Router history={history}>
      <Route exact path="/" component={Home} />
    </Router>
  </Provider>,
  document.querySelector("#root")
);
