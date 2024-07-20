import { Button, Grid, TextField } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { postData } from '../../services/fetchnodeservices';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
export default function AddAddressComponent(props){

    const[userId,setUserId]=useState('')
    const[pinCode,setPinCode]=useState('')
    const[houseNo,setHouseNo]=useState('')
    const[floorNo,setFloorNo]=useState('')
    const[towerNo,setTowerNo]=useState('')
    const[building,setBuilding]=useState('')
    const[address,setAddress]=useState('')
    const[landmark,setLandmark]=useState('')
    const [errorMessage,setErrorMessage]=useState({})

    var userData=Object.values(useSelector(state=>state.User))[0]

   useEffect(function(){
    fetchUserData()
   },[])

   const fetchUserData=()=>{
    setUserId(userData?.userid)
   }

    const handleClose=()=>{
       props.setOpen(false)
    }

    const handelError = (message,label)=>{
        setErrorMessage((prev)=>({...prev,[label]:message}))
      }

    const handleSubmit=async()=>{

        
        var error = false
    
        if(pinCode.length == 0){
         handelError("Pls Enter pincode....",'pincode')
         error=true
        }

        if(address.length == 0){
            handelError("Pls Enter address....",'address')
            error=true
           }

        if(floorNo.length == 0){
        handelError("Pls Enter floorno....",'floorno')
        error=true
        }

        if(houseNo.length == 0){
        handelError("Pls Enter houseno....",'houseno')
        error=true
        }

        if(towerNo.length == 0){
        handelError("Pls Enter towerno....",'towerno')
        error=true
        }

        if(building.length == 0){
        handelError("Pls Enter building....",'building')
        error=true
        }

        if(landmark.length == 0){
        handelError("Pls Enter landmark....",'landmark')
        error=true
        }

        if(error == false){
       var body={'userid':userId,'pincode':pinCode,'houseno':houseNo,'floorno':floorNo,'towerno':towerNo,'building':building,'address':address,'landmark':landmark}
console.log(body)
      var result= await postData('userinterface/add_new_address',body)
      alert(result.message)
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
    }
    }

    return(<div >
<Drawer open={props.open} onClose={handleClose} anchor={'right'} >
<div style={{width:360,display:'flex',justifyContent:'center',alignItems:'center'}}>
    <div style={{width:'90%',marginTop:'5%'}}>
<Grid container spacing={2} >

<Grid item xs={9} style={{fontWeight:'bolder',fontSize:'1.5rem'}}>
   Add Address
</Grid>

<Grid item xs={3} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
   <CloseIcon onClick={handleClose}/>
</Grid>

<Grid item xs={12} style={{fontWeight:'bolder',fontSize:'1rem'}}>
   Address Details
</Grid>

<Grid item  xs={12}>
<div style={{width:'62%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
<GpsFixedIcon/>
<div>
    <div style={{color:'#54a0ff',fontWeight:'bold',fontSize:'1rem'}}>Use Current Location</div>
    <div style={{color:'grey',fontSize:'.7rem'}}>Using GPS</div>
</div>
</div>
</Grid>

<Grid item xs={12}>
    <TextField error={errorMessage.pincode} helperText={errorMessage.pincode} onFocus={()=>{handelError('','pincode')}} label="Pin Code*" variant="standard" fullWidth onChange={(e)=>setPinCode(e.target.value)}/>
</Grid>

<Grid item xs={6}>
    <TextField error={errorMessage.houseno} helperText={errorMessage.houseno} onFocus={()=>{handelError('','houseno')}} label="House No." variant="standard" fullWidth onChange={(e)=>setHouseNo(e.target.value)}/>
</Grid>

<Grid item xs={6}>
    <TextField error={errorMessage.floorno} helperText={errorMessage.floorno} onFocus={()=>{handelError('','floorno')}} label="Floor No." variant="standard" fullWidth onChange={(e)=>setFloorNo(e.target.value)}/>
</Grid>

<Grid item xs={12}>
    <TextField error={errorMessage.towerno} helperText={errorMessage.towerno} onFocus={()=>{handelError('','towerno')}} label="Tower No." variant="standard" fullWidth onChange={(e)=>setTowerNo(e.target.value)}/>
</Grid>

<Grid item xs={12}>
    <TextField error={errorMessage.building} helperText={errorMessage.building} onFocus={()=>{handelError('','building')}} label="Building / Apartment Name" variant="standard" fullWidth onChange={(e)=>setBuilding(e.target.value)}/>
</Grid>

<Grid item xs={12}>
    <TextField error={errorMessage.address} helperText={errorMessage.address} onFocus={()=>{handelError('','address')}} label="Address *" variant="standard" fullWidth onChange={(e)=>setAddress(e.target.value)}/>
</Grid>

<Grid item xs={12}>
    <TextField error={errorMessage.landmark} helperText={errorMessage.landmark} onFocus={()=>{handelError('','landmark')}} label="Landmark / Area *" variant="standard" fullWidth onChange={(e)=>setLandmark(e.target.value)}/>
</Grid>

<Grid item xs={12} style={{marginTop:'8%'}}>
    <Button fullWidth variant="contained" style={{borderRadius:25,background:'#54a0ff'}} onClick={handleSubmit}>Save & Proceed</Button>
</Grid>

</Grid>
</div>
</div>
</Drawer>
    </div>)
}