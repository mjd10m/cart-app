import React, { useEffect, useState } from 'react'
import {Container, Row, Col, Button, Form } from 'react-bootstrap';
import Logo from '../../components/logo'
import * as yup from 'yup'
import * as formik from 'formik'
import { customAlphabet } from 'nanoid'
import Topbar from '../../components/topbar'

import { useNavigate } from 'react-router-dom'

function CustomerInfo({formData, setFormData, totalPrice, setTotalPrice }) {
    const {Formik} = formik
    const validationSchema = yup.object().shape({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        dob: yup.date().required('Required'),
        addr1: yup.string().required('Required'),
        addr2: yup.string(),
        city: yup.string().required('Required'),
        state: yup.string().required('Required'),
        zip: yup.string().required('Required'),
        email: yup.string().email('Invalid email address').required('Required'),
        phone: yup.string().required('Required'),
        cartSize: yup.string().required('Required'),
        cartColor: yup.string().required('Required'),
        plate: yup.string().required('Required'),
        plateNum: yup.string().when('plate', {
            is: (plate) => {return plate == 'plateTransfer' || plate == 'custPlate'},
            then: () => yup.string().required('Required'),
            otherwise: () => yup.string().notRequired(),
        }),
        plateType: yup.string().when('plate', {
            is: (plate) => {return plate === 'specPlate' || plate === 'custPlate'},
            then:() => yup.string().required('Required'),
            otherwise:() => yup.string().notRequired(),
        })
    })
    const calcPrice = (value) => {
        let newPrice = ''
        if (value === "newPlate") {
            newPrice = '828.35'
        } else if (value === "plateTransfer") {
            newPrice = '628.35'
        } else if (value === "specPlate") {
            newPrice = '858.35'
        } else if (value === "perPlate") {
            newPrice = '888.35'
        } else if (value === "perSpecPlate") {
            newPrice = '923.35'
        }
        setTotalPrice(newPrice)
    }
    const navigate = useNavigate()
    const nanoid = customAlphabet('1234567890', 10)
    const handleSubmit = (values) => {
        const id = nanoid()
        setFormData({...formData, ...values, transactionId:id})
        navigate('/customerPics')
  }
    useEffect(() => {
        console.log('formData updated:', formData);
    }, [formData]);
    
    return(
        <Container fluid style={{ padding: 0, margin: 0 }}>
            <Topbar totalPrice = {totalPrice}/>
            <Container>
            <Row className="mb-4 text-center">
                <Col xs={12}>
                    <h2 className="mb-3">Please complete the form below</h2>
                    <p className="lead mb-2">
                    Looking for a specialty Florida plate for your cart?{' '}
                    <a href="https://www.flhsmv.gov/pdf/specialtyplates/tagbrochure.pdf" target="_blank" rel="noopener noreferrer">
                        Browse all available options here
                    </a>
                    </p>
                    <p className="lead mb-0">
                    Considering a customized Florida plate?{' '}
                    <a href="https://services.flhsmv.gov/MVCheckPersonalPlate/" target="_blank" rel="noopener noreferrer">
                        Check availability
                    </a>
                    </p>
                </Col>
            </Row>
            <Formik validationSchema={validationSchema} onSubmit={handleSubmit} initialValues={{...formData}}>
            {({handleSubmit, handleChange, values, touched, errors  }) => (
            <Form noValidate onSubmit={handleSubmit} className='p-3'>
                <Row className="mb-3">
                    <Form.Group as={Col} xs={12} md={4} controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" value = {values.firstName} onChange={handleChange} isInvalid={touched.firstName && !!errors.firstName}/>
                    <Form.Control.Feedback type='invalid'>{errors.firstName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} xs={12} md={4} controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" value = {values.lastName} onChange={handleChange} isInvalid={touched.lastName && !!errors.lastName}/>
                    <Form.Control.Feedback type='invalid'>{errors.lastName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} xs={12} md={4} controlId="dob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" name="dob" value = {values.dob} onChange={handleChange} isInvalid={touched.dob && !!errors.dob}/>
                    <Form.Control.Feedback type='invalid'>{errors.dob}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group  as={Col} xs={12} md={6} className="mb-3" controlId="address1">
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control type="text" name="addr1" value = {values.addr1} onChange={handleChange} isInvalid={touched.addr1 && !!errors.addr1} />
                        <Form.Control.Feedback type='invalid'>{errors.addr1}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="address2">
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control type="text" name="addr2" value = {values.addr2} onChange={handleChange} isInvalid={touched.addr1 && !!errors.addr1} />
                        <Form.Control.Feedback type='invalid'>{errors.addr1}</Form.Control.Feedback>
                    </Form.Group>
                </Row>    
                
                <Row className="mb-3">
                    <Form.Group as={Col} xs={12} md={8} controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="city" value = {values.city} onChange={handleChange} isInvalid={touched.city && !!errors.city}/>
                    <Form.Control.Feedback type='invalid'>{errors.city}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} xs={6} md={2} controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name="state" value = {values.state} onChange={handleChange} isInvalid={touched.state && !!errors.state}/>
                    <Form.Control.Feedback type='invalid'>{errors.state}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} xs={6} md={2} controlId="zip">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control type="text" name="zip" value = {values.zip} onChange={handleChange} isInvalid={touched.zip && !!errors.zip}/>
                    <Form.Control.Feedback type='invalid'>{errors.zip}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} xs={12} md={9} controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value = {values.email} onChange={handleChange} isInvalid={touched.email && !!errors.email}/>
                    <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group as={Col} xs={12} md={3} controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="phone" name="phone" value = {values.phone} onChange={handleChange} isInvalid={touched.phone && !!errors.phone}/>
                    <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} xs={12} md={4} controlId="cartSize">
                    <Form.Label>Number of Passengers</Form.Label>
                    <Form.Select type="text" name="cartSize" value = {values.cartSize} onChange={handleChange} isInvalid={touched.cartSize && !!errors.cartSize}>
                        <option value="">Select</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.cartSize}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} xs={12} md={2} controlId="cartColor">
                    <Form.Label>Cart Color</Form.Label>
                    <Form.Control type="text" name="cartColor" value = {values.cartColor} onChange={handleChange} isInvalid={touched.cartColor && !!errors.cartColor}/>
                    <Form.Control.Feedback type='invalid'>{errors.cartColor}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} xs={12} md={6} controlId="plate">
                    <Form.Label>Plate Options</Form.Label>
                        <Form.Select aria-label="Select plate type" name="plate" value={values.plate} onChange={(e)=> {calcPrice(e.target.value); handleChange(e)}} isInvalid={touched.plate && !!errors.plate}>
                            <option value="">Select</option>
                            <option value="newPlate">New Plate</option>
                            <option value="plateTransfer">Plate Transfer</option>
                            <option value="specPlate">Speciality Plate</option>
                            <option value="perPlate">Personalized Plate</option>
                            <option value="perSpecPlate">Personalized Speciality Plate</option>
                        </Form.Select>
                        <Form.Control.Feedback type='invalid'>{errors.plate}</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                {values.plate === "plateTransfer" ?(
                    <Row className="mb-3 justify-content-center">
                        <Form.Group as={Col} md={4} xs={12} controlId="plateNum" className=''>
                            <Form.Label>Plate Number</Form.Label>
                            <Form.Control type="text" name="plateNum" value = {values.plateNum} onChange={handleChange} isInvalid={touched.plateNum && !!errors.plateNum} />
                            <Form.Control.Feedback type='invalid'>{errors.plateNum}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                ): null }

                {values.plate === "specPlate" ?(
                    <Row className="mb-3 justify-content-center">
                        <Form.Group as={Col} md={4} xs={12} controlId="plateType">
                            <Form.Label>Plate Type</Form.Label>
                            <Form.Control type="text" name="plateType" value = {values.plateType} onChange={handleChange} isInvalid={touched.plateType && !!errors.plateType}/>
                            <Form.Control.Feedback type='invalid'>{errors.plateType}</Form.Control.Feedback>
                        </Form.Group>
                        </Row>
                ): null }
                {values.plate === "perPlate" ?(
                    <Row className="mb-3 justify-content-center">
                        <Form.Group as={Col} md={4} xs={12} controlId="plateNum" className=''>
                            <Form.Label>Plate Number</Form.Label>
                            <Form.Control type="text" name="plateNum" value = {values.plateNum} onChange={handleChange} isInvalid={touched.plateNum && !!errors.plateNum} />
                            <Form.Control.Feedback type='invalid'>{errors.plateNum}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                ): null }

                {values.plate === "perSpecPlate" ?(
                    <Row className="mb-3 justify-content-center">
                        <Form.Group as={Col} md={4} xs={12} controlId="plateNum">
                            <Form.Label>Plate Number</Form.Label>
                            <Form.Control type="text" name="plateNum" value = {values.plateNum} onChange={handleChange} isInvalid={touched.plateNum && !!errors.plateNum}/>
                            <Form.Control.Feedback type='invalid'>{errors.plateNum}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={4} xs={12} controlId="plateType">
                            <Form.Label>Plate Type</Form.Label>
                            <Form.Control type="text" name="plateType" value = {values.plateType} onChange={handleChange} isInvalid={touched.plateType && !!errors.plateType}/>
                            <Form.Control.Feedback type='invalid'>{errors.plateType}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                ): null }
                    <Row className="justify-content-center mb-3">
                        <Col xs="2" className='text-center'>
                            <Button className='button w-100' type="submit">
                                Next
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )}
            </Formik>
            </Container>
            <div style={{ height: '50px' }}></div> {/* Spacer */}
        </Container>
    )
}

export default CustomerInfo