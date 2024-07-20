import { Grid } from "@mui/material";
import { serverurl } from "../../services/fetchnodeservices";
import { useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';
export default function ShippingComponent(){

    const theme = useTheme();
    const matches1=useMediaQuery(theme.breakpoints.down('md'))
    const matches2=useMediaQuery(theme.breakpoints.down('sm'))
    const matches3=useMediaQuery(theme.breakpoints.down(450))

    var items=[{head:'FREE SHIPPING',text:'Free Shipping Order INR 100',icon:'s1.png'},
    {head:'SECURE PAYMENT',text:'We Value Your Security',icon:'s2.png'},
    {head:'ONLINE SUPPORT',text:'We Have Support 24/7',icon:'s3.png'},
    {head:'PAYMENT ON DELIVERY',text:'Cash On Delivery Option',icon:'s4.png'},]

   
    const showItems = ()=>{
        return items.map((item)=>{
            return <div style={{display:'flex',width:matches3?'100%':'20%',justifyContent:matches3?'start':'center',gap:'7%',margin: matches3?'2%':'',flex: matches1 ? '0 0 35%' :''}}>
                <div style={{width:'85%',display:'flex',justifyContent:'start'}}>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginRight:'5%'}}>
                    <img src={`${serverurl}/images/${item.icon}`} width={'100%'} />
                </div>

                <div>
                    <h3 style={{marginBottom:0,fontSize:matches3?'.8rem': matches2?'.6rem':'.8rem',letterSpacing:'0.5',fontWeight:'600'}}>{item.head}</h3>
                    <p style={{marginTop:0,fontSize:matches3?'.6rem':matches2?'.5rem':'.7rem',letterSpacing:'0.5'}}>{item.text}</p>
                </div>
             </div>
            </div>
        })
    }



    return(<div style={{width:matches3?'80%':'100%',background:'#fff'}}>
       <div style={{width:'100%',display:'flex',alignItems:matches3?'start':'center',justifyContent:matches1?'center':'space-between',flexDirection:matches3?'column':'row',flexWrap:'wrap'}}>
        {showItems()}
       </div>
    </div>)
}