import React, {useState} from 'react'
import {Container, Form, Row, Col, Card, Tab, Tabs, Button} from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import Logo from '../../components/logo'
import * as yup from 'yup'
import * as formik from 'formik'
import { LOGIN } from '../../../utils/mutations'
import Auth from '../../../utils/auth'

function Login() {
  const [selectedTab, setSelectedTab] = useState('login')
  const [loginError, setLoginError] = useState({message: ''})
  const [login] = useMutation(LOGIN)
  const {Formik} = formik 
  const validationSchema = (selectedTab) => {
    return yup.object().shape({
      username: yup.string().required('Required'),
      password: yup.string().required('Required'),
      confirmPassword: selectedTab === 'signup'
        ? yup.string().required('Please enter the password again').oneOf([yup.ref('password'), null], "Passwords didn't match")
        : yup.string().notRequired(),
    })
  }
  const initialValues = {
    username: '',
    password: '',
  }
  const handleSubmit = async (values) => {
    console.log('Form Submitted', values);
    setLoginError({message: ''});
    try {
      const { data } = await login({
        variables: {
          username: values.username,
          password: values.password
        }
      });
      Auth.login(data.login.token)
      window.location.assign('/admin')
    } catch(e) {
      console.log(e.message)
      setLoginError({message: e.message});
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
              <Tabs id="card-tabs" activeKey={selectedTab} onSelect={handleTabSelect} className="mb-0 justify-content-center" justify>
                <Tab eventKey="login" title="Login" />
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
                {loginError.message != '' ? (
                  <>
                    <Row className="justify-content-center mb-1 text-danger">
                      <Col xs="6" className='text-center'>
                          <p>{loginError.message}</p>
                      </Col>
                    </Row>
                  </>
                ):(
                  <></>
                )}
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
