import React from 'react'
import {Container, Row, Col, Button } from 'react-bootstrap';
import Logo from '../../components/logo'
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate()
  const handleButtonClick = () => {
    navigate('/')
  }
  return (
    <Container>
        <Logo></Logo>
        <Row className="justify-content-center">
          <Col xs="12" className="text-center">
            <h2>Feel free to reach out to us anytime via email at <b>mason@tagmycart.com</b> or call us at <b>(813) 553-1369</b>. We’re here to help!</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="3" className="text-center">
            <Button className='button' onClick={handleButtonClick}>Home</Button>
          </Col>
      </Row>
    </Container>
  )
}

export default Contact
