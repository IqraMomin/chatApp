import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import socket from '../../socket';
import { getSuggestions, uploadMedia } from '../../redux/slices/messageSlice';

function ChatForm() {
    const [message, setMessage] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [file, setFile] = useState(null);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleChange = async (e) => {
        setMessage(e.target.value);
            const result = await dispatch(getSuggestions(message));
            const data = result.payload.suggestions;
            setSuggestions(data);           

    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const roomName = localStorage.getItem("roomName");
        let mediaUrl = null;
        if (file) {
            const result = await dispatch(uploadMedia(file));
            mediaUrl = result.payload.fileUrl;
        }
        socket.emit("new-message", {
            userId: user.id, roomName, message: {
                mediaUrl, text: message
            }
        });
        setMessage("");
        setFile(null);

    }

    return (
        <div>
            <div className='d-flex gap-2'>
                {suggestions.map(ele=><p>{ele}</p>)}
            </div>
            <Form className='d-flex' onSubmit={formSubmitHandler}>
                <Form.Group controlId='ControlInput1'>
                    <Form.Control type='text'
                        value={message}
                        onChange={handleChange}
                        style={{
                            width: "700px"
                        }} />
                </Form.Group>
                <Form.Group controlId='ConrolInput2'>
                    <Form.Control type='file'
                        onChange={(e) => { setFile(e.target.files[0]) }} />
                </Form.Group>
                <Button type="submit" variant='btn-success'>Send</Button>
            </Form>

        </div>
    )
}

export default ChatForm
