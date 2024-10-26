import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



export default function AddUser() {

	const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [mobileNo,setMobileNo] = useState(0);
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(false);
	

	const navigate = useNavigate();

	useEffect(() =>{
        setIsActive((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)) 
    }, [firstName,lastName,email,mobileNo,password,confirmPassword]);
	

    async function registerUser(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');

    try {
        
        const response = await  fetch('http://localhost:4000/profiles/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`  
                // Include the token in the headers
            },
            body: JSON.stringify({
                firstName: firstName.toUpperCase(),
                lastName: lastName.toUpperCase(),
                email: email,
                mobileNo: mobileNo,
                password:password
            })
        })
       
        const data = await response.json();

        if (response.ok) {
            alert("User registered successfully");
            navigate('/me');
        }   else {
                alert(data.message || 'Error adding user');
            }
        } catch (error) {
          console.error('Error registering user:', error);
          alert('An error occurred. Please try again.');
        }
    };

    return (
    	<div>
    	    <Button
                variant="secondary"
                className="mt-3"
                onClick={() => navigate('/me')}
            >
                Back to Profile
            </Button>
         <Form onSubmit={(e) => registerUser(e)}>
        <h1 className="my-5 text-center">Register</h1>
            <Form.Group>
                <Form.Label>First Name:</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter First Name" 
                    required 
                    value={firstName}
                    onChange={e => {setFirstName(e.target.value)}}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Last Name:</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter Last Name" 
                    required  
                    value={lastName}
                    onChange={e => {setLastName(e.target.value)}}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter Email" 
                    required 
                    value={email}
                    onChange={e => {setEmail(e.target.value)}}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Mobile No:</Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="Enter 11 Digit No." 
                    required  
                    value={mobileNo}
                    onChange={e => {setMobileNo(e.target.value)}}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter Password" 
                    required 
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    required 
                    value={confirmPassword}
                    onChange={e => {setConfirmPassword(e.target.value)}}
                />
            </Form.Group>
                <div className="text-center mt-4">
                  <Button variant={isActive ? "primary" : "danger"} type="submit" disabled={!isActive}>
                    Register
                  </Button>
                </div>
        </Form>
        </div>
    )
}