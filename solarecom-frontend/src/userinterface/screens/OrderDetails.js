import { useLocation, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { Divider, useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";
import { serverurl } from "../../services/fetchnodeservices";
import { useDispatch } from "react-redux";

export default function OrderDetails(){
    let location = useLocation()
    let product = location.state.product
    const theme = useTheme();
    const matches1=useMediaQuery(theme.breakpoints.down('md'))
    const matches2=useMediaQuery(theme.breakpoints.down('sm'))
    const matches3=useMediaQuery(theme.breakpoints.down(950))
    const matches4=useMediaQuery(theme.breakpoints.down(750))
    const matches5=useMediaQuery(theme.breakpoints.down(506))

    let userdata=Object.values(useSelector((state)=>state.User))[0]
    let totalprice = product.offerprice * product.quantity
    let saving = (product.price * product.quantity) - (product.offerprice * product.quantity)
    var imgsrc=product.picture.split(',')
    let dispatch=useDispatch()
    let navigate=useNavigate()
    const handleBuyAgain=()=>{
            let v = 1
            product['qty'] = v
            dispatch({type:'ADD_CART',payload:[product.productdetailid,product]})
            navigate('/cart')
    }

    console.log(product)
    return (<div style={{width:'100%'}}>
        <Header />
        <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop: matches1?'125.5px':'64.4px',marginBottom:'2%'}}>
            <div style={{width:matches4?'90%':'70%',marginTop:20}}>
                <div style={{fontSize:'2rem'}}>Order Details</div>

                <div style={{width:'100%',marginTop:20}}>
                    <span style={{fontSize:'.85rem',fontWeight:500,marginRight:10}}>Ordered on {product.date} </span> |
                    <span style={{fontSize:'.85rem',fontWeight:500,marginLeft:10}}>Transitionid : {product.transitionid}</span> 
                    </div>

                    <div style={{width:'100%',display:'flex',justifyContent:'center',border:matches5?'':'2px solid #dfe6e9',borderRadius:10,marginTop:10,overflow:'hidden'}}>
                    <div style={{width:'95%',display:'flex',justifyContent:'space-between',paddingTop:'2%',paddingBottom:'2%',flexDirection:matches5?'column':'row'}}>
                    <div style={{width:matches5?'90%':'50%',marginBottom:matches5?'10%':''}}>
                        <div style={{fontSize:'.9rem',fontWeight:600}}>Shipping Address</div>
                        <div style={{fontSize:'.9rem',fontWeight:600}}>{userdata?.firstname} {userdata?.lastname} </div>
                        <div>
            <span style={{color:'gray',fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.80rem',letterSpacing: '0.5px', lineHeight: 1}} >{product?.address}</span>
            </div>

            <div><span style={{color:'gray',fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.80rem',letterSpacing: '0.5px', lineHeight: 1}}>{product?.city}, {product?.state}, {product?.pincode} </span></div>

            <div style={{fontSize:'.9rem',fontWeight:600}}> mobileno:
            <span style={{color:'gray',margin:3,fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.80rem',letterSpacing: '0.5px', lineHeight: 1}}>{product?.mobileno}</span>
            </div>
                    </div>
                    <Divider />
                    <div style={{width:matches5?'90%':matches2?'46%':matches3?'40%':'32%',marginTop:matches5?'10%':''}}>
                        <div style={{fontWeight:'bold',fontSize:'.9rem'}}>Order Summary</div>
                    <div style={{ fontWeight: 'bold', fontSize: '.9rem' }}>Product Amount
            <span style={{ fontWeight: 'bold', fontSize: '.9rem', float: 'right',color:'grey' }}>&#x20b9;{product?.price}</span>
        </div>
        <div style={{ fontWeight: 'bold', fontSize: '.9rem' }}>Product Offer Amount
            <span style={{ fontWeight: 'bold', fontSize: '1rem', float: 'right',color:'grey' }}>&#x20b9;{product?.offerprice}</span>
        </div>
        <div style={{ fontWeight: 'bold', fontSize: '.9rem',marginTop:'2%'}}>Delivery
            <span style={{fontWeight: 'bold', fontSize: '.9rem', float: 'right',color:'grey'  }}>&#x20b9;0</span>
        </div>

        <div style={{ fontWeight: 'bold', fontSize: '.9rem',marginTop:'2%'}}>Quantity
            <span style={{fontWeight: 'bold', fontSize: '.9rem', float: 'right',color:'grey'  }}>&#x20b9;{product?.qty}</span>
        </div>

        <div style={{ fontWeight: 'bold', fontSize: '.9rem',marginTop:'2%'}}>Net Amount
            <span style={{fontWeight: 'bold', fontSize: '.9rem', float: 'right',color:'grey'  }}>&#x20b9;{totalprice}</span>
        </div>
                    </div>
                    </div>
                    </div>

                    <div style={{display:'flex',width:'100%',justifyContent:'center',border:matches5?'':'2px solid #dfe6e9',borderRadius:10,marginTop:10,overflow:'hidden'}} >
    <div style={{display:'flex',width:'97%',paddingTop:'2%',paddingBottom:'2%'}}>
        <div>
        <img src={`${serverurl}/images/${imgsrc[0]}`} style={{width:120}} />
        </div>
        <div style={{marginLeft:'1.5%'}}>
        <div style={{fontWeight:600,fontSize:'.9rem',color:'#008296',overflow:'auto'}}>
        {product?.productname}
            </div>

            <div style={{fontWeight:600,whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis",fontSize:'.9rem',color:'#008296'}}>
        {product?.productsubname} 
        </div>

        <div style={{display:'flex',flexDirection:matches5?'column':'row',marginTop:10}}>

            <div style={{boxShadow:'.2px .2px 2px #565959',fontSize:'.9rem',paddingLeft:15,paddingTop:3,paddingBottom:5,width:'90px',borderRadius:10,fontWeight:500,color:"#636e72",cursor:'pointer'}}onClick={handleBuyAgain}>Buy it again</div>

            <div style={{boxShadow:'.2px .2px 2px #565959',fontSize:'.9rem',paddingLeft:15,paddingTop:3,paddingBottom:5,width:'150px',borderRadius:10,fontWeight:500,color:"#636e72",marginLeft:matches5?'':10,marginTop:matches5?'3%':'',cursor:'pointer'}} onClick={()=>{navigate('/showproductdetails',{state:{product:product}})}}>View product details</div>
        </div>
      
        </div>
    </div>

     
        
    </div>

            </div>
        </div>
    </div>)
}