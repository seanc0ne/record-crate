import React from 'react';
import './App.css';

// *********** COMPONENTS **********
import SignUp from './components/SignUp';
import LandingSleeve from './components/LandingSleeve';

// *********** BOOTSTRAP **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

// *********** ASSETS **********
import bgimage from './assets/img/bgImg@x2.png';
// import React, { Fragment, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Landing from './components/layout/Landing';
// import Register from './components/auth/Register';
// import Login from './components/auth/Login';
// import Alert from './components/layout/Alert';
// import Dashboard from './components/dashboard/Dashboard';
// import EditUser from './components/auth/EditUser';
// import Tracks from './components/tracks/Tracks';
// import PrivateRoute from './components/routing/PrivateRoute';
// import { loadUser } from './actions/auth';
// import setAuthToken from './utils/setAuthToken';
// // Redux
// import { Provider } from 'react-redux';
// import store from './store';
// // custom styles
// import './App.css';

// // check localStorage for a token and set the global headers with it if there is one
// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

// *********** FUNCTION **********
function App() {
  return (
    <Jumbotron
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Container className="App" style={{ alignContent: 'center' }}>
        {/* <Header
      navItems={navItems}
      setCurrentNavItem={setCurrentNavItem}
      currentNavItem={currentNavItem}
    ></Header> */}

        <Row>
          <Col>
            <LandingSleeve></LandingSleeve>
          </Col>
        </Row>

        {/* <Row>
      <Footer></Footer>
    </Row> */}
      </Container>
    </Jumbotron>

    // useEffect(() => {
    //   store.dispatch(loadUser());
    // }, []); // we need to put the empty brackets to prevent it from looping indefinitely; this way it will only run once, when it's loaded/mounted

    // return (
    //   <Provider store={store}>
    //     <Router>
    //       <Fragment>
    //         <Route exact path="/" component={Landing} />
    //         <Alert />
    //         <Switch>
    //           <Route exact path="/register" component={Register} />
    //           <Route exact path="/login" component={Login} />
    //           <PrivateRoute exact path="/dashboard" component={Dashboard} />
    //           <PrivateRoute exact path="/edit-user" component={EditUser} />
    //           <Route exact path="/tracks" component={Tracks} />
    //         </Switch>
    //       </Fragment>
    //     </Router>
    //   </Provider>
  );
}

export default App;
