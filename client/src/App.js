import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import RegisterDoctor from "./components/Auth/RegisterDoctor";

import store from "./store";
import "./App.css";
import { Landing } from "./components/layout/Landing";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route exact path="/registerdoctor" element={<RegisterDoctor />} />
        </Routes>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
