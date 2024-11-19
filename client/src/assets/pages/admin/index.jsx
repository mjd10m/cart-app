import React, { useEffect, useState, useRef } from 'react'
import {Container, Row, Col, Button, Form, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import {QUERY_CUSTOMERS} from '../../../utils/queries'
import {GET_SIGNED_URLS} from '../../../utils/mutations'
import Topbar from '../../components/topbar';
import TableRecord from '../../components/table-record'

function AdminPage() {

    const {loading, error, data} = useQuery(QUERY_CUSTOMERS)
    const [getSignedUrl, { data: urlData, loading: urlLoading, error: urlError }] = useMutation(GET_SIGNED_URLS);
    const signupEmail = useRef()

    async function downloadFile(signedUrl, fileName) {
        try {
            const response = await fetch(signedUrl);
            if (!response.ok) throw new Error("Failed to fetch file");
    
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
    
            // Create a download link
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = fileName;  // Set the download file name to the original name
            document.body.appendChild(link); // Append link to the body (required for clicking)
    
            // Trigger the download by clicking the link
            link.click();
    
            // Clean up after download
            window.URL.revokeObjectURL(blobUrl);  // Free up memory by revoking the object URL
            document.body.removeChild(link); // Remove link from the DOM
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    }

    async function handleDownload(e){
        e.preventDefault()
        const fileGroupId = e.target.id
        const fileNames = customers[fileGroupId].files.map(file => file.filename)
        console.log(fileNames)
        try {
            const {data} = await getSignedUrl({
              variables: { fileName: fileNames },
            });
            console.log("Signed URLs:", data);
            data.getSignedUrls.map((signedUrl, index) => downloadFile(signedUrl,fileNames[index]))

          } catch (err) {
            console.error("Error fetching signed URL:", err);
          }
    }
    if(!loading) {
        console.log(data.listCustomers)
    }
    function handleSignupEmail(e){
        e.preventDefault()
        console.log(signupEmail.current.value)
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
            <Table className='mb-3' striped bordered hover responsive>
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
                    <TableRecord key={index} customerData = {person} handleClick = {handleDownload} index={index}/>
                ))}
            </tbody>
            </Table>
            <Row className="justify-content-center align-items-center">
                <Form noValidate onSubmit={handleSignupEmail} className="d-flex flex-column align-items-center w-100">
                    <Form.Group as={Col} xs={12} md={4} controlId="signupEmail" className="text-center mb-3" >
                        <Form.Label>Invite User</Form.Label>
                        <Form.Control type="text" name="signupEmail" ref = {signupEmail} />
                    </Form.Group>
                    <Button type='submit'>Send Link</Button>
                </Form>
            </Row>
            
        </Container>
    )
}

export default AdminPage