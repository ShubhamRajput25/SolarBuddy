import { serverurl } from "../../services/fetchnodeservices";
import { Grid } from "@mui/material"
import { useState } from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import { useRef } from "react";
export default function ProductImagesComponent(props)
{ 
  
  const theme = useTheme();
  const matches1=useMediaQuery(theme.breakpoints.down('md'))
  const matches2=useMediaQuery(theme.breakpoints.down('sm'))
  const matches3=useMediaQuery(theme.breakpoints.down(450))
  
  var sldr=useRef()
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows:false,
        vertical:true,
        verticalSwiping:true,
      };
    const [img,setImg]=useState('')
   var images=props.data.picture.split(",")
   const [picture,setPicture]=useState(images[0])

    const showItems = () => {
    return images.map((items) => {

    return (<div onClick={()=>handlePicture(items)} style={{width:'100%'}}>
        <img src={`${serverurl}/images/${items}` }style={{width:'100%',borderRadius:'10%',cursor:'pointer',marginBottom:8}}onClick={handlechangeimage} id="img"/>
        </div>
    
    )
    })
}
const handlechangeimage=(event)=>{
    setImg(event.target.value)
}
const handleForward=()=>{
    sldr.current.slickPrev()
  }

const handleBack=()=>{
  sldr.current.slickNext()
  }
const handlePicture=(item)=>{
  
  setPicture(item)

}
    return(<div style={{width:'99%',marginTop:'5%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
           <Grid container spacing={2}>
            <Grid item md={12} style={{display:'flex',alignItems:'center'}}>
            <Grid item md={1} sm={1} xs={1} style={{margin:'5%'}}>

            <div style={{width:'100%'}}>

            <div style={{width:'100%',padding:5, height:'100%',position:'relative' }}>

            <KeyboardArrowUpIcon onClick={handleBack} style={{ cursor:'pointer', color:'grey',fontSize:'3rem',position:'absolute',left:matches3?'-7%':'20%',top:"-12%",zIndex:2}} />

            <Slider  ref={sldr} {...settings}>
            {showItems()}
            </Slider>
            <KeyboardArrowDownIcon onClick={handleForward} style={{ cursor:'pointer', color:'grey',fontSize:'3rem',position:'absolute',left:matches3?'-7%':'20%',top:"98%",zIndex:2}} />

            </div>
            </div>
            </Grid>
            <Grid item md={10} sm={9} xs={9} style={{marginLeft:'2%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src={`${serverurl}/images/${picture}` }style={{width:'100%',background:'lightgrey'}}/>
            </Grid>
            </Grid>
           </Grid>
  </div>  )
}




    

