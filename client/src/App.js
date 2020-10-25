// *********** REACT, REDUX & UTILS **********
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import store from './store';
import setAuthToken from './utils/setAuthToken';

// *********** COMPONENTS **********
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import Dashboard from './components/layout/Dashboard';
import EditUser from './components/auth/EditUser';
import Tracks from './components/tracks/view-all/Tracks';
import Track from './components/tracks/view-one/Track';
import AddTrack from './components/tracks/track-forms/AddTrack';
import PrivateRoute from './components/routing/PrivateRoute';

// *********** BOOTSTRAP & CUSTOM STYLES **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import './App.css';

// *********** ASSETS & IMAGES **********

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
        <Jumbotron className="splashJumbotron">
          <Container>
            <Alert />
            <Route exact path="/" component={Landing} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/edit-user" component={EditUser} />
              <PrivateRoute exact path="/tracks" component={Tracks} />
              <PrivateRoute exact path="/track/:id" component={Track} />
              <PrivateRoute exact path="/add-track" component={AddTrack} />
            </Switch>
          </Container>
        </Jumbotron>
      </Router>
    </Provider>
  );
}

export default App;
