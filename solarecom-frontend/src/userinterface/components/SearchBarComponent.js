import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
export default function Home(props){

    const [pattern,setPattern]=useState('')
    let navigate=useNavigate()
    const handleSearchIcon=()=>{
        navigate(`/ShowProductsByCategory/${pattern}`)
    }

    const handleEnter=(e)=>{
        if(e.key=='Enter')
         navigate(`/ShowProductsByCategory/${pattern}`)
    }

    return(
<div style={{width:props.width,height:40,background:'#fff',borderRadius:20,display:'flex',justifyContent:'space-between',alignItems:'center',paddingLeft:10}}>
<input onKeyUp={handleEnter}  onChange={(e)=>setPattern(e.target.value)} type="text" placeholder='Search items and brands...' style={{width:'80%',height:30,border:0,outline:'none',fontSize:18,color:'#636e72'}}/>
<SearchIcon onClick={handleSearchIcon}  style={{color:'black',fontSize:34,padding:10,paddingRight:10}}/>
</div>
    )
}