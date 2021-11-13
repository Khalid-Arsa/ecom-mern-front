import React from 'react'
import Layout from '../../components/layout/Layout'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Input from '../../components/ui/input/Input'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { signup } from '../../redux/actions/user.actions'

function Signup(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    const userSignup = (e) => {
        
        e.preventDefault();

        const user = {
            firstName, lastName, email, password
        }

        dispatch(signup(user));

    }

    if(auth.authenticate){
        return <Redirect to='/' />
    }

    if(user.loading){
        return <p>Loading...!</p>
    }

    return (
        <div>
            <Layout>
                <Container>
                    { user.message }
                    <Row style={{ marginTop: '100px' }}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={userSignup}>
                                <Row>
                                    <Col md={6}>
                                        <Input
                                            label="First Name"
                                            placeholder="First Name"
                                            value={firstName}
                                            type="text"
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Input
                                            label="Last Name"
                                            placeholder="Last Name"
                                            value={lastName}
                                            type="text"
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </Col>
                                </Row>

                                <Input
                                    label="Email"
                                    placeholder="Email"
                                    value={email}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    label="Password"
                                    placeholder="Password"
                                    value={password}
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </div>
    )
}

export default Signup
