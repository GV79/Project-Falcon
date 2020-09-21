import React from 'react';
import Header from './components/header/Header';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EditForm from './pages/EditForm';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Switch>
          <Route path='/edit' component={EditForm} />
          <Route path='/view' component={EditForm} />
          <Route exact path='/' component={Dashboard} />
          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
