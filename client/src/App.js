// *********** REACT, REDUX & UTILS **********
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import store from './store';
import setAuthToken from './utils/setAuthToken';

// *********** COMPONENTS **********
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Library from './components/Library';
import EditUser from './components/auth/EditUser';
import Tracks from './components/tracks/Tracks';
import CreateTrack from './components/tracks/track-forms/CreateTrack';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';

// *********** BOOTSTRAP & CUSTOM STYLES **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import './App.css';


// *********** ASSETS & IMAGES **********
import bgimage from './assets/img/bgImg@x2.png';

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
        <Navbar />
        <Jumbotron className='splashJumbotron'>
          <Container>
            <Route exact path="/" component={Landing} />
            <Alert />
            <Switch>
              <Route exact path="/library" component={Library} />
              <PrivateRoute exact path="/edit-user" component={EditUser} />
              <PrivateRoute exact path="/tracks" component={Tracks} />
              <PrivateRoute exact path="/add-track" component={CreateTrack} />
            </Switch>
          </Container>
        </Jumbotron>
      </Router>
    </Provider>
  );
}

export default App;
