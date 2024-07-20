import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import { Grid } from "@mui/material";
import SignInImageComponent from "../components/SignInImageComponent";
import NotRagistered from "../components/NotRagistered";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useLocation } from "react-router-dom";

export default function NotVerified(){
  const theme=useTheme();
const matches = useMediaQuery(theme.breakpoints.down('md'));
var location=useLocation()
var mobileno=location.state.mobileno 
var getotp=location.state.otp

return(<div>
    <div>
    <Header/>
    </div>
  < Grid container spacing={2} style={{marginTop:matches?'125.5px':'65px',marginBottom:'10%'}}>

  {!matches?<Grid item xs={7} > 
      <SignInImageComponent/>
      </Grid>:<Grid item xs={12} style={{display:'flex',justifyContent:'center'}} >
    <NotRagistered mobileno={mobileno} otp={getotp}/>
    </Grid>}
   
    {matches?<></>:<Grid item xs={5} >
    <NotRagistered mobileno={mobileno} otp={getotp}/>
    </Grid>}
  </Grid>

</div>)
}