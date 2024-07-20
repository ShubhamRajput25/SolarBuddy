import { getData, serverurl  , postData} from "../../services/fetchnodeservices"
import { useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
export default function BrandComponent(props){
    var items=props.data
    let theme = useTheme()
    const matches3=useMediaQuery(theme.breakpoints.down(450))
    let navigate=useNavigate()

    const showItems=()=>{
        return items.map((item)=>{
            return <div style={{display:'flex',
            flexDirection:'column',
            justifyContent:'center',alignItems:'center',flex: matches3 ? '0 0 40%' :'0 0 19.3%',border:'1px solid #dfe6e9',background:'#fff',height:'80%',padding:matches3?'4%':''}}
            onClick={()=>{navigate(`/ShowProductsByCategory/${item.brandname}`)}}
            >
                <div style={{width:'60%'}}>
                <img src={`${serverurl}/images/${item.icon}`}  style={{width:'100%'}}/>
                </div>
                </div>
                
        })
    }
    return(<div style={{display:'flex',flexWrap:'wrap',listStyle:'none',justifyContent:'center',width:'100%',height:'100%'}} >
{showItems()}

    </div>)
}