import React from 'react'
import {Container, Row, Col, Button, Form } from 'react-bootstrap';
import Logo from '../../components/logo'
import { useNavigate } from 'react-router-dom';

function FormSelection() {
  const navigate = useNavigate()
  const handleButtonClick = (e) => {
    if(e.currentTarget.id === "individual"){
      navigate("/customerinfo")
    } else if(e.currentTarget.id === "dealer") {
      navigate("/dealer/customerinfo")
    }
  }
  return (
    <Container>
      <Logo></Logo>
      <Row className="mb-4 text-center">
        <Col xs={12}>
          <h2 className="mb-3">Please select one of the below options</h2>
        </Col>
      </Row>
      <Row className='text-center justify-content-center'>
        <Col xs={5}>
          <Button id="individual" onClick={handleButtonClick} className='button p-4'>
            <div className= 'mb-3'>Individual</div>
            <div>You are submitting information for yourself</div>
          </Button>
        </Col>
        <Col xs={5}>
          <Button id="dealer" onClick={handleButtonClick} className='button p-4'>
            <div className= 'mb-3'>Dealer</div>
            <div>You are submitting information on behalf of a customer</div>
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default FormSelection
