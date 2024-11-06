import React, { useState } from 'react'
import {Container, Row, Col, Button, Form, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {QUERY_CUSTOMERS} from '../../../utils/queries'
import Topbar from '../../components/topbar';

function AdminPage() {

    const {loading, error, data} = useQuery(QUERY_CUSTOMERS)
    
    if(!loading) {
        console.log(data.listCustomers[0])
    }
    

    const [customers, setCustomers] = useState(
        {_id: "66e611be48d999dec6736cac",
            transactionId:"9424348195",
            firstName:"mason",
            lastName:"wasdon",
            dob:"1994-06-20T00:00:00.000Z",
            addr1:"1234 Street Rd",
            addr2:"",
            city:"Val",
            state:"FL",
            zip:"33421",
            email:"mwasdon@email.com",
            phone:"9381234",
            cartSize:"2",
            cartColor:"Red",
            plate:"newPlate",
            plateNum:"",
            plateType:""
        }
    )
    function CustomerRow({ customer, id }) {
        return (
            <td id={id}>{customer[id]}</td>
        );
    }

    return(
        <Container>
            {loading ? (
                <div>Loading...</div>
            ):(
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
                    <tr>
                        <CustomerRow customer={data.listCustomers[0]} id="transactionId" />
                        <CustomerRow customer={data.listCustomers[0]} id='firstName'></CustomerRow>
                        <CustomerRow customer={data.listCustomers[0]} id='lastName'>John</CustomerRow>
                        <CustomerRow customer={data.listCustomers[0]} id='dob'>1</CustomerRow>
                        <CustomerRow customer={data.listCustomers[0]} id='addr1'>John</CustomerRow>
                        <CustomerRow customer={data.listCustomers[0]} id='addr2'>John</CustomerRow>
                        <CustomerRow customer={data.listCustomers[0]} id='city'>1</CustomerRow>
                        <CustomerRow customer={data.listCustomers[0]} id='state'>John</CustomerRow>
                        <CustomerRow customer={data.listCustomers[0]} id='zip'>John</CustomerRow>
                        <CustomerRow customer={data.listCustomers[0]} id='email'>1</CustomerRow>
                        <CustomerRow customer={data.listCustomers[0]} id='phone'>John</CustomerRow>
                        <CustomerRow customer={data.listCustomers[0]} id='cartSize'>John</CustomerRow>
                        <CustomerRow customer={data.listCustomers[0]} id='cartColor'>John</CustomerRow>
                        <CustomerRow customer={data.listCustomers[0]} id='plate'>John</CustomerRow>
                        <CustomerRow customer={data.listCustomers[0]} id='plateNum'>John</CustomerRow>
                        <CustomerRow customer={data.listCustomers[0]} id='plateType'>John</CustomerRow>
                        <td style={{ background: 'none', border: 'none', padding: '0', margin: '0' }}>
                            <Button>
                                Download
                            </Button>
                        </td>
                    </tr>
                </tbody>
                </Table>
            )}
        </Container>
    )
}

export default AdminPage