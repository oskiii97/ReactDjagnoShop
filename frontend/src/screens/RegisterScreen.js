import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen() {

    const [first_name, setFirst_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister


    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(first_name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Zaloguj sie</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Imie</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Wpisz imie'
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Adres Email</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Wpisz swoj email Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Haslo</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Wpisz swoje haslo'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Potwierdz haslo</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Potwierdz haslo'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Rejestracja
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Posiadasz konto?? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Zaloguj sie
                    </Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default RegisterScreen