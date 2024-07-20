import React from "react";
import { useState } from "react";
import { MuiTelInput } from 'mui-tel-input'
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { postData } from "../../services/fetchnodeservices";
import { useDispatch } from "react-redux";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function SignInMobile(){

  const theme=useTheme();
    const matches1=useMediaQuery(theme.breakpoints.down('md'))
    const matches2=useMediaQuery(theme.breakpoints.down('sm'))
    const matches3=useMediaQuery(theme.breakpoints.down(450))

const [mobileno, setMobileno] = useState('+91')
const navigate=useNavigate()
var dispatch=useDispatch()
const handleChange = (newValue) => {
    setMobileno(newValue)
}

  const handleOpt = async() => {
      var otp=parseInt(Math.random()*8999)+1000
      alert(otp)
      alert("Mobile:"+mobileno)
      var result=await postData('userinterface/check_user_mobileno',{mobileno:mobileno})
      if(result.status){
      navigate("/verifyotp",{state:{mobileno:mobileno,otp:otp,userdata:result.data}})
      // var temp=JSON.Object(result.data)
      // console.log("josn wala data",result.data)
      localStorage.setItem('USER',JSON.stringify(result.data))
      dispatch({type:'ADD_USER',payload:[result.data.mobileno,result.data]})
      }
      else
      navigate("/notverified",{state:{mobileno:mobileno,otp:otp,userdata:result.data}})
     
  }

 

return(<div style={{display:'flex',width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
     <div style={{display:'flex',flexDirection:'column',width:matches3?'100%':'55%',height:'',background:'#fff',borderRadius:'32px',padding:'64px 32px 0',boxShadow:matches3?'':'0px 0px 15px 3px rgba(0, 0, 0, .05)',position: 'relative'}}>
         

        <div>
          <div style={{fontFamily:'JioType, helvetica, arial,sans-serif',marginBottom:'.70rem',fontWeight:900,textTransform:'none',fontSize:'1.8rem',letterSpacing:'-.96',lineHeight:1}}>Sign in to SolarBuddy</div>
          <div style={{color:'grey',fontFamily:'JioType, helvetica, arial,sans-serif',fontWeight:500,textTransform:'none',fontSize:'0.875.rem',lineHeight:'1.4',marginBottom:'2em'}}>to access your Addresses, Orders & Wishlist.</div>
        </div>

          <div style={{alignSelf:'center',marginBottom:'15%'}}>
          <MuiTelInput value={mobileno} onChange={handleChange} />
          </div>
         
         <Button onClick={handleOpt} style={{display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',width:'60%',height:'8vh',borderRadius:'10vw',background:'#0078ad',color:'#fff',fontFamily:'JioType, helvetica, arial, sans-serif',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: '1rem',
    letterSpacing: '-.08px',
    lineHeight: 1.5,
    marginBottom:'5%',cursor:'pointer'}}>
             GET OTP
         </Button>

         <div style={{    fontFamily:'JioType, helvetica, arial, sans-serif',
    fontWeight: 500,
    textTransform: 'none',
    fontSize: '.75rem',
    letterSpacing: '-.06px',
    lineHeight: 1.3,
    color:'grey',
    marginBottom:'10%'
    }}>
         By continuing, you agree to our Terms of Service and Privacy & Legal Policy
         </div>

     </div>
</div>)
}
 