import React, { Fragment } from 'react';
import recordSleeveLogo from '../../assets/img/recordSleeveWtLogo@x2.png';

// *********** BOOTSTRAP **********
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const StartSleeve = ({ currentSleeve, setCurrentSleeve }) => {
  return (
    <Fragment>
      <Card.Img src={recordSleeveLogo} />
      <Card.ImgOverlay>
        <div className="start-sleeve">
          <Card.Text className="landingText hide-sm">
            Create your own playlist from our database full of all the details
            you’ve been missing including BPM, key, and much more...
          </Card.Text>
          <div className="startBtns m-4">
            <Button
              className="btn btn-primary mx-3 signUpBtn"
              onClick={() => setCurrentSleeve('signup')}
            >
              Sign Up
            </Button>
            <Button
              className="btn btn-light mx-3 loginBtn"
              onClick={() => setCurrentSleeve('login')}
            >
              Login
            </Button>
          </div>
        </div>
      </Card.ImgOverlay>
    </Fragment>
  );
};

export default StartSleeve;
