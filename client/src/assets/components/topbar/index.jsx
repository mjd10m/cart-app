import React from 'react'
import {Row, Col, Nav, Navbar, Container} from 'react-bootstrap';
import logoNav from '../../../assets/logoNav.png'

function Topbar({totalPrice}) {
    return(
    <>
        <Navbar className="bg-body-secondary mb-3">
        <Container className="d-flex justify-content-between align-items-center">
            {/* Left-aligned section with logo and Home link */}
            <div className="d-flex align-items-center">
            <Navbar.Brand href="/" style={{ padding: 0, margin: 0, display: 'inline-block' }}>
                <img src={logoNav} style={{ display: 'block', width: '100%', height: 'auto' }} alt="" />
            </Navbar.Brand>
            <Nav.Link href="/" className="ms-2">Home</Nav.Link>
            </div>

            {/* Right-aligned section with the estimated total */}
            <Navbar.Text className="ms-auto">Estimated Total: {totalPrice}</Navbar.Text>
        </Container>
        </Navbar>
    </>
    )
}

export default Topbar