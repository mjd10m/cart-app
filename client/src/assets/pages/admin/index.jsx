import React, { useEffect, useState } from 'react'
import {Container, Row, Col, Button, Form, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {QUERY_CUSTOMERS} from '../../../utils/queries'
import Topbar from '../../components/topbar';
import TableRecord from '../../components/table-record'

function AdminPage() {

    const {loading, error, data} = useQuery(QUERY_CUSTOMERS)
    
    if(!loading) {
        console.log(data.listCustomers)
    }
    const [customers, setCustomers] = useState([])
    useEffect(()=> {
        if(!loading && data?.listCustomers) {
            setCustomers(data.listCustomers)
        }
    },[loading, data])
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

    return(
        <Container>
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Transaction ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>DOB</th>
                    <th>Address 1</th>
                    <th>Address 2</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th># Passengers</th>
                    <th>Color</th>
                    <th>Plate Option</th>
                    <th>Plate Type</th>
                    <th>Plate Num</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((person, index) => (
                    <TableRecord key={index} customerData = {person}/>
                ))}
            </tbody>
            </Table>
        </Container>
    )
}

export default AdminPage