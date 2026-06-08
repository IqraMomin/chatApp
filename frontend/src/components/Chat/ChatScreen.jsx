import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ChatForm from './ChatForm'
import ChatList from './ChatList'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, getMessages } from '../../redux/slices/messageSlice';
import socket from '../../socket';

function ChatScreen() {
  const dispatch =  useDispatch();

  useEffect(() => {

    socket.on("new-message",(data)=>{
      console.log({username:data.username,...data.message})
      dispatch(addMessage({username:data.username,...data.message}));
      
    })

    // let active = true;

    // const pollMessages = async (lastId = 0) => {

    //     if (!active) return;

    //     const result =
    //         await dispatch(
    //             getMessages(lastId)
    //         );

    //     if (!active) return;

    //     const newMessages =
    //         result.payload || [];

    //     let nextLastId = lastId;

    //     if (newMessages.length > 0) {

    //         nextLastId =
    //             newMessages[
    //                 newMessages.length - 1
    //             ].id;

    //     }

    //     pollMessages(nextLastId);
    // };

    // pollMessages();

    // return () => {
    //     active = false;
    // };
    return ()=>{
      socket.off("new-message")
    }

}, [dispatch]);

    return (
        <Container fluid style={{ backgroundColor: "black", padding: 0 }}>
  <Row className="vh-100 flex-column m-0">

    <div
      style={{
        backgroundColor: "antiqueWhite",
        height: "10vh"
      }}
    >
      This is Navigation bar
    </div>

    <div
      style={{
        backgroundColor: "#f2f2f0",
        height: "80vh"
      }}
    >
     <ChatList/>
    </div>

    <div
      style={{
        backgroundColor: "#585a5e",
        height: "10vh",
        width:"100%"
        
      }}
    >
     <ChatForm/>
    </div>

  </Row>
</Container>
    )
}

export default ChatScreen
