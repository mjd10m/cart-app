import React from 'react'
import {Container, Row, Col, Button, Form } from 'react-bootstrap';
import Logo from '../../components/logo'

function Summary () {

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
                    <h3>Your transaction ID is 10293845</h3>
                </Col>
            </Row>
            <Row className="justify-content-center mt-5">
                <Col xs="12" className="text-center">
                    <h5>You will be recieving an email with a FL vehcile Power of Attorney.  Please print, sign, and mail to our offices.  Once our team has reviewed your submission we will be reach out with an invoice for the services.  HAGS</h5>
                </Col>
            </Row>
        </Container>
    )
}
export default Summary