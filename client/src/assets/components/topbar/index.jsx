import React from 'react'
import {Row, Col, Nav, Navbar, Container} from 'react-bootstrap';
import logoNav from '../../../assets/logoNav.png'

function Topbar({totalPrice}) {
    return(
    <>
        <Navbar className="bg-body-primary mb-3">
            <Container className="d-flex justify-content-between align-items-center">
                {/* Left-aligned section with logo and Home link */}
                <div className="d-flex align-items-center">
                <Navbar.Brand href="/" style={{ padding: 0, margin: 0, display: 'inline-block' }}>
                    <img src={logoNav} style={{ display: 'block', width: '100%', height: 'auto' }} alt="" />
                </Navbar.Brand>
                </div>

                {/* Right-aligned section with the estimated total */}
                <Navbar.Text className="ms-auto"style={{ color: '#000000' }}><b>Estimated Total: <span style={{ color: '#FF0000' }}>${totalPrice}</span></b></Navbar.Text>
            </Container>
        </Navbar>
    </>
    )
}

export default Topbar