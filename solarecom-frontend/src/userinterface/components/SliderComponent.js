import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverurl } from "../../services/fetchnodeservices";

export default function SliderComponent(){

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:2500
      };

      var images = ['ba1.jpg','ba2.jpg','ba3.jpg','ba4.jpg']

      const showItems=()=>{
        return images?.map((item)=>{
            return <div>
              <img src={`${serverurl}/images/${item}`} style={{width:'100%'}}/></div>
        })
      }

    return(<div style={{width:'100%'}}>
    <Slider {...settings}>
        {showItems()}
    </Slider>
    </div>)
}