import React, { useEffect } from "react";
import { useState } from "react";
import OtpInput from 'react-otp-input';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function VerifyOpt(){
  var location=useLocation()
  var mobileno=location.state.mobileno
  var userdata=location.state.userdata
  var navigate=useNavigate()

  var getotp=location.state.otp 
 
  useEffect(()=>{ 
    alert(getotp)
  },[])
  
  
const [otp, setOtp] = useState('');

const handleChkOpt=()=>{
    if(otp==getotp)
    {
      navigate("/home",{state:{userdata:userdata}})
    }
    else
    {
      alert("Wrong Otp")
    }
    
}

return(<div style={{display:'flex',width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
     <div style={{display:'flex',flexDirection:'column',width:'75%',height:'',background:'#fff',borderRadius:'32px',padding:'64px 32px 0',boxShadow:'0px 0px 15px 3px rgba(0, 0, 0, .05)',position: 'relative'}}>
         

        <div>
          <div style={{fontFamily:'JioType, helvetica, arial,sans-serif',marginBottom:'.70rem',fontWeight:900,textTransform:'none',fontSize:'1.8rem',letterSpacing:'-.96',lineHeight:1}}>Verify Phone Number</div>
          <div style={{color:'grey',fontFamily:'JioType, helvetica, arial,sans-serif',fontWeight:500,textTransform:'none',fontSize:'0.875.rem',lineHeight:'1.4',marginBottom:'5%'}}>An SMS with 4-digit OTP was sent to
+91 {mobileno} Change</div>
        </div>

          <div style={{alignSelf:'center',marginBottom:'10%'}}>
          <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
      inputStyle={{ width: 50, height: 50,borderRadius:10,margin:5 }}
    />
          </div>
         
         <div onClick={handleChkOpt} style={{display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',width:'60%',height:'8vh',borderRadius:'10vw',background:'#0078ad',color:'#fff',fontFamily:'JioType, helvetica, arial, sans-serif',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: '1rem',
    letterSpacing: '-.08px',
    lineHeight: 1.5,
    marginBottom:'2vh',cursor:'pointer'}}>
             Verify
         </div>

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
 