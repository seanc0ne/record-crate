import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import EditUser from './components/auth/EditUser';
import Tracks from './components/tracks/Tracks';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
// Redux
import { Provider } from 'react-redux';
import store from './store';
// custom styles
import './App.css';

// check localStorage for a token and set the global headers with it if there is one
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); // we need to put the empty brackets to prevent it from looping indefinitely; this way it will only run once, when it's loaded/mounted

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/edit-user" component={EditUser} />
            <Route exact path="/tracks" component={Tracks} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
