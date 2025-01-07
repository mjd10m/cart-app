import React, { useRef } from 'react'
import { useMutation } from '@apollo/client'
import {SIGNUP} from '../../../utils/mutations'
import SideBar from './sideBar/index'
import { TextField, Button, Box, FormControl, FormLabel } from '@mui/material';



function AdminPage() {
  return(
    <Box sx={{ display: 'flex' }}>
      <SideBar></SideBar>
      <Box sx={{width: '100%', overflow: 'hidden'}}>
        
      </Box>    
    </Box>
  )
}

export default AdminPage