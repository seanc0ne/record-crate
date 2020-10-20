import React from "react";

// *********** BOOTSTRAP **********
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';

// *********** ASSETS **********
import recordSleeveLogo from '../../assets/img/recordSleeveWtLogo@x2.png'
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";

// *********** FUNCTION **********
function LandingSleeve() {
    return (
        <Container>
            <Card className='landingCard'>
            <Card.Img src={recordSleeveLogo} fluid />
            <Card.ImgOverlay>
                <Card.Text className="landingText">Create your own playlist from our database full of all the details you’ve been missing including BPM, key, and much more</Card.Text>
            <Button className='landingBtn'>Sign Up</Button>
            </Card.ImgOverlay>
            </Card> 
        </Container>

    );

}

export default LandingSleeve;