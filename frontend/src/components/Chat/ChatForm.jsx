import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import socket from '../../socket';
 
function ChatForm() {
    const [message,setMessage] = useState("");
    const user = useSelector(state=>state.auth.user);

    const formSubmitHandler = (e)=>{
        e.preventDefault();
        const roomName = localStorage.getItem("roomName");
        socket.emit("new-message",{userId:user.id,roomName,message});
        setMessage("");

    }

    return (
        <div>
            <Form className='d-flex' onSubmit={formSubmitHandler}>
                <Form.Group controlId='ControlInput1'>
                <Form.Control value={message}
                onChange={(e)=>{setMessage(e.target.value)}}
                style={{width:"700px"
                }}/>
                </Form.Group>
                <Button type="submit" variant='btn-success'>Send</Button>
            </Form>
            
        </div>
    )
}

export default ChatForm
