import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
// import { useNavigate } from 'react-router-dom'


function AddPostForm({ addPost }) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [message, setMessage] = useState("")

    // const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        const data = {
                first_name: firstName,
                last_name: lastName,
                message: message,
        }

        fetch("http://localhost:9292/posts", {
            method: "POST", 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(newPost => {
            addPost(newPost)
            
        })

        setFirstName("")
        setLastName("")
        setMessage("")
        // navigate("/posts")
    }

    return (
        <div>
            <Container>
                <h2>Add a new post here:</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First name" value={ firstName } onChange={e => setFirstName(e.target.value)}/>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last name" value={ lastName } onChange={e => setLastName(e.target.value)}/>
                        <Form.Label>Message</Form.Label>
                        <Form.Control type="text" placeholder="Message" value={ message } onChange={e => setMessage(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Container>


        </div>
    )
}

export default AddPostForm;