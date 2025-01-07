import React, { useEffect, useState, useRef } from 'react'
import {Container, Row, Col, Form, Spinner} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import {QUERY_CUSTOMERS} from '../../../../utils/queries'
import {GET_SIGNED_URLS, SIGNUP} from '../../../../utils/mutations'
import TableRecord from '../../../components/table-record'
import TableHeader from '../../../components/table-header';
import SideBar from '../sideBar/index'
import {Box,Table, TableBody, TableContainer, Paper } from '@mui/material';
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
import { convertDate } from '../../../../utils/helper';



function AdminCustomers() {
  const {loading, error, data} = useQuery(QUERY_CUSTOMERS);
  const [getSignedUrl, { data: urlData, loading: urlLoading, error: urlError }] = useMutation(GET_SIGNED_URLS);
  const [customers, setCustomers] = useState([]);

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

  useEffect(()=> {
    if(!loading && data?.listCustomers) {
      setCustomers(data.listCustomers);
    }
  },[loading, data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;
  
  function createRows(customer) {
    let tableArray = []
    customer.map((person, index) => {
      const row = {
        id: index,
        transactionId: person.transactionId,    
        firstName: person.firstName,
        lastName: person.lastName,
        dob: convertDate(person.dob),
        addr1: person.addr1,
        addr2: person.addr2,
        city: person.city,
        state: person.state,
        zip: person.zip,
        email: person.email,
        phone: person.phone,
        cartSize: person.cartSize,
        cartColor: person.cartColor,
        plate: person.plate,
        plateNum: person.plateNum,
        plateType: person.plateType,
        dealerName: person.dealerName,
        createdAt: convertDate(person.createdAt)
      };
      tableArray.push(row)
    })
    return tableArray
  }

  const rows = createRows(customers);
  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', flexDirection: 'column', height:'100%' }}>
          <button
            id={params.id}
            onClick={handleDownload}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height:'50%'
            }}
          >
            Download
          </button>
          <button
            onClick={() => handleViewDetails(params.id)}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height:'50%'
            }}
          >
            View Details
          </button>
        </div>
      ),
    },
    {
      field: 'transactionId',
      headerName: 'Transaction ID',
      width: 120,
      editable: true,
    },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 150,
      editable: true,
    },
    {
      field: 'dob',
      headerName: 'Date of Birth',
      width: 110,
      editable: true
    },
    {
      field: 'addr1',
      headerName: 'Address 1',
      width: 200,
      editable: true
    },
    {
      field: 'addr2',
      headerName: 'Address 2',
      width: 200,
      editable: true
    },
    {
      field: 'city',
      headerName: 'City',
      width: 200,
      editable: true
    },
    {
      field: 'state',
      headerName: 'State',
      width: 60,
      editable: true
    },
    {
      field: 'zip',
      headerName: 'Zip Code',
      width: 80,
      editable: true
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: true
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      width: 200,
      editable: true
    },
    {
      field: 'cartSize',
      headerName: 'Passengers',
      width: 94,
      editable: true
    },
    {
      field: 'cartColor',
      headerName: 'Cart Color',
      width: 100,
      editable: true
    },
    {
      field: 'plate',
      headerName: 'Plate',
      width: 130,
      editable: true
    },
    {
      field: 'plateNum',
      headerName: 'Plate Number',
      width: 110,
      editable: true
    },
    {
      field: 'plateType',
      headerName: 'Plate Type',
      width: 100,
      editable: true
    },
    {
      field: 'dealerName',
      headerName: 'Dealer Name',
      width: 200,
      editable: true
    },
    {
      field: 'createdAt',
      headerName: 'Submitted On',
      width: 110,
      editable: true
    }
    
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar></SideBar>
      <Box sx={{width: '100%', overflow: 'hidden'}} component={Paper}>
        <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
      </Box>
    </Box>
  )
}

export default AdminCustomers
