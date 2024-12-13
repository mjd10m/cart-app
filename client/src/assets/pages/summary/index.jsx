import React from 'react'
import {Container, Row, Col, Button, Form } from 'react-bootstrap';
import Logo from '../../components/logo'

function Summary ({formData}) {

    return(
        <Container>
            <Logo></Logo>
            <Row className="justify-content-center">
                <Col xs="12" className="text-center">
                    <h1>Thank You for your Submission</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs="12" className="text-center">
                    <h3>Your transaction ID is {formData.transactionId}</h3>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs="12" className="text-center">
                    <h5 style={{ textDecoration: 'underline' }}>What to Expect Next</h5>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs="6" className="text-center">
                    <p>You will recieve an email with the below items.  Please make sure to check your spam/junk folder for this email.</p>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs="6" className="text-center">
                    <p><strong>Power of Attorney Form</strong></p>
                    <p>This form is required for us to process your title work. Please sign the document and mail it to the following address:</p>
                    <p>TagMyCart.com<br></br>7423 US Hwy 301 S #2<br></br>Riverview, FL 33578</p>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs="6" className="text-center">
                    <p><strong>Payment Link</strong></p>
                    <p>Please follow the PayPal payment link included to pay for services.</p>
                </Col>
            </Row>
            
            <Row className="justify-content-center">
                <Col xs="6" className="text-center">
                    <p>Once we receive the signed form and payment, we’ll begin processing your request. If you have any questions, feel free to contact us at 813-553-1369.</p>
                    <p>Thank you for choosing TagMyCart.com!</p>
                    
                </Col>
            </Row>
        </Container>
    )
}
export default Summary