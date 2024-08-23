import React, { useState } from 'react'
import {Container, Row, Col, Button, Form } from 'react-bootstrap';
import Logo from '../../components/logo'
import { useNavigate } from 'react-router-dom'


function CustomerPics({formData, setFormData }) {
    const [uploadFiles, setUploadFiles] = useState({
        frontRight:null,
        frontLeft:null,
        backRight:null,
        backLeft:null,
        dl:null,
        dotStamp:null,
        vinPlate: null,
        invoice: null,
        receipt: null
    })
    const handleFileChange = (e) => {
        const {name, files} = e.target
        setUploadFiles(prevFiles =>({
            ...prevFiles,
            [name]: files[0]
        }))
        console.log(files[0].name)
        console.log(uploadFiles)
    }
    return(
        <Container>
            <Logo></Logo>
            <Row className="mb-5 text-center">
                <Col xs={12}>
                    <h2 className="mb-3">Please upload the required images as indicated below</h2>
                    <p className="lead mb-2">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        Click here
                    </a>{' '}to view sample images of the required pictures
                    </p>
                </Col>
            </Row>
            
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} xs ={6} controlId="frontRight">
                    <Form.Label>Front Right </Form.Label>
                    <Form.Control type="file" name="frontRight" onChange={handleFileChange}/>
                    </Form.Group>
                    <Form.Group as={Col} xs ={6} controlId="frontLeft">
                    <Form.Label>Front Left</Form.Label>
                    <Form.Control type="file" name="frontLeft" onChange={handleFileChange}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} xs ={6} controlId="backRight">
                    <Form.Label>Back Right</Form.Label>
                    <Form.Control type="file" name="backRight" onChange={handleFileChange}/>
                    </Form.Group>
                    <Form.Group as={Col} xs ={6} controlId="backLeft">
                    <Form.Label>Back Left</Form.Label>
                    <Form.Control type="file" name="backLeft" onChange={handleFileChange}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} xs ={6} controlId="dotStamp">
                    <Form.Label>DOT Stamp</Form.Label>
                    <Form.Control type="file" name="dotStamp" onChange={handleFileChange}/>
                    </Form.Group>
                    <Form.Group as={Col} xs ={6} controlId="vinPlate">
                    <Form.Label>VIN Plate</Form.Label>
                    <Form.Control type="file" name="vinPlate" onChange={handleFileChange}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} xs ={6} controlId="dl">
                    <Form.Label>Drivers License</Form.Label>
                    <Form.Control type="file" name="dl" onChange={handleFileChange}/>
                    </Form.Group>
                    <Form.Group as={Col} xs ={6} controlId="invoice">
                    <Form.Label>Invoice/Bill of Sale</Form.Label>
                    <Form.Control type="file" name="vinPlate" onChange={handleFileChange}/>
                    </Form.Group>
                </Row>
                <Row className='mb-3'>
                    <Form.Group as={Col} xs ={6} controlId="receipt">
                    <Form.Label>Receipts for DOT parts</Form.Label>
                    <Form.Control type="file" name="receipt" onChange={handleFileChange}/>
                    </Form.Group>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col xs="2" className='text-center'>
                        <Button className='button w-100' type="click">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
            <div style={{ height: '50px' }}></div> {/* Spacer */}
        </Container>
    )
}

export default CustomerPics