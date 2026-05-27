import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import { sendMessage } from '../../redux/slices/messageSlice';
 
function ChatForm() {
    const [message,setMessage] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(state=>state.auth.user);

    const formSubmitHandler = (e)=>{
        e.preventDefault();
        dispatch(sendMessage({userId:user.userId,message}));
        setMessage("");

    }

    return (
        <div>
            <Form className='d-flex' onSubmit={formSubmitHandler}>
                <Form.Group controlId='ControlInput1'>
                <Form.Control value={message}
                onChange={(e)=>{setMessage(e.target.value)}}/>
                </Form.Group>
                <Button type="submit" variant='btn-success'>Send</Button>
            </Form>
            
        </div>
    )
}

export default ChatForm
