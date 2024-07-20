import React from "react";
import { useState,useEffect } from "react";
import Header from "../components/Header";
import { Grid } from "@mui/material";
import SignInImageComponent from "../components/SignInImageComponent";
import SignInMobile from "../components/SigninMob";
import VerifyOpt from "../components/VerifyOpt";
import { useLocation } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function VerifyOtp(){
  const theme=useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));


return(<div>
    <div>
    <Header/>
    </div>
    
  < Grid container spacing={2} style={{marginTop:matches?'125.5px':'65px'}}>

  {!matches?<Grid item xs={7} > 
      <SignInImageComponent/>
      </Grid>:<Grid item xs={12} >
    <VerifyOpt/>
    </Grid>}
   
    {matches?<></>:<Grid item xs={5} >
    <VerifyOpt/>
    </Grid>}

    </Grid>

</div>)
}