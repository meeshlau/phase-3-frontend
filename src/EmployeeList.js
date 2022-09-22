import React from "react"
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function EmployeeList({ employees }) {

    return (
        <div>
        <Container>
            <h1>Y. Hata Employees:</h1>
            <ul>
                {employees.map(emp => (
                    <Alert key={emp.id}>{emp.first_name} {emp.last_name} <br></br>Email: {emp.email}</Alert>
                ))} 
            </ul>
           
        </Container>
        </div>
    )
}

export default EmployeeList