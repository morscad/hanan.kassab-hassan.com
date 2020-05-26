import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
      <Router>
      <MainLayout>
          <Switch>
            <Route path="/">
                <Home />
            </Route>
            <Route path="/articles">
                <Articles />
            </Route>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/contact">
                <Contact />
            </Route>
          </Switch>
      </MainLayout>
      </Router>
  );
}

export default App;
