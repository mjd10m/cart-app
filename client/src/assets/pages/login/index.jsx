import React, {useState} from 'react'
import {Container, Form, Row, Col, Card, Tab, Tabs, Button} from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import Logo from '../../components/logo'
import * as yup from 'yup'
import * as formik from 'formik'
import {ADD_USER, LOGIN} from '../../../utils/mutations'
import Auth from '../../../utils/auth'

function Login() {
    const state = 'signIn'
    const [selectedTab, setSelectedTab] = useState('login')
    const [addUser] = useMutation(ADD_USER)
    const [login] = useMutation(LOGIN)
    const {Formik} = formik 
    const validationSchema = (selectedTab) => {
        return yup.object().shape({
            username: yup.string().required('Required'),
            password: yup.string().required('Required'),
            confirmPassword: selectedTab === 'signup'
                ? yup.string().required('Please enter the password again').oneOf([yup.ref('password'), null], "Passwords didn't match")
                : yup.string().notRequired(),
            adminPassword: selectedTab === 'signup'
                  ? yup.string().required('Required')
                  : yup.string().notRequired(),
        })
    }
    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
        adminPassword: ''
    }
    const handleSubmit = async (values) => {
        console.log('Form Submitted', values);
        if(selectedTab === 'signup'){
            const { data } = await addUser({
                variables: {
                    username: values.username,
                    password: values.password,
                    adminPassword: values.adminPassword
                }
            });
            Auth.login(data.addUser.token)
            window.location.assign('/admin')
        } else {
            const { data } = await login({
                variables: {
                    username: values.username,
                    password: values.password
                }
            });
            Auth.login(data.login.token)
            window.location.assign('/admin')
        }
      };
    const handleTabSelect = (key) => {
        setSelectedTab(key)
    }
    return (
    <Container>
        <Logo></Logo>
        <Row className='justify-content-center'>
            <Col xs='8'>
                <Card>
                    <Card.Header>
                        <Tabs
                        id="card-tabs"
                        activeKey={selectedTab}
                        onSelect={handleTabSelect}
                        className="mb-0 justify-content-center"
                        justify
                        >
                        <Tab eventKey="login" title="Login" />
                        <Tab eventKey="signup" title="Signup" />
                        </Tabs>
                    </Card.Header>
                    <Card.Body>
                    <Formik validationSchema={validationSchema(selectedTab)} onSubmit={handleSubmit} initialValues={{...initialValues}} >
                    {({handleSubmit, handleChange, values, touched, errors  }) => (
                    <Form noValidate onSubmit={handleSubmit} className='p-3'>
                        <Form.Group as={Row} className='mb-3' controlId="username">
                        <Form.Label column xs={5} >Username</Form.Label>
                        <Col>
                            <Form.Control type="text" name="username" value = {values.username} onChange={handleChange} isInvalid={touched.username && !!errors.username}/>
                            <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>
                        </Col>
                        </Form.Group>
                        <Form.Group as={Row} className='mb-3' controlId="password">
                        <Form.Label column xs={5} >Password</Form.Label>
                        <Col>
                            <Form.Control type="password" name="password" value = {values.password} onChange={handleChange} isInvalid={touched.password && !!errors.password}/>
                            <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                        </Col>   
                        </Form.Group>
                        {selectedTab =='signup' ? (
                            <>
                            <Form.Group as={Row} className='mb-3' controlId="confirmPassword">
                            <Form.Label column xs={5} >Confirm Password</Form.Label>
                            <Col>
                                <Form.Control type="password" name="confirmPassword" value = {values.confirmPassword} onChange={handleChange} isInvalid={touched.confirmPassword && !!errors.confirmPassword}/>
                                <Form.Control.Feedback type='invalid'>{errors.confirmPassword}</Form.Control.Feedback>
                            </Col>   
                            </Form.Group>
                            <Form.Group as={Row} className='mb-3' controlId="adminPassword">
                            <Form.Label column xs={5} >Admin Password</Form.Label>
                            <Col>
                                <Form.Control type="password" name="adminPassword" value = {values.adminPassword} onChange={handleChange} isInvalid={touched.adminPassword && !!errors.adminPassword}/>
                                <Form.Control.Feedback type='invalid'>{errors.adminPassword}</Form.Control.Feedback>
                            </Col>
                            </Form.Group>
                            </>   
                        ):(<div/>)}
                        <Row className="justify-content-center mb-3">
                            <Col xs="4" className='text-center'>
                                <Button className=' w-100' type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    )}
                    </Formik>
                    
                    </Card.Body>
                </Card>
            </Col>
            
        </Row>

    </Container>
  )
}

export default Login
