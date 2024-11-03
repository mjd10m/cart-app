import React from 'react'
import {Container, Row, Col, Button } from 'react-bootstrap';
import Logo from '../../components/logo'
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate()
  const handleButtonClick = () => {
    navigate('/customerInfo')
  }
  return (
    <Container>
      <Logo></Logo>
      <Row className="justify-content-center">
        <Col xs="12" className="text-center">
          <h1>Florida's Premier Cart Tag Services</h1>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs="11" md="5">
          <h5>What does my cart need to be legal?</h5>
          <ul>
            <li>Headlights</li>
            <li>Front and rear turnsignals</li>
            <li>Taillights</li>
            <li>Headlights</li>
            <li>Red Reflex Reflectors (one on each side one on rear)</li>
            <li>Side mirrors</li>
            <li>Parking Brake</li>
            <li>Seatbelt for eachseat</li>
          </ul>
        </Col>
        <Col xs="5">
          <h5>What documents do I need to start the process?</h5>
          <ul>
            <li>Pictures of cart (All 4Corners)</li>
            <li>Picture of DOT stamp on windshield</li>
            <li>Picture of VIN plateon cart</li>
            <li>Picture of Drivers License</li>
            <li>Invoice or bill of sale from where cart was purchased</li>
            <li>Receipts for all parts purchased for DOT</li>
            {/* <li><a href='#'>Click Here</a> for example pictures</li>
            <li><a href='#'>Click Here</a> for sample invoice/bill of sale</li> */}
          </ul>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="5" className="text-center">
          <Button className='button' onClick={handleButtonClick}>Get Started</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Homepage
