import React from "react"
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"


function PostList({ posts, deletePost }) {

    const navigate = useNavigate()

    function handleDelete(e) {
        fetch("http://localhost:9292/posts/" + e.target.value, {
            method: "DELETE",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }})
            .then(resp => resp.json())
            .then(data => deletePost(data))
    }

    return(
        <div>
        <Container>
            <h1>Project Updates by Employee:</h1>
            <ul>       
                {posts.map(post => (
                    <Alert key={post.id}>
                        <strong>{post.employee.first_name} {post.employee.last_name}:</strong><br></br>{post.message}<br></br><i>Posted on: {post.updated_at}</i>
                        <br></br>
                        <Button variant="outline-primary" size="sm" value={post.id} onClick={() => navigate(`/posts/${post.id}/edit`)}>Edit post</Button>
                        <Button variant="outline-danger" size="sm" value={post.id} onClick={ handleDelete }> Delete post</Button>
                    </Alert>
                )).reverse()}
            </ul>
        </Container>

        </div>
    )

}

export default PostList
