import React, { useState } from "react"
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CreateEmployeeForm({ addEmployee }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email
        }

        fetch("http://localhost:9292/employees", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(newEmp => {
            addEmployee(newEmp)
            navigate("/employees")
        })

        setFirstName("")
        setLastName("")
        setEmail("")

    }

    return (
        <Container>
        <div>
            <h1>Create Employee Form</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First name" value={ firstName } onChange={e => setFirstName(e.target.value)}/>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last name" value={ lastName } onChange={e => setLastName(e.target.value)}/>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Email Address" value={ email } onChange={e => setEmail(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
        </Container>
    )
}

export default CreateEmployeeForm