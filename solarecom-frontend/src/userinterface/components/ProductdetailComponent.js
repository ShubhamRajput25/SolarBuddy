import { Grid } from "@mui/material"
import {Divider} from "@mui/material"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Fab from '@mui/material/Fab';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function ProductdetailComponent(props)
{   
    var location=useLocation()

    console.log(props.data)
    var dispatch=useDispatch()
    var productFromRedux=JSON.parse(localStorage.getItem('Cart'))
var items=location.state.product

const theme = useTheme();
const matches = useMediaQuery(theme.breakpoints.down('md'));
  const matches2 = useMediaQuery(theme.breakpoints.down(450));
 
// console.log("zzzzzzoooooooooooo",productFromRedux[items.productdetailid]==undefined?0:productFromRedux[items.productdetailid].qty)

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

  console.log("ssssssssssssssssssssss",productFromRedux,"rrrrrrrrrrrrrrrrrrrrrrrrr")

const showItems = () => {
   
        
    return (<div style={{fontWeight:'bold',width:'100%',marginLeft:'2%',letterSpacing:0.8}}>

        <div style={{display:'flex',fontWeight:'bolder',fontSize:'1.2rem',margin:'2%'}}>{items?.brandname} {items?.productname}</div>

        <div style={{display:'flex',alignItems:'center',fontSize:'0.9rem',margin:'2%'}}>{items?.productsubname}</div>
        <Divider/>
        <div style={{display:'flex',alignItems:'center',fontSize:'0.8rem',textDecorationLine: 'line-through',margin:'2%'}}>M.R.P : <CurrencyRupeeIcon style={{fontSize:'0.9vw'}}/>{items.price}</div>

        <div style={{display:'flex',alignItems:'center',fontSize:'1rem',color:'#3867d6',margin:'2%'}}>Price : <CurrencyRupeeIcon style={{fontSize:'0.9rem'}}/>{items.offerprice}</div>

        <div style={{display:'flex',alignItems:'center',fontSize:'0.8rem',margin:'2%'}}>Save : <CurrencyRupeeIcon style={{fontSize:'0.9rem'}}/>{items.price-items.offerprice}</div>

        <div style={{display:'flex',alignItems:'center',fontSize:'0.7rem',margin:'2%'}}>Inclusive of all taxes</div>
        
        <div style={{display:'flex',fontSize:'1.5rem',margin:'2%',width:matches2?'70%':matches?'45%':'80%'}}>
        <PlusMinusComponent view='' qty={productFromRedux[items.productdetailid]==undefined?0:productFromRedux[items.productdetailid].qty}  onChange={(v)=>handleChange(v,items)}/>
       
        </div>
        <Divider/>
        <div style={{display:'flex',alignItems:'center',fontSize:'1.2rem',margin:'2%'}}><LocalOfferIcon style={{fontSize:'small'}}/> Offer available for you</div>

        <div style={{display:'flex',alignItems:'center',fontSize:'0.9rem',marginBottom:'1%'}}>{items.OA}</div>

        <Divider/>
        <div style={{display:'flex',alignItems:'center',fontSize:'0.7rem',margin:'2%'}}>Brand : {items?.brandname}</div>

        <div style={{display:'flex',alignItems:'center',fontSize:'0.7rem',margin:'2%'}}>Product Code : {items.productdetailid}</div>

        <div style={{display:'flex',alignItems:'center',fontSize:'0.7rem',margin:'2%'}}>Seller :PS-SOFTECH Corporation</div>
        
        </div> )
    
}
    return( <div style={{ width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Grid container spacing={2}>
         <Grid item xs={12} >
        {showItems()}
         </Grid>
        </Grid>
        </div>
 )
}