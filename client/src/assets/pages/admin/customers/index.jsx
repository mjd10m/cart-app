import React, { useEffect, useState, useRef } from 'react'
import {Container, Row, Col, Form, Spinner} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import {QUERY_CUSTOMERS} from '../../../../utils/queries'
import {GET_SIGNED_URLS, SIGNUP, UPDATE_CUSTOMER, ADD_NOTE} from '../../../../utils/mutations'
import TableRecord from '../../../components/table-record'
import TableHeader from '../../../components/table-header';
import SideBar from '../sideBar/index'
import {Box,Table, TableBody, TableContainer, Paper, Dialog, DialogContent, DialogActions, DialogTitle, Button} from '@mui/material';
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
import { convertDate } from '../../../../utils/helper';
import {
  Modal,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";



function AdminCustomers() {
  const {loading, error, data, refetch} = useQuery(QUERY_CUSTOMERS);
  const [getSignedUrl, { data: urlData, loading: urlLoading, error: urlError }] = useMutation(GET_SIGNED_URLS);
  const [updateCustomer, { data: customerData, loading: customerLoading, error: customerError }] = useMutation(UPDATE_CUSTOMER);
  const [addNote, { data: noteData, loading: noteLoading, error: noteError }] = useMutation(ADD_NOTE);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [modalNotes, setModalNotes] = useState([])
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

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
  function handleViewDetails(id) {
    const customer = customers[id];
    console.log("Viewing details for:", customer);
    setModalNotes(customer.notes)
    setSelectedCustomer(customer)
    setIsModalOpen(true);
  }
  async function handleFieldUpdate(newRow, oldRow) {
    console.log('Processing update:', { newRow, oldRow });
    const updatedRows = customers.map((customer) =>
      customer.transactionId === newRow.transactionId ? { ...customer, ...newRow } : customer
    );
    setCustomers(updatedRows);
    console.log('After Update:', customers);
    try {
      const {data} = await updateCustomer({
          variables: {...newRow },
      });
      console.log("New Customer", data);
    } catch (err) {
      console.error("Error posting customer update", err);
    }
    return newRow; 
  }
  if(!loading) {
    console.log(data.listCustomers);
  }
  async function handleAddNote(){
    try {
      const {data} = await addNote({
        variables: {
          transactionId: selectedCustomer.transactionId,
          noteText: newNote
        }
      })
      console.log(data) 
      setModalNotes((prevNotes) => {
        const updatedNotes = [...prevNotes, data.addNote];
        console.log("Updated Notes:", updatedNotes); // Logs updated state
        return updatedNotes;
      });
    } catch (error) {
      console.log("Error adding note" + error)
    }
    setNewNote("")
  }
  const handleEditNote = (index) => {
    console.log(selectedCustomer.notes)
    setEditingIndex(index);
    setEditingText(selectedCustomer.notes[index].noteText);
  };

  useEffect(()=> {
    if(!loading && data?.listCustomers) {
      setCustomers(data.listCustomers);
    }
  },[loading, data, isModalOpen]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;
  
  function createRows(customer) {
    let tableArray = []
    customer.map((person, index) => {
      const row = {
        id: index,
        status: person.status,
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
      field: 'status',
      headerName: 'Status',
      width: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: ["New", "Pending Payment/POA", "In Process", "Completed"],
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
      editable: true,
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
      editable: true,
      type: "singleSelect",
      valueOptions: ["2", "4", "6", "8"],
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
      editable: true,
      type: "singleSelect",
      valueOptions: ["newPlate", "plateTransfer", "specPlate", "perPlate","perSpecPlate"],
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
        processRowUpdate={handleFieldUpdate} 
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
      </Box>
      {/* Modal */}
        <Modal open={isModalOpen} onClose={() => {setIsModalOpen(false); refetch()}}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "75%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Notes</Typography>
          {modalNotes?.length > 0 ?(
          <List>
            {modalNotes.map((note, index) => (
              <ListItem key={index}>
                {editingIndex === index ? (
                  <TextField
                  id={note._id}
                    fullWidth
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <ListItemText primary={note.noteText} />
                )}
                <IconButton onClick={() => handleEditNote(index)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={console.log("Click")}>
                  <Delete />
                </IconButton>
                {editingIndex === index && (
                  <Button onClick={console.log("Click")}>Save</Button>
                )}
              </ListItem>
            ))}
          </List>
          ) :(<div></div>)}
          <TextField
            fullWidth
            label="Add a note"
            variant="outlined"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={() => handleAddNote()} sx={{ mt: 2 }}>
            Add Note
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}

export default AdminCustomers
