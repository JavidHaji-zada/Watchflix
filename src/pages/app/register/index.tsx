import React from 'react'
import { APP_COLORS } from '../../../shared/colors'

function Register(): JSX.Element {

    return (
        <div style={{ ...styles.container, ...{ flexDirection: 'column' } }}>
            <h1 style={styles.header}>Watchflix</h1>
            <h3 style={{ textAlign: 'center' }}>Just a few steps to enjoy movie night</h3>
        </div>
    )
}

const styles = {
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        overflow: 'auto',
        backgroundColor: '#DDDDDD'
    },
    header: {
        color: APP_COLORS.red,
        marginTop: '5%'
    }
}

export default Register