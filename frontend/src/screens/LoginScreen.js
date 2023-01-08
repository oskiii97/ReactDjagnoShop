import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin


    useEffect(() => {
            if (userInfo) {
                navigate(redirect)
            }
        }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Zaloguj sie</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Adress Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Wprowadz email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Haslo</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Wprowadz haslo'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Zaloguj sie
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Nowy Uzytkownik? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Zarejestruj sie!
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen