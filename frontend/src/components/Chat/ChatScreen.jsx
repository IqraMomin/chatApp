import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ChatForm from './ChatForm'
import ChatList from './ChatList'
import { useDispatch } from 'react-redux';
import { getMessages } from '../../redux/slices/messageSlice';

function ChatScreen() {
  const dispatch =  useDispatch();

  useEffect(()=>{
     dispatch(getMessages());
  },[dispatch]);
  
    return (
        <Container fluid style={{ backgroundColor: "black", padding: 0 }}>
  <Row className="vh-100 flex-column m-0">

    <div
      style={{
        backgroundColor: "purple",
        height: "10vh"
      }}
    >
      This is Navigation bar
    </div>

    <div
      style={{
        backgroundColor: "yellow",
        height: "80vh"
      }}
    >
     <ChatList/>
    </div>

    <div
      style={{
        backgroundColor: "green",
        height: "10vh"
      }}
    >
     <ChatForm/>
    </div>

  </Row>
</Container>
    )
}

export default ChatScreen
