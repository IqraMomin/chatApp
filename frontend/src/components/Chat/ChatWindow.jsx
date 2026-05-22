import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function ChatWindow() {
    return (
        <Container fluid>
            <Row style={{height:"100vh"}}>
                <Col md={1} style={{backgroundColor:"pink"}}>
                    <h1>*</h1>
                </Col>
                <Col md={4} style={{backgroundColor:"antiquewhite"}}></Col>
                <Col md={7} style={{backgroundColor:"aliceblue"}}></Col>
            </Row>
        </Container>
    )
}

export default ChatWindow
