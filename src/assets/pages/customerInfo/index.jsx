import React from 'react'
import {Container, Row, Col, Button, Form } from 'react-bootstrap';
import Logo from '../../components/logo'

import { useNavigate } from 'react-router-dom'

function CustomerInfo({formData, setFormData }) {
    const navigate = useNavigate()
        const handleButtonClick = () => {
        navigate('/customerPics')
  }
    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(value)
        setFormData({...formData,[name]: value})
        console.log(formData)
    }
    return(
        <Container>
            <Logo/>
            <Row className="mb-5 text-center">
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
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" value = {formData.firstName} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" value = {formData.lastName} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="dob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" name="dob" value = {formData.dob} onChange={handleChange}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group  as={Col} className="mb-3" controlId="address1">
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control type="text" name="addr1" value = {formData.addr1} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="address2">
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control type="text" name="addr2" value = {formData.addr2} onChange={handleChange} />
                    </Form.Group>
                </Row>    
                
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="city" value = {formData.city} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name="state" value = {formData.state} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="zip">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control type="text" name="zip" value = {formData.zip} onChange={handleChange} />
                    </Form.Group>
                </Row>
                <Row>
                <Form.Group as={Col} controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value = {formData.email} onChange={handleChange} />
                    </Form.Group>
                    
                    <Form.Group as={Col} controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="phone" name="phone" value = {formData.phone} onChange={handleChange} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="cartSize">
                    <Form.Label>Cart Size</Form.Label>
                    <Form.Control type="text" name="cartSize" value = {formData.cartSize} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="cartColor">
                    <Form.Label>Cart Color</Form.Label>
                    <Form.Control type="text" name="cartColor" value = {formData.cartColor} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="plate">
                    <Form.Label>Plate Options</Form.Label>
                        <Form.Select aria-label="Select plate type" name="plate" value={formData.plate} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="newPlate">New Plate</option>
                            <option value="plateTransfer">Plate Transfer</option>
                            <option value="specPlate">Speciality Plate</option>
                            <option value="custPlate">Customized Plate</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                {formData.plate === "plateTransfer" ?(
                    <Row className="mb-3 justify-content-center">
                        <Form.Group as={Col} xs={4} controlId="plateNum" className=''>
                            <Form.Label>Plate Number</Form.Label>
                            <Form.Control type="text" name="plateNum" value = {formData.plateNum} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                ): null }

                {formData.plate === "specPlate" ?(
                    <Row className="mb-3 justify-content-center">
                        <Form.Group as={Col} xs={4} controlId="plateType">
                            <Form.Label>Plate Type</Form.Label>
                            <Form.Control type="text" name="plateType" value = {formData.plateType} onChange={handleChange} />
                        </Form.Group>
                        </Row>
                ): null }

                {formData.plate === "custPlate" ?(
                    <Row className="mb-3 justify-content-center">
                        <Form.Group as={Col} xs={4} controlId="plateNum">
                            <Form.Label>Plate Number</Form.Label>
                            <Form.Control type="text" name="plateNum" value = {formData.plateNum} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} xs={4} controlId="plateType">
                            <Form.Label>Plate Type</Form.Label>
                            <Form.Control type="text" name="plateType" value = {formData.plateType} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                ): null }
                <Row className="justify-content-center mb-3">
                    <Col xs="2" className='text-center'>
                        <Button className='button w-100' type="click" onClick={handleButtonClick}>
                            Next
                        </Button>
                    </Col>
                </Row>
            </Form>
            <div style={{ height: '50px' }}></div> {/* Spacer */}
        </Container>
    )
}

export default CustomerInfo