import React, { useState } from 'react'
import {Button, Form} from "react-bootstrap"
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/slices/authSlice';

function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error,setError] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const signupData = { email, password }
        const isDataValid = isValid(email,password,confirmPassword);
        if(isDataValid){
            console.log(signupData);
            dispatch(signup(signupData));
            resetForm();
        }
        
    }
    const isValid = (email, password,confirmPassword) => {
        if (email.trim().length === 0 || password.trim().length === 0 ||confirmPassword.trim().length === 0) {
            setError("All fields are required");
            return false;
        }else if (confirmPassword !== password) {
            setError("Password mismatch");
            return false;
        }
        return true;
    }
    const resetForm = ()=>{
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
    }

    return (
        <div>
            <h2>Signup</h2>
            {error && <p className='text-danger'>{error}</p>}
            <Form onSubmit={formSubmitHandler} className='d-flex flex-column'>
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password"
                        value={confirmPassword}
                        onChange={(e) => { 
                            setConfirmPassword(e.target.value) ;
                            setError("");
                            }} />
                </Form.Group>
                <Button type="submit">Signup</Button>
                <Button variant='link'
                onClick={()=>{history.push("/login")}}>Already a user? Login</Button>
            </Form>
        </div>
    )
}

export default SignupForm
