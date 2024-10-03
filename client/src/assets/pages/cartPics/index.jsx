import React, { useState } from 'react'
import {Container, Row, Col, Button, Form } from 'react-bootstrap';
import Logo from '../../components/logo'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import {ADD_CUSTOMER, UPLOAD_FILE} from '../../../utils/mutations'
import Topbar from '../../components/topbar';


function CustomerPics({formData, setFormData }) {
    const [uploadFiles, setUploadFiles] = useState({
        frontRight:null,
        frontLeft:null,
        backRight:null,
        backLeft:null,
        dl:null,
        dotStamp:null,
        vinPlate: null,
        invoice: null,
        receipt: null
    })
    console.log(formData)
    function renameFile(file, newFileName) {
        return new File([file], newFileName, {
            type: file.type,
            lastModified: file.lastModified
        })
    }
    const [addCustomer] = useMutation(ADD_CUSTOMER)
    const [uploadFile] = useMutation(UPLOAD_FILE)
    const handleFileChange = (e) => {
        const {name, files} = e.target
        setUploadFiles(prevFiles =>({
            ...prevFiles,
            [name]: files[0]
        }))
        console.log(files[0].name)
        console.log(uploadFiles)
    }
    const navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        let fileArray = []
        await Promise.all(
            Object.entries(uploadFiles).map(([key,value]) => {
                if(value !== null) {
                    const renamedFile = renameFile(value, formData.transactionId + key)
                    fileArray.push(renamedFile)
                }
            })
        )
        console.log(fileArray)
        console.log(formData.transactionId)
        try {
            const upload = await uploadFile({
                variables: {files: fileArray, transactionId: formData.transactionId}
            })
            console.log(upload)
        } catch (error) {
            const errorMessage = error.message
            console.log(errorMessage)
        }
        try {
            const {data} = await addCustomer({
                variables: {...formData},
            })
            console.log(data)
            navigate('/summary')
        } catch (error) {
            const errorMessage = error.message
            console.log(errorMessage)
        }
    }
    return(
        <Container>
            <Topbar/>
            <Row className="mb-5 text-center">
                <Col xs={12}>
                    <h2 className="mb-3">Please upload the required images as indicated below</h2>
                    <p className="lead mb-2">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        Click here
                    </a>{' '}to view sample images of the required pictures
                    </p>
                </Col>
            </Row>
            
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} xs ={6} controlId="frontRight">
                    <Form.Label>Front Right </Form.Label>
                    <Form.Control type="file" name="frontRight" onChange={handleFileChange}/>
                    </Form.Group>
                    <Form.Group as={Col} xs ={6} controlId="frontLeft">
                    <Form.Label>Front Left</Form.Label>
                    <Form.Control type="file" name="frontLeft" onChange={handleFileChange}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} xs ={6} controlId="backRight">
                    <Form.Label>Back Right</Form.Label>
                    <Form.Control type="file" name="backRight" onChange={handleFileChange}/>
                    </Form.Group>
                    <Form.Group as={Col} xs ={6} controlId="backLeft">
                    <Form.Label>Back Left</Form.Label>
                    <Form.Control type="file" name="backLeft" onChange={handleFileChange}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} xs ={6} controlId="dotStamp">
                    <Form.Label>DOT Stamp</Form.Label>
                    <Form.Control type="file" name="dotStamp" onChange={handleFileChange}/>
                    </Form.Group>
                    <Form.Group as={Col} xs ={6} controlId="vinPlate">
                    <Form.Label>VIN Plate</Form.Label>
                    <Form.Control type="file" name="vinPlate" onChange={handleFileChange}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} xs ={6} controlId="dl">
                    <Form.Label>Drivers License</Form.Label>
                    <Form.Control type="file" name="dl" onChange={handleFileChange}/>
                    </Form.Group>
                    <Form.Group as={Col} xs ={6} controlId="invoice">
                    <Form.Label>Invoice/Bill of Sale</Form.Label>
                    <Form.Control type="file" name="vinPlate" onChange={handleFileChange}/>
                    </Form.Group>
                </Row>
                <Row className='mb-3'>
                    <Form.Group as={Col} xs ={6} controlId="receipt">
                    <Form.Label>Receipts for DOT parts</Form.Label>
                    <Form.Control type="file" name="receipt" onChange={handleFileChange}/>
                    </Form.Group>
                </Row>
                <Row className="justify-content-center mb-3">
                    <Col xs="2" className='text-center'>
                        <Button className='button w-100' type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
            <div style={{ height: '50px' }}></div> {/* Spacer */}
        </Container>
    )
}

export default CustomerPics