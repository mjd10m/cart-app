import React, { useEffect, useState, useRef } from 'react'
import {Container, Row, Col, Form, Spinner} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import {QUERY_CUSTOMERS} from '../../../utils/queries'
import {GET_SIGNED_URLS, SIGNUP} from '../../../utils/mutations'
import TableRecord from '../../components/table-record'
import TableHeader from '../../components/table-header';
import SideBar from './sideBar/index'
import { TextField, Button, Box, FormControl, FormLabel, Table, TableBody, TableContainer, Paper } from '@mui/material';



function AdminPage() {

  const {loading, error, data} = useQuery(QUERY_CUSTOMERS);
  const [getSignedUrl, { data: urlData, loading: urlLoading, error: urlError }] = useMutation(GET_SIGNED_URLS);
  const [sendSignUpEmail, {data: signupData, loading: signupLoading, error: signupError}] = useMutation(SIGNUP);
  const [customers, setCustomers] = useState([]);
  const signupEmail = useRef();

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
    e.preventDefault();
    const fileGroupId = e.target.id;
    const fileNames = customers[fileGroupId].files.map(file => file.filename);
    console.log(fileNames);
    try {
      const {data} = await getSignedUrl({
          variables: { fileName: fileNames },
      });
      console.log("Signed URLs:", data);
      data.getSignedUrls.map((signedUrl, index) => downloadFile(signedUrl,fileNames[index]));
    } catch (err) {
      console.error("Error fetching signed URL:", err);
    }
  }
  if(!loading) {
    console.log(data.listCustomers);
  }

  async function handleSignupEmail(e){
    e.preventDefault();
    console.log(signupEmail.current.value);
    try {
      await sendSignUpEmail({
        variables: {email: signupEmail.current.value}
      });
    } catch (error) {
      console.log(error);
    }    
  }

  useEffect(()=> {
    if(!loading && data?.listCustomers) {
      setCustomers(data.listCustomers);
    }
  },[loading, data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return(
    <Box sx={{ display: 'flex' }}>
      <SideBar></SideBar>
      <Box sx={{width: '100%', overflow: 'hidden'}}>
        <TableContainer component={Paper} sx={{ maxHeight: "100vh", maxWidth:"100vw" }}>
        <Table stickyHeader sx={{minWidth: 650}}>
        <TableHeader></TableHeader>
        <TableBody>
          {customers.map((person, index) => (
            <TableRecord key={index} customerData = {person} handleClick = {handleDownload} index={index}/>
          ))}
        </TableBody>
        </Table>
        </TableContainer>
        <Row className="justify-content-center align-items-center">
        <Box
          component="form"
          noValidate
          onSubmit={handleSignupEmail}
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
        >
          <FormControl
            fullWidth
            sx={{ width: { xs: '100%', md: '33.33%' }, textAlign: 'center', mb: 3 }}
          >
            <FormLabel sx={{color: 'black'}} htmlFor="signupEmail">Invite User</FormLabel>
            <TextField
              type="text"
              name="signupEmail"
              id="signupEmail"
              inputRef={signupEmail}
              variant="outlined"
              margin="normal"
            />
          </FormControl>
          <Button type="submit" variant="contained" sx={{marginBottom:'50px'}}>
            Send Link
          </Button>
        </Box>
      </Row>
    </Box>    
  </Box>
    
  )
}

export default AdminPage