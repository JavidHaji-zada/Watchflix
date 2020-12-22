import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { APP_COLORS } from '../../../shared/colors'
import { UserType } from '../../../shared/models/user';


function Login(): JSX.Element {
    const [userType, setUserType] = useState<UserType>('individual');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const companyInputRef = useRef<HTMLInputElement>(null)
    const individualInputRef = useRef<HTMLInputElement>(null)
    
    function setChecked(option: UserType) {
        setUserType(option)
    }

    function renderInner(): JSX.Element{
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h3 style={{ textAlign: 'center', color: APP_COLORS.darkGray }}>
                    Login to your account. Please specify account type.
                </h3>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <input ref={companyInputRef} checked={userType == 'company'} type='radio' name="user" value='Company' onClick={() => setChecked("company")} />
                    <button style={{ marginLeft: 12, border: 0, backgroundColor: 'transparent' }} onClick={() => setChecked('company')}>
                        Company
                    </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <input checked={userType == 'individual'} ref={individualInputRef} defaultChecked type='radio' name="user" value='Individual' onClick={() => setChecked('individual')} />
                    <button style={{ marginLeft: 12, border: 0, backgroundColor: 'transparent' }} onClick={() => setChecked('individual')}>
                        Individual
                    </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginTop: 30 }}>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Enter your username</Form.Label>
                            <Form.Control
                                onChange={(event) => setUsername(event.target.value)}
                                type="text" placeholder="Username" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Enter your password</Form.Label>
                            <Form.Control 
                                onChange={(event) => setUsername(event.target.value)}
                                type="text" placeholder="Username" />
                        </Form.Group>
                    </div>
                </div>   
            </div>
        )
    }
    function renderButton(): JSX.Element {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5%', width: '30%' }}>
                {
                    <Button style={styles.nextButton} onClick={finalizeRegistration} variant="danger">Login</Button>
                }
            </div>
        )
    }

    function finalizeRegistration(): void {
        //Login to the account
    }

    return (
        <div style={{ ...styles.container, ...{ flexDirection: 'column' } }}>
            <h1 style={styles.header}>Watchflix</h1>
            <h3 style={{ textAlign: 'center' }}>Just a few steps to enjoy movie night</h3>
            <div style={{ ...styles.innerContainer, ...{ flexDirection: 'column' } }} >
            {renderInner()}
            {renderButton()}
            </div>
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
        backgroundColor: '#DDDDDD',
        paddingBottom: 20
    },
    header: {
        color: APP_COLORS.red,
        marginTop: '5%'
    },
    innerContainer: {
        display: 'flex',
        flex: 1,
        width: '90%',
        marginHorizontal: '5%',
        backgroundColor: '#E0CCCC',
        borderWidth: 4,
        borderColor: '#EA9999',
        borderStyle: 'solid',
        alignItems: 'center',
        paddingTop: '5%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    blackText: {
        color: APP_COLORS.darkGray,
    },
    contentContainer: {
        display: 'flex'
    },
    nextButton: {
        width: '70%',
        minWidth: 240
    }
}
export default Login