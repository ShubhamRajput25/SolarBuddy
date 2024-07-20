import { useEffect,useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function PlusMinusComponent(props)
{
    const [value,setValue]=useState(0)

    let navigate=useNavigate()

    useEffect(function(){
        setValue(props.qty)
    },[props.qty])

    const handlePlus=()=>{
        var v=value
        v=v+1
        setValue(v)
        props.onChange(v)
    }

    const handleMinus=()=>{
        var v=value
        if(v>=1)
        { v=v-1
            setValue(v)
        props.onChange(v)}
        
    }

    const handleBuyBtn=()=>{
        var v=value
        v=v+1
        if(v<=1){
        setValue(v)
        props.onChange(v)
        }
        navigate('/cart')
    }
    // console.log("hhhhhhhhhhhhh",value)
    return(
    <div style={{display:'flex',width:'58%',justifyContent:"space-between"}}>
    {value==0? <Button onClick={handlePlus} size="small" style={{color:'#000'}} variant="text" endIcon={<AddShoppingCartIcon />}>
  Add
</Button>:
    <div style={{display:'flex',width:50,padding:"1px 8px 1px 8px",justifyContent:"space-between",alignItems:'center',flexDirection:'row',borderRadius:5,color:'#fff',background:'#000',marginRight:'4%' }}>
        <div onClick={handlePlus} style={{fontWeight:'bolder',cursor:'pointer',marginRight:'2%'}}>+</div>
        <div style={{fontWeight:'bolder',cursor:'pointer'}}>{value}</div>
        <div onClick={handleMinus} style={{fontWeight:'bolder',cursor:'pointer',marginLeft:'2%'}}>-</div>
    </div>}

   {props.view=='Cart'?<div></div>:<Button style={{color:'#fff',background:'#000'}} onClick={handleBuyBtn} size="small" variant="contained" > 
  Buy
</Button>}
    </div>
    )

}