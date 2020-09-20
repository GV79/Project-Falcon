import React from 'react';
import Header from './components/header/Header';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateForm from './pages/CreateForm';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/create' component={CreateForm} />
          <Route path='/view' component={CreateForm} />
          <Route exact path='/' component={Dashboard} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
