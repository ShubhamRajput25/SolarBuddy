import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import { Grid } from "@mui/material";
import SignInImageComponent from "../components/SignInImageComponent";
import SignInMobile from "../components/SigninMob";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function SignIn(){
const theme=useTheme();
    const matches1=useMediaQuery(theme.breakpoints.down('md'))
    const matches2=useMediaQuery(theme.breakpoints.down('sm'))
    const matches3=useMediaQuery(theme.breakpoints.down(450))

return(<div>
    <div>
    <Header/>
    </div>
  < Grid container spacing={2} style={{marginTop:matches1?'125.5px':'65px'}} >

  {!matches1?<Grid item xs={7} > 
      <SignInImageComponent/>
      </Grid>:<Grid item xs={12} >
    <SignInMobile/>
    </Grid>}
   
    {matches1?<></>:<Grid item xs={5} >
    <SignInMobile/>
    </Grid>}
   

     

    </Grid>


</div>)
}