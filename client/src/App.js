// *********** REACT, REDUX & UTILS **********
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadUser } from './actions/auth';
import store from './store';
import setAuthToken from './utils/setAuthToken';

// *********** COMPONENTS **********
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import EditUser from './components/auth/EditUser';
import Tracks from './components/tracks/view-all/Tracks';
import Track from './components/tracks/view-single/Track';
import AddTrack from './components/tracks/track-forms/AddTrack';
import PrivateRoute from './components/routing/PrivateRoute';

// *********** BOOTSTRAP & CUSTOM STYLES **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './App.css';
// import bgimage from './assets/img/bgImg@x2.png';

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
        <Jumbotron
        // style={{
        //   backgroundImage: `url(${bgimage})`,
        //   backgroundSize: 'cover',
        //   width: '100vw',
        //   height: '100vh',
        // }}
        >
          <Alert />
          <Route exact path="/" component={Landing} />
          <Switch>
            {/* <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} /> */}
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/edit-user" component={EditUser} />
            <PrivateRoute exact path="/tracks" component={Tracks} />
            <PrivateRoute exact path="/track/:id" component={Track} />
            <PrivateRoute exact path="/add-track" component={AddTrack} />
          </Switch>
        </Jumbotron>
      </Router>
    </Provider>
  );
}

export default App;
