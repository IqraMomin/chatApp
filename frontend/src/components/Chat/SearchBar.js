import React from 'react'
import { Form } from 'react-bootstrap'
import socket from '../../socket';

function SearchBar() {
    const searchHandler = (e)=>{
        e.preventDefault();
        const email = e.target.value;
        socket.emit("join-room",email);
        alert("Room joined "+email);

    }

    return (
        <div>
            <Form onSubmit={searchHandler}>
                <Form.Control placeholder='Enter Room Name...'/>
            </Form>
            
        </div>
    )
}

export default SearchBar
