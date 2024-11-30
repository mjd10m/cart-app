import React, {useState, useEffect} from 'react'
import {Container, Form, Row, Col, Card, Tab, Tabs, Button} from 'react-bootstrap'
import { useMutation, useLazyQuery } from '@apollo/client'
import Logo from '../../components/logo'
import * as yup from 'yup'
import * as formik from 'formik'
import {ADD_USER, LOGIN} from '../../../utils/mutations'
import Auth from '../../../utils/auth'
import { VALIDATE_SIGNUP_TOKEN } from '../../../utils/queries';


function Signup() {
  const [checkToken,{loading, error, data}] = useLazyQuery(VALIDATE_SIGNUP_TOKEN)
  const [addUser] = useMutation(ADD_USER)
  const {Formik} = formik 
  const validationSchema = () => {
    return yup.object().shape({
        username: yup.string().required('Required'),
        password: yup.string().required('Required'),
        confirmPassword: yup.string().required('Please enter the password again').oneOf([yup.ref('password'), null], "Passwords didn't match")
    })
  }
  const initialValues = {
      username: '',
      password: '',
      confirmPassword: ''
  }
  const handleSubmit = async (values) => {
    console.log('Form Submitted', values);
    const { data } = await addUser({
        variables: {
            username: values.username,
            password: values.password,
        }
    });
    Auth.login(data.addUser.token)
    window.location.assign('/admin')
  };
  useEffect(() => {
    const token = Auth.getSignupToken()
    checkToken({variables: { token }})
  }, [checkToken])
  return (
    <Container>
      <Logo></Logo>
      {data?.validateSignupToken || false ? (
        <>
          <Row className='justify-content-center'>
            <Col xs='8'>
              <Card>
                <Card.Header>
                  <Row className="justify-content-center">
                    <h3 className='mb-0 text-center'>Signup</h3>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Formik validationSchema={validationSchema()} onSubmit={handleSubmit} initialValues={{...initialValues}} >
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
                      <Form.Group as={Row} className='mb-3' controlId="confirmPassword">
                        <Form.Label column xs={5} >Confirm Password</Form.Label>
                        <Col>
                          <Form.Control type="password" name="confirmPassword" value = {values.confirmPassword} onChange={handleChange} isInvalid={touched.confirmPassword && !!errors.confirmPassword}/>
                          <Form.Control.Feedback type='invalid'>{errors.confirmPassword}</Form.Control.Feedback>
                        </Col>   
                      </Form.Group>
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
        </>
      ):(<div className='text-center'>Invalid or Expired Token</div>)}
    </Container>
  )
}

export default Signup
