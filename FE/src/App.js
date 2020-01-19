import React from 'react';
import './App.css';
import Articles from './articles/Articles';
import Article from './article/Article'
import Dashboard from './dashboard/Dashboard'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Articles />
          </Route>
          <Route path="/article/:id" handler={Article}>
            <Article />
          </Route>
          <Route path="/dashboard" component={Dashboard}>
            <Dashboard />
          </Route>
          <Route path='*' exact={true} component={Articles} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
