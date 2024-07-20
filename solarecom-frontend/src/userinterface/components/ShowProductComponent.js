import { serverurl } from "../../services/fetchnodeservices"
import { List,ListItemText,ListItemButton, ListItemIcon , Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import PlusMinusComponent from "./PlusMinusComponent";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';
export default function ShowProductComponent(props){

    const theme = useTheme();
    const matches1=useMediaQuery(theme.breakpoints.down('md'))
    const matches2=useMediaQuery(theme.breakpoints.down('sm'))
    const matches3=useMediaQuery(theme.breakpoints.down(550))

    let item=props?.data

    var dispatch=useDispatch()
    var navigate=useNavigate()
 
    var productFromRedux=JSON.parse(localStorage.getItem('Cart'))
 
 const handlePlusMinus=(v,item)=>{
   
     if(v>=1){
         item['qty']=v
         dispatch({type:'ADD_CART',payload:[item.productdetailid,item]})
         
     }else{
         dispatch({type:'DELETE_CART',payload:[item.productdetailid]}) 
     }
 
     props.setPageRefesh(!props.pageRefesh)
 }

 const handleNextPage=(item)=>{
    navigate('/showproductdetails',{state:{product:item}})
   }

  var save=parseInt(item.price)-parseInt(item.offerprice)

    return(<div style={{width:matches3?'100%':"230px",height:matches3?'':'330px',boxShadow:'1px 1px 10px #dfe4ea',display:'flex',flexDirection:matches3?'row':'column',justifyContent:'start',background:'#fff',alignItems:'center',marginTop:'1%',overflow:'hidden',marginRight:'.4%'}} >

<div style={{width:'100%',height:matches3?'':'50%',display:'flex',justifyContent:'center',alignItems:'center'}} >
<img src={`${serverurl}/images/${item.icon}`} style={{width:'100%',height:'100%'}} onClick={()=>handleNextPage(item)}/>
</div>

<div style={{width:'100%'}}>
    <div style={{fontWeight:'bolder',marginTop:'10px',padding:'5px',textAlign:'center',textOverflow: "ellipsis",whiteSpace:matches2?'': "nowrap",overflow: "hidden"}}>
        {item.productname}
    </div>
    <Divider/>
    <div style={{fontWeight:'bolder',marginTop:'10px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
        <div>{item.offerprice} <del style={{color:'grey'}}> {item.price}</del> </div>
        <div style={{color:'green'}}> you save :- {save}</div>
    </div>
    <div style={{width:'100%',marginTop:'5%',display:'flex',justifyContent:'center'}}>
    <PlusMinusComponent view=''  qty={productFromRedux[item.productdetailid]==undefined?0:productFromRedux[item.productdetailid].qty}  onChange={(v)=>handlePlusMinus(v,item)}/>
    </div>
    </div>

    </div>)
}