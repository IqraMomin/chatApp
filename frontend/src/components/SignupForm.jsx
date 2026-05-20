import React, { useState } from 'react'
import {Button, Form} from "react-bootstrap"

function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const loginData = { email, password }
        const isDataValid = isValid(email,password);
        if(isDataValid){
            console.log(loginData);
        }
        
    }
    const isValid = (email, password) => {
        if (email.trim().length === 0) {
            setError("Email is required");
            return false;
        }else if (password.trim().length === 0) {
            setError("Password is required");
            return false;
        }
        return true;
    }

    return (
        <div>
            <h2>Signup</h2>
            {error && <p className='text-danger'>{error}</p>}
            <Form onSubmit={formSubmitHandler}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value);
                            setError("");
                         }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        value={password}
                        onChange={(e) => { 
                            setPassword(e.target.value) ;
                            setError("");
                            }} />
                </Form.Group>
                <Button type="submit">Signup</Button>
                <Button variant='link'>Already a user? Login</Button>
            </Form>
        </div>
    )
}

export default SignupForm
