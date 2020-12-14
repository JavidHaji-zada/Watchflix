import React from 'react'
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap'

import './home.css'

function Home(): JSX.Element {

    const history = useHistory();

    function onLoginClicked() {
        history.push('/login')
    }

    function onRegisterClicked() {
        history.push('/register')
    }

    return (
        <div className='fill-window'
            style={styles.container}>
            <Button onClick={onLoginClicked} style={{ position: 'absolute', top: 10, right: 10 }} variant="danger">Login</Button>
            <div style={styles.headerContainer}>
                <h1 style={styles.header}>Watchflix</h1>
            </div>
            <div style={styles.sloganContainer}>
                <h2 style={styles.slogan}>Watchflix and Chill</h2>
            </div>
            <div style={{ flex: 1, display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={onRegisterClicked} variant="danger">Register Now!</Button>
            </div>
        </div>
    )
}

const styles = {
    container: {
        backgroundColor: '#011627'
    },
    headerContainer: {
        width: '100%',
        marginTop: '10%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 32,
        color: 'white',
    },
    sloganContainer: {
        width: '100%',
        marginTop: '4.5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    slogan: {
        fontSize: 32,
        color: 'white',
    }
}

export default Home