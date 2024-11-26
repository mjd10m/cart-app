import React, { useState } from 'react'
import {Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import {ADD_CUSTOMER, UPLOAD_FILE} from '../../../utils/mutations'
import Topbar from '../../components/topbar';
import CartPicInput from '../../components/cart-pic-input';


function CustomerPics({formData, totalPrice }) {
  const [uploadFiles, setUploadFiles] = useState({
    frontRight:null,
    frontLeft:null,
    backRight:null,
    backLeft:null,
    dl:null,
    dotStamp:null,
    vinPlate: null,
    invoice: null,
    receipt: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploadStatus, setFileUploadStatus] = useState(
    {
      fileCount: 1,
      fileName: "",
      totalCount: 0
    }
  );
  const [addCustomer] = useMutation(ADD_CUSTOMER);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  console.log(formData);
  console.log(uploadFiles);

  function renameFile(file, newFileName) {
    return new File([file], newFileName, {
      type: file.type,
      lastModified: file.lastModified
    });
  }

  function getTotalFileCount (uploadFiles){
    let fileCount = 0
    for (const [key, value] of Object.entries(uploadFiles)) {
      if (value !== null) {
        if (key === "receipt") {
          fileCount = fileCount + value.length;
        }
        else {
          fileCount ++;
        }
      }
    }
    console.log("Total File Count" + fileCount);
    return fileCount
  }
  
  const handleFileChange = (e) => {
    const {name, files} = e.target 
    if(name === "receipt") {
      let receiptFileArray = []
      Array.from(files).forEach(file => {
        receiptFileArray.push(file)
      });
      console.log(receiptFileArray)
      setUploadFiles(prevFiles => ({
        ...prevFiles,
        receipt: receiptFileArray
      }));
    }
    else {
      setUploadFiles(prevFiles =>({
        ...prevFiles,
        [name]: files[0]
      }));
    }
  }
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const totalCount = getTotalFileCount(uploadFiles);
    setFileUploadStatus(prevState => ({
      ...prevState,
      totalCount: totalCount
    }));
    let fileArray = [];
    for (const [key, value] of Object.entries(uploadFiles)) {
      if (value !== null) {
        if (key === "receipt") {
          for (let i = 0; i < value.length; i++) {
            console.log(value[i].name);
            const renamedFile = renameFile(value[i], formData.transactionId + key + i);
            fileArray.push(renamedFile);
            setFileUploadStatus(prevState => ({
              ...prevState,
              fileName: value[i].name
            }));
            // Await the uploadFile to ensure it's finished before continuing
            await uploadFile({
                variables: { files: [renamedFile], transactionId: formData.transactionId }
            });
            setFileUploadStatus(prevState => ({
                ...prevState,
                fileCount: prevState.fileCount + 1
            }));
          }
        } else {
          console.log(value.name)
          const renamedFile = renameFile(value, formData.transactionId + key);
          fileArray.push(renamedFile);
          setFileUploadStatus(prevState => ({
            ...prevState,
            fileName: value.name
          }));
          // Await the uploadFile to ensure it's finished before continuing
          await uploadFile({
            variables: { files: [renamedFile], transactionId: formData.transactionId }
          });
          setFileUploadStatus(prevState => ({
            ...prevState,
            fileCount: prevState.fileCount + 1
          }));
        }   
      }
    }
    console.log(fileArray)
    console.log(formData.transactionId)
    try {
      const {data} = await addCustomer({
        variables: {...formData},
      })
      console.log(data)
      setIsLoading(false)
      navigate('/summary')
    } catch (error) {
      const errorMessage = error.message
      console.log(errorMessage)
    }
  }
  return(
    <Container>
      <Topbar totalPrice = {totalPrice}/>
      {isLoading ? (<>
        <Row className="mb-5 text-center">
          <Col xs={12} className='mb-5'>
            <h2 className="mb-3">Please wait while your documents are uploaded</h2>
            <p>This may take a few minutes depending on your internet connection</p>
          </Col>
          <Col xs={12}>
            <Spinner as="span" animation="border" size="md" role="status" aria-hidden="true"/>  
          </Col>
          <Col xs={12}>
            <h4>Uploading {fileUploadStatus.fileName} </h4>
          </Col>
          <Col xs={12}>
            <h4>({fileUploadStatus.fileCount}/{fileUploadStatus.totalCount}) </h4>
          </Col>
        </Row>
        </>):(
        <>
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
            <CartPicInput id="frontRight" label="Front Right" handleFileChange = {handleFileChange}/>
            <CartPicInput id="frontLeft" label="Front Left" handleFileChange = {handleFileChange}/>
          </Row>
          <Row className="mb-3">
            <CartPicInput id="backRight" label="Back Right" handleFileChange = {handleFileChange}/>
            <CartPicInput id="baclLeft" label="Back Left" handleFileChange = {handleFileChange}/>
          </Row>
          <Row className="mb-3">
            <CartPicInput id="dotStamp" label="DOT Stamp" handleFileChange = {handleFileChange}/>
            <CartPicInput id="vinPlate" label="VIN Plate" handleFileChange = {handleFileChange}/>
          </Row>
          <Row className="mb-3">
            <CartPicInput id="dl" label="Drivers License" handleFileChange = {handleFileChange}/>
            <CartPicInput id="invoice" label="Invoice/Bill of Sale" handleFileChange = {handleFileChange}/>
          </Row>
          <Row className='mb-4'>
            <CartPicInput id="receipt" label="Additional Receipts for DOT Parts" handleFileChange = {handleFileChange} multi={true}/>
          </Row>
          <Row className="justify-content-center mb-3">
            <Col xs="2" className='text-center'>
              <Button className='button w-auto' type="submit"disabled={isLoading}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        <div style={{ height: '50px' }}></div> {/* Spacer */}
        </>
      )}
    </Container>
  )
}

export default CustomerPics