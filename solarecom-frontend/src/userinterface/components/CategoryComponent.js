import { getData, serverurl  , postData} from "../../services/fetchnodeservices"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CategoryComponent(props){

    let theme = useTheme()
    const matches1=useMediaQuery(theme.breakpoints.down('md'))
    const matches2=useMediaQuery(theme.breakpoints.down('sm'))
    const matches3=useMediaQuery(theme.breakpoints.down(450))
    const navigate=useNavigate()
    var sldr=useRef()

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: matches1 ?matches2 ? matches3 ?2:3:4:6,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:3000
      };
   

    const showItems=()=>{
        return props?.data.map((item)=>{
            return <div style={{display:'flex',
            flexDirection:'column',
            justifyContent:'center',alignItems:'center',marginRight:10}}
            onClick={()=>{navigate(`/ShowProductsByCategory/${item.categoryname}`)}}>
                <div style={{width:matches3?'75%':'97%',height:'100%',borderRadius:'50%',background:'#dfe4ea',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <img src={`${serverurl}/images/${item.icon}`}  style={{width:'100%',height:'100%'}}/>
                </div>
                <div style={{fontWeight:'bold',fontSize:matches3?'.7rem': matches2?'.8rem':'.8rem',letterSpacing:'0.5',textAlign:'center',width:matches3?'75%':'100%'}}>{item.categoryname}</div>
                </div>      
        })

    
    }

    const handleBackword=()=>{
        sldr.current.slickPrev()
    }

    const handleForword=()=>{
        sldr.current.slickNext()
    }

    return(<div style={{display:'flex',position:'relative',width:'100%',justifyContent:'center'}} >
 {matches3?<></>: <ArrowBackIosIcon style={{fontSize:'2vw',color:'grey',position:'absolute',top:'36%',left:'-5%',cursor:'pointer'}} onClick={handleBackword}/> }
        <div style={{width:'100%',marginLeft:matches3?'11%':''}}>
        <Slider ref={sldr} {...settings}>
        {showItems()}
    </Slider>

</div>
{matches3?<></>: <ArrowForwardIosIcon style={{fontSize:'2vw',color:'gray',position:'absolute',top:'36%',right:'-5%',cursor:'pointer'}} onClick={handleForword}/> }
    </div>)
}