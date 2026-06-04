import React from 'react'
import { Form } from 'react-bootstrap'
import socket from '../../socket';
import { useDispatch } from 'react-redux';
import { checkUser } from '../../redux/slices/authSlice';

function SearchBar() {
    const dispatch = useDispatch();

    const searchHandler = async(e)=>{
        e.preventDefault();
        const myEmail = localStorage.getItem("email");
        const email = e.target.search.value;
        const result =await dispatch(checkUser(email));
        const targetEmail = result.payload.user.email;
        const roomName = [myEmail,targetEmail].sort().join("-");
        localStorage.setItem("roomName",roomName);
        socket.emit("join-room",roomName);
        alert("Room joined "+roomName);

    }

    return (
        <div>
            <Form onSubmit={searchHandler}>
                <Form.Control placeholder='Enter Room Name...' name='search'/>
            </Form>
            
        </div>
    )
}

export default SearchBar
