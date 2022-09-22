
import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PostList from './PostList'
import AddPostForm from './AddPostForm'
import CreateEmployeeForm from "./CreateEmployeeForm";
import EmployeeList from "./EmployeeList"
import Home from './Home'
import EditPostForm from "./EditPostForm"
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  const [posts, setPosts] = useState([])
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/employees")
      .then(resp => resp.json())
      .then(data => setEmployees(data))
  }, [])

  useEffect(() => {
    fetch("http://localhost:9292/posts")
      .then(resp => resp.json())
      .then(data => setPosts(data))
  }, [])

  function addPost(post) {
    setPosts([...posts, post])
  }

  function addEmployee(emp) {
    setEmployees([...employees, emp])
  }

  function deletePost(post) {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  function editPost(post) {
    const editedPost = posts.find(p => p.id === post.id ? post : p)
    setPosts(editedPost)
  }
  

  return (
    <div>
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">HataBook</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/posts">Project Updates</Nav.Link>
              <Nav.Link href="/posts/new">Add New Post</Nav.Link>
              <Nav.Link href="/employees">All Employees</Nav.Link>    
              <Nav.Link href="/employees/new">Add New Employee</Nav.Link>        
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList posts={posts} employees={employees} editPost={ editPost } deletePost={deletePost} />} />
        <Route path="/posts/new" element={<AddPostForm addPost={addPost}/>} />
        <Route path="/employees/new" element={<CreateEmployeeForm addEmployee={addEmployee}/>} />
        <Route path="/employees" element={<EmployeeList employees={employees}/>} />
        <Route path="/posts/:id/edit" element={<EditPostForm editPost={editPost} setPosts={setPosts} />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
