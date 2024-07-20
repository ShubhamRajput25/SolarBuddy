import Drawer from '@mui/material/Drawer';
import { List,ListItemButton,ListItemIcon,ListItemText,Divider } from '@mui/material';
import { postData, serverurl } from '../../services/fetchnodeservices';
import CloseIcon from '@mui/icons-material/Close';
import {TextField} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useEffect, useState } from 'react';
import { AsYouType } from 'mui-tel-input';
import Swal from 'sweetalert2';

export default function AddNewAddress({addressBoxOpen,setAddressBoxOpen,userData})
  
{  var options=[{text:'Your Orders',icon:'orders.png',link:''},
{text:'Track Orders',icon:'track.png',link:''},
{text:'Payments Details',icon:'Payments.png',link:''},
{text:'Return',icon:'return.png',link:''},
]
 
useEffect(()=>{
  setAddressBoxOpen(addressBoxOpen)

},[addressBoxOpen])
 const [pincode,setPincode]=useState()
 const [houseNo,setHouseNo]=useState()
 const [floorNo,setFloorNo]=useState()
 const [buildingName,setbuildingName]=useState()
 const [address,setAddress]=useState()
 const [landmark,setLandmark]=useState()
 const [city,setCity]=useState()
 const [state,setstate]=useState()
    
   const handleClose=()=>{
    setAddressBoxOpen(false)
   }

   const handleAddrSubmit=async()=>{
    var body={
        emailid:userData.emailid,
        mobileno:userData.mobileno,
        pincode:pincode,
        houseno:houseNo,
        floorno:floorNo,
        building:buildingName,
        address:address,
        landmark:landmark,
        state:state,
        city:city
    }


    var result= await postData('userinterface/submit_address',body)
    if(result.status){
      Swal.fire({
        icon: "success",
        title: "Address Register",
        text: result.message
      });
    }else{
      Swal.fire({
        icon: "error",
        title: "Address Register",
        text: result.message
      });
    }

    setAddressBoxOpen(false)
   }
   

     const showList=()=>{

       return(<div style={{width:'20rem'}}>

        <div style={{display:'flex',justifyContent:'space-between',margin:22}}>
        <span style={{fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight: 900, textTransform: 'none',fontSize: '1.5rem',letterSpacing: '-.72px', lineHeight: 1.1666666667}}>Add Address</span>
        <span onClick={handleClose}><CloseIcon/></span>
        </div>      

       
        <div style={{marginLeft:'27px',fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight: 900, textTransform: 'none',fontSize: '1.rem',letterSpacing: '-.48px', lineHeight: 1.25}}>Address Details</div>


        <div style={{display:'flex',flexDirection:'row',marginTop:'20px',marginLeft:'27px'}}>           
           <span  style={{marginTop:'3px',color:'#0c5273',fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight: 700, textTransform: 'none',fontSize: '0.5rem',letterSpacing: '-.48px', lineHeight: 1.25}}><MyLocationIcon/></span>
           
           <div style={{display:'flex',flexDirection:'column'}}>
           <span  style={{color:'#0c5273',marginLeft:'15px',fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight: 700, textTransform: 'none',fontSize: '1rem',letterSpacing: '-.08px', lineHeight: 1.5}}>Use Current Location </span> 
           <span  style={{color:'grey',marginLeft:'27px',fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight: 500, textTransform: 'none',fontSize: '.75rem',letterSpacing: '-.06px', lineHeight: 1.33}}>using GPS </span>  
           </div>

        </div> 
       <div style={{margin:5,padding:20}}>
          <TextField onChange={(e)=>setPincode(e.target.value)} style={{margin:'10px'}} fullWidth id="standard-basic" label="Pincode" variant="standard" />
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <TextField onChange={(e)=>setHouseNo(e.target.value)} style={{margin:'10px'}} fullWidth id="standard-basic" label="House No*" variant="standard" />
          <TextField onChange={(e)=>setFloorNo(e.target.value)} style={{margin:'10px'}} fullWidth id="standard-basic" label="Floor No." variant="standard" />
          </div>
          <TextField onChange={(e)=>setbuildingName(e.target.value)} style={{margin:'10px'}} fullWidth id="standard-basic" label="Building/Apartment Name*" variant="standard" />
          <TextField onChange={(e)=>setAddress(e.target.value)} style={{margin:'10px'}} fullWidth id="standard-basic" label="Address*" variant="standard" />
          <TextField onChange={(e)=>setLandmark(e.target.value)} style={{margin:'10px'}} fullWidth id="standard-basic" label="Landmark/Area*" variant="standard" />
          <TextField onChange={(e)=>setCity(e.target.value)} style={{margin:'10px'}} fullWidth id="standard-basic" label="City" variant="standard" />
          <TextField onChange={(e)=>setstate(e.target.value)} style={{margin:'10px'}} fullWidth id="standard-basic" label="State" variant="standard" />
       </div>
         
    <div onClick={handleAddrSubmit} style={{width:'60%',height:'6vh',border:'1px solid',borderRadius:'20px',borderColor:'#0078ad',marginTop:'8vh',marginLeft:'25px',display:'flex',justifyContent:'center',alignItems:'center',background:'#0078ad'}}>
    <span  style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:'bold',letterSpacing:'0.8px',color:'#fff',cursor:'pointer'}}>Save & Proceed</span>
    </div>



       </div>)
        
     }
     

    return(<div >
   
     <Drawer  anchor='right' open={addressBoxOpen} onClose={handleClose}>
        <List>
           {showList()}     
        </List>   
     </Drawer>
    </div>
    )
}