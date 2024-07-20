import Drawer from '@mui/material/Drawer';
import { List,ListItemText,ListItemButton, ListItemIcon , Divider } from '@mui/material';
import { serverurl } from '../../services/fetchnodeservices';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function DrawerComponent({open,setOpen}){

    var data = [
        {text:'Home',icon:'home.png',link:''},
        {text:'Your Order',icon:'order.png',link:''},
        {text:'Wish List',icon:'wishlist.png',link:''},
        {text:'Cart',icon:'cart.png',link:''},
    {text:'Track Order',icon:'track order.png',link:''},
    {text:'Payments Details',icon:'payment.jpg',link:''},
    {text:'Return',icon:'return.png',link:''},
    ]

    const [a,seta]=useState(false)
    const [logStatus,setLogStatus]=useState('Login')

    let navigate = useNavigate()
    let dispatch=useDispatch()
    // let user = useSelector((state)=>state.User)
    let user = JSON.parse(localStorage.getItem('USER'))
    // console.log("local storage se user data",user)
    let userKey =""
    let userData = user
    // alert(JSON.stringify(userData))
    let userName=""
    let userMobileno="" 

    useEffect(function(){
        if(userData){
        setLogStatus('Logout')
        }
    },[userKey.length])

    // alert(JSON.stringify(user))
    if(userData){
        userName=userData.firstname+" "+userData.lastname
        userMobileno=userData.mobileno
       
    }else{
        userName="Guest"
        userMobileno="+91 12345"
    }
    
    let handleLogStatus=()=>{
     

        if(logStatus=='Login'){
            navigate('/signin')
        }else{
            // alert("logout hoo gya ")
            window.localStorage.removeItem('USER')
            
            dispatch({type:'DELETE_USER',payload:[userMobileno]})
            setLogStatus('Login')
            setOpen(false)
        }
    }

    const handleclick=(item)=>{
        if(item.text=='Your Order'){
            navigate('/yourorder')
         }
        else if(item.text=='Wish List'){
            navigate('/wishlist')
        }
        else if(item.text=='Home'){
            navigate('/home')
        }
        else if(item.text=='Cart'){
            navigate('/cart')
        }
    }

    const showItems=()=>{
        return data.map((item)=>{
            return <ListItemButton onClick={()=>handleclick(item)}>
                <ListItemIcon>
                    <img src={`${serverurl}/images/${item.icon}`} style={{width:30,height:30}}/>
                </ListItemIcon>
                <ListItemText primary={item.text} />
            </ListItemButton>
        })
    }

    const handleClose=()=>{
        setOpen(false)
    }

    return (<div>
<Drawer open={open} onClose={handleClose}>
    <List>
    <ListItemButton>
                <ListItemIcon>
                    <img src={`${serverurl}/images/guest.png`} style={{width:40,height:40}}/>
                </ListItemIcon>
                <ListItemText primary={<div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}><span style={{fontWeight:'bold'}}>{userName}</span><span style={{fontWeight:10}}>{userMobileno}</span></div>} />
            </ListItemButton>
            <Divider/>
    {showItems()}
    <Divider/>
    <ListItemButton onClick={handleLogStatus}>
                <ListItemIcon>
                    <img src={`${serverurl}/images/logout.png`} style={{width:30,height:30}}/>
                </ListItemIcon>
                <ListItemText primary={logStatus} />
            </ListItemButton>
    </List>

</Drawer>
    </div>)
}