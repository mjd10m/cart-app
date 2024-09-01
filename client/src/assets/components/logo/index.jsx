import React from 'react'
import {Row, Col} from 'react-bootstrap';
import logo from '../../logo.png'

function Logo() {
    return(
          <Row className="justify-content-center">
            <Col xs="12">
                <a href="/">
                  <img src={logo} alt="Logo" style={{ display: 'block', margin: '0 auto' }} />
                </a> 
            </Col>
          </Row>
    )
}

export default Logo