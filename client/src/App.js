import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import PrivateRoute from './components/routing/PrivateRoute';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar/>
          <section className='container'>
            <Route
              exact
              path="/"
              component={ Landing }
            />
            <Alert/>
            <Switch>
              <Route
                exact
                path="/register"
                component={ Register }
              />
              <Route
                exact
                path="/login"
                component={ Login }
              />
              <PrivateRoute
                exact
                path="/dashboard"
                component={ Dashboard }
              />
              <PrivateRoute
                exact
                path="/create-profile"
                component={ CreateProfile }
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={ EditProfile }
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={ AddExperience }
              />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
