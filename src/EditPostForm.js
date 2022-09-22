import React, { useState } from "react"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom'

function EditPostForm({ editPost }) {
    const [message, setMessage] = useState("")
    
    let {id} = useParams()

    function handleSubmit(e) {
        e.preventDefault()

        const data = {
            message: message
        }

        fetch(`http://localhost:9292/posts/${id}/edit`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(data => editPost(data))

        setMessage("")
    }

    return (
        <div>
            <Container>
            <h2>Edit your post:</h2>
            <Form onSubmit={ handleSubmit }>
                <Form.Group className="mb-3" >
                    <Form.Label>Message</Form.Label>
                    <Form.Control type="text" placeholder="Message" value={ message } onChange={e => setMessage(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>

            </Container>
        </div>
    )
}

export default EditPostForm