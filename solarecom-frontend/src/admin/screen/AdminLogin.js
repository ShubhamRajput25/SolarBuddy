import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postData } from '../../services/fetchnodeservices';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://sandeepsappal.in/">
        PS-SOFTECH,Gwalior
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminLogin() {  
    const [emailId,setEmailId]=useState('')
    const [password,setPassword]=useState('')
    const navigate = useNavigate()

  const handleSubmit = async (event) => {
    
   var body = {emailid:emailId,password:password}
   var result = await postData('admin/check_admin_password',body)

   if(result.status){
    const {password,...userData}=result.data
    localStorage.setItem('ADMIN',JSON.stringify(userData))
    window.localStorage.setItem('AdminToken',result.token)
    console.log("aaaaaaaaaaa",localStorage.getItem('ADMIN'))
    navigate('/admindashboards')
  }else{
    Swal.fire({ 
      icon: "error",
      title: "Login ",
      text: result.message,
      toast:true
    });
  }
  };

  return (
   
      <Container component="main" maxWidth="xs">
      
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setEmailId(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
           
         
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}