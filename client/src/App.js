import React from 'react';
import './App.css';

// *********** COMPONENTS **********
import SignUp from './components/SignUp';
import LandingSleeve from './components/LandingSleeve';

// *********** BOOTSTRAP **********
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

// *********** ASSETS **********
import bgimage from './assets/img/bgImg@x2.png';

// *********** FUNCTION **********
function App() {
  return (
    <Jumbotron style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', width: '100vw', height: '100vh' }}>
  <Container className="App" style={{ alignContent: "center" }}>
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
    
  );
}

export default App;




