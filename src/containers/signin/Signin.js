import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Input from '../../components/ui/input/Input'
import { login } from '../../redux/actions/auth.actions'
import { useDispatch, useSelector } from 'react-redux'
import {Redirect} from 'react-router-dom';


function Signin(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    
    const dispatch = useDispatch();

    const userLogin = (e) => {

        e.preventDefault();

        const user = {
            email, password
        }

        dispatch(login(user));
    }

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const handleBlur = (e) => {
        const value = e.target.value
        if(value){
            setEmail(`coach${value}`)
        }
    }

    if(auth.authenticate){
        return <Redirect to='/' />
    }

    return (
        <div>
            <Layout>
                <Container>
                    <Row style={{ marginTop: '100px' }}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={userLogin}>
                                <Input
                                    label="Email"
                                    placeholder="Email"
                                    value={email}
                                    type="email"
                                    onChange={handleChange}   
                                    onBlur={handleBlur}                               
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

export default Signin
