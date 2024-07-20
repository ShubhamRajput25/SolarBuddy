import logo from "../css/logo.png"
import list from "../css/list.png"
import {useNavigate} from "react-router-dom"

export default function TitleComponent(props){
    const navigate=useNavigate()
    return(<div style={{display:'flex' , alignItems:'center'}}>
        <img src={logo} width={45} />
        <div style={{marginLeft:10}}>
            {props.title}
        </div>

        <div style={{marginLeft:'auto'}}>
        <img src={list} width={45} onClick={()=>navigate(props.link)} />
        </div>
    </div>)
}