import React, { useState } from 'react'
import { Form ,Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");
    const history = useHistory();

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
            <h2>Login</h2>
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
                <Button type="submit">LOGIN</Button>
                <Button variant='link'
                onChange={history.push("/signup")}>Create New Account</Button>
            </Form>
        </div>
    )

}

export default LoginForm
