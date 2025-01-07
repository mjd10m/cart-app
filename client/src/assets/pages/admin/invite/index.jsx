import React, { useRef } from 'react'
import { useMutation } from '@apollo/client'
import {SIGNUP} from '../../../../utils/mutations'
import SideBar from '../sideBar/index'
import { TextField, Button, Box, FormControl, FormLabel } from '@mui/material';



function AdminInvite() {

  const [sendSignUpEmail, {data: signupData, loading: signupLoading, error: signupError}] = useMutation(SIGNUP);
  const signupEmail = useRef();

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
  return(
    <Box sx={{ display: 'flex' }}>
      <SideBar></SideBar>
      <Box sx={{width: '100%', overflow: 'hidden'}}>
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
      </Box>    
    </Box>
  )
}

export default AdminInvite