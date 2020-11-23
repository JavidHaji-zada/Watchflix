import React from 'react';
import styles from './styles';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Team(): JSX.Element {

    return (
        <Container className='d-flex flex-sm-wrap'>
            {/* <Row className='d-flex flex-wrap'> */}
            <div style={styles.profileContainer}>
                <img src={require('../../assets/img/profile_pics/javid.jpeg')} style={styles.imageContainer} />
                Javid Haji-zada
             </div>
            <div style={styles.profileContainer}>
                <img src={require('../../assets/img/profile_pics/anar.jpeg')} style={styles.imageContainer} />
                Anar Huseynov
            </div>
            <div style={styles.profileContainer}>
                <img src={require('../../assets/img/profile_pics/leylah.jpeg')} style={styles.imageContainer} />
                Leyla Hashimli
            </div>
            <div style={styles.profileContainer}>
                <img src={require('../../assets/img/profile_pics/leylai.jpeg')} style={styles.imageContainer} />
                Leyla Ismayilova
            </div>
        </Container >
    )
}

export default Team;