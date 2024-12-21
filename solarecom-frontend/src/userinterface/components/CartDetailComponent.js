import { Grid } from "@mui/material"
import { serverurl } from "../../services/fetchnodeservices";
import { FormControl, InputLabel, Select, MenuItem, } from "@mui/material";
import { useState } from "react";

import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {Divider} from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import { flexbox } from "@mui/system";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';


export default function CartDetailComponent(props) {
    const [qty, setQuantity] = useState()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    let dispatch=useDispatch()
    var row = props.data
    console.log("cart ka data row",row)
    const theme = useTheme();
    const matches1=useMediaQuery(theme.breakpoints.down('md'))
    const matches2=useMediaQuery(theme.breakpoints.down('sm'))
    const matches3=useMediaQuery(theme.breakpoints.down(450))

    var product = JSON.parse(localStorage.getItem('WishList'))

    const handleChange=(v,item)=>{
        if(v>=1)
        { item['qty']=v
         dispatch({type:"ADD_CART",payload:[item.productdetailid,item]})
        }
        else
        {
           dispatch({type:"DELETE_CART",payload:[item.productdetailid]})
        }
       props.setPageRefresh(!props.pageRefresh)
      }

      const handleWishListChange = (item, e) => {
        if (e) {
            dispatch({ type: 'ADD_WISHLIST', payload: [item.productdetailid, item] })
            props.setPageRefresh(!props.pageRefresh)
        } else {

            dispatch({ type: 'DELETE_WISHLIST', payload: [item.productdetailid] })
            props.setPageRefresh(!props.pageRefresh)
        }
    }

      const handleClear=(item)=>{
        dispatch({type:"DELETE_CART",payload:[item.productdetailid]})
        props.setPageRefresh(!props.pageRefresh)
      }

    const showProducts = () => {
        return row.map((item) => {
            let isChecked = product ? product[item?.productdetailid] ? true : false : false
    return <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',background:'#fff',position:'relative'}}>
    <div style={{width:'90%',height:'90%',display:'flex',flexDirection:'column',marginBottom:'1%',marginTop:'1%'}}>
<div style={{position:'absolute',right:"1%"}} ><ClearIcon onClick={()=>handleClear(item)} /></div>
    <Grid container spacing={2} style={{marginBottom:'3%'}}>
        <Grid xs={3} item>
        <img src={`${serverurl}/images/${item.picture.split(',')[0]}`} style={{width:'100%'}}/>
        </Grid>

        <Grid xs={9} item style={{display:'flex',flexDirection:'column'}}>
    <div style={{fontWeight:'bold',color:'#000'}}>{item.productname}</div>
    <div style={{fontWeight:'bold',color:'grey'}}>{item.productsubname}</div>
    <div style={{fontWeight:'bold',color:'grey'}}>{item.size}</div>
    <div style={{ width:matches3?'100%':'80%',display:'flex',fontWeight:'bold',marginTop:'1%',justifyContent:'space-between'}}><span style={{color:'#30336b',fontWeight:'bold',fontSize:'1rem'}}>&#8377;{item.offerprice}</span>  <del style={{color:'grey',fontWeight:'bold',fontSize:'1rem'}}>&#8377;{item.price}</del><span style={{color:'#30336b',fontWeight:'bold',fontSize:'1rem'}}>&#8377;{item.offerprice>0?item.offerprice*item.qty:item.price*item.qty}</span></div>

    <div style={{display:'flex',width:'100%', justifyContent:'space-between',fontWeight:'bolder', marginTop:'1%',color:'#10ac84'}}>
    <span>You Save &#8377;{item.price-item.offerprice}</span>   
    <span>
    <PlusMinusComponent view='Cart' qty={item.qty}  onChange={(v)=>handleChange(v,item)}/>
    </span>
    
    </div>
    <div style={{width:130,padding:'1%',border:'1px solid #dcdde1',marginTop:'2%',display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>  {isChecked ? <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={(event) => handleWishListChange(item, event.target.checked)} checked={true} style={{width:10,height:10}} /> : <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={(event) => handleWishListChange(item, event.target.checked)} style={{width:10,height:10}}/>} <div> Save for later</div> </div>
        </Grid>
    </Grid>

<Divider/>
    </div>
    
    </div>
        })
    }
    return (
        <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',boxShadow:matches3?'':'0px 0px 3px black'}}>{showProducts()}</div>
    )
}
