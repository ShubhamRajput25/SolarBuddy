import Drawer from '@mui/material/Drawer';
import { List,ListItemButton,ListItemIcon,ListItemText,Divider } from '@mui/material';
import { postData, serverurl } from '../../services/fetchnodeservices';
import CloseIcon from '@mui/icons-material/Close';
import ModeIcon from '@mui/icons-material/Mode';
import {Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import EditAddressComponent from './EditAddressComponent';
import Swal from 'sweetalert2';

export default function CartDrawer({open,setOpen,address,userData,setAddressBoxOpen,setLabelPaymentButton,pageRefresh,setPageRefresh})
{
   const [editAddressBox,setEditAddressBox]=useState(false)
   const [addressData,setAddressData]=useState({})

   const theme = useTheme();
   const matches1=useMediaQuery(theme.breakpoints.down('md'))
   const matches2=useMediaQuery(theme.breakpoints.down('sm'))
   const matches3=useMediaQuery(theme.breakpoints.down(450))

   let dispatch=useDispatch() 

   let navigate = useNavigate()

    useEffect(function(){
   setOpen(open)
      
    },[open])
   const handleClose=()=>{
    setOpen(false)
   }
   const handleNewAddress=()=>{
     if(Object.values(address).length <=5){
      setOpen(false)
      setAddressBoxOpen(true)
     }else{
      Swal.fire({
         icon: "error",
         title: "Address Register",
         text: "cant add address more then 5"
       });
       setOpen(false)
     }
    
   }
   const handledDeliver=(item)=>{
      let user={...userData,item}
      dispatch({type:'ADD_USER',payload:[userData.mobileno,user]})
      localStorage.setItem('USER',JSON.stringify(user))
      setLabelPaymentButton('PROCEED TO PAYMENT')
      setOpen(false)
      setPageRefresh(!pageRefresh)
   }

   const handleDeleteAddress=async(item)=>{

      Swal.fire({
         title: "Are you sure to delete this address?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!",
       }).then(async(result) => {
         if (result.isConfirmed) {
            var result = await postData('userinterface/deleteaddress',{addressid:item.addressid})         
        if(result.status){
           Swal.fire({
             title: "Deleted!",
             text: result.message,
             icon: "success",
           });
           setOpen(false)
         }else{
           Swal.fire({
             title: "Sorry!",
             text: result.message,
             icon: "error",
            
         });
      }
   }})

   }

   const handleEditAddress=async(item)=>{
         setAddressData(item)
         setEditAddressBox(true)
   }

   const showAddressList=()=>{
      return address?.map((item,i)=>{
         return(
         <div>

         <div style={{borderRadius: '16px',
    padding: '20px',
    margin: 20,
    width: '80%',
    minHeight: 'auto',
    height: 'auto',
    boxShadow: '0 4px 16px rgba(0, 0, 0, .08)',
    border: '1px solid '}}
    >
    <div  style={{display:'flex',justifyContent:'space-between',fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'600', textTransform: 'none',fontSize: '16px',letterSpacing: '-.07px', lineHeight: 1,width:'100%'}}>
     {userData?.firstname} {userData?.lastname}
     <div style={{}}>
     <ModeIcon style={{marginRight:10}} onClick={()=>handleEditAddress(item)}/>
     <DeleteIcon onClick={()=>handleDeleteAddress(item)}/>
     </div>
    </div>
    <div style={{display:'flex',flexDirection:'column'}}>
        <span style={{color:'gray', margin:3,fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.70rem',letterSpacing: '0.5px', lineHeight: 1}}>{item?.houseno}, {item?.floorno}, {item?.building} </span>
        <span style={{color:'gray',margin:3,fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.70rem',letterSpacing: '0.5px', lineHeight: 1}} >{item?.address}</span>
        <span style={{color:'gray',margin:3,fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.70rem',letterSpacing: '0.5px', lineHeight: 1}} >{item?.city},{item?.pincode},{item?.state}</span>
        <span style={{color:'gray',margin:3,fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.70rem',letterSpacing: '0.5px', lineHeight: 1}}>{item?.mobileno}</span>
    </div>
    
    <div>
    <Button  style={{display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',width:'12rem',height:'5vh',borderRadius:'10vw',background:'#0078ad',color:'#fff',fontFamily:'JioType, helvetica, arial, sans-serif',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: '1rem',
    letterSpacing: '-.08px',
    lineHeight: 1.5,
    marginTop:'2vh',cursor:'pointer'}} onClick={()=>handledDeliver(item)}>
             Deliver Here
         </Button>
    </div>
    
    </div>
   
</div>
      )
   
   })
    
   }


     const showList=()=>{

       return(<div style={{width:matches3?'19.5rem':matches2?'22rem':'25rem',marginRight:matches3?'10px':''}}>

        <div style={{display:'flex',justifyContent:'space-between',margin:22}}>
        <span style={{fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight: 900, textTransform: 'none',fontSize: '1.5rem',letterSpacing: '-.72px', lineHeight: 1.1666666667}}> Select Address</span>
        <span onClick={handleClose}><CloseIcon/></span>
        </div>       
        <div style={{marginLeft:'27px',fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight: 900, textTransform: 'none',fontSize: '1.rem',letterSpacing: '-.48px', lineHeight: 1.25}}>Saved Addresses</div>
        {showAddressList()}
        
    <div onClick={handleNewAddress} style={{marginTop:'50vh',width:'60%',cursor:'pointer', height:'6vh',border:'1px solid',borderRadius:'20px',borderColor:'#0078ad',marginTop:'50vh',marginLeft:'25px',display:'flex',justifyContent:'center',alignItems:'center'}}>
    <span style={{color:'#0c5273',margin:'1.5px'}}><Add style={{fontSize:'26px'}} /></span>
    <span style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:'bold',letterSpacing:'0.8px',color:'#0c5273'}}>Add New Address</span>
    </div>



       </div>)
        
     }
     

    return(<div >
   
     <Drawer  anchor='right' open={open} onClose={handleClose}>
        <List>
           {showList()}     
        </List>   
     </Drawer>
     <EditAddressComponent editAddressBox={editAddressBox}  setEditAddressBox={setEditAddressBox} userData={userData} addressData={addressData} open={open} setOpen={setOpen}/>
    </div>
    )
}