import Header from "../components/Header"
import { useState } from "react";
import ProductdetailComponent from "../components/ProductdetailComponent"
import ProductImagesComponent from "../components/ProductImagesComponent";
import { Grid } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ShippingComponent from '../components/ShippingComponent'
import FooterComponent from '../components/FooterComponent'
import { useLocation } from "react-router-dom";
import { footerStyle } from "../CSS/FooterComponentCss";
export default function ProductDetail()
{
  let classes=footerStyle()
  const theme = useTheme();
  var location=useLocation()
  const [pageRefresh,setPageRefresh]=useState(false)
  var product=location.state.product
  console.log("from location",product)
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const matches3 = useMediaQuery(theme.breakpoints.down(450));
return(<div style={{fontFamily:'Poppins' ,width:'100%' }}>
    <Header/>

{matches?
<div style={{width:'100%',marginTop:'126.5px',marginBottom:'8%'}}>
<div style={{width:'99%',display:'flex',justifyContent:'center',alignItems:'center'}}>
<Grid container spacing={2} >
<Grid item xs={12}>
<ProductImagesComponent data={product}  />
</Grid>
<Grid item sm={8} xs={11.5} >
<ProductdetailComponent  pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} data={product} />
</Grid>
</Grid>
</div>
</div>:
<div style={{width:'100%',marginTop:'5%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',marginBottom:'5%'}}>
<Grid container spacing={2}>
<Grid item xs={7}>
<ProductImagesComponent data={product}  />
</Grid>
<Grid item xs={4}style={{display:'flex',alignItems:'center'}}>
<ProductdetailComponent  pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} data={product} />
</Grid>
</Grid>
</div>}

<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',marginBottom:matches3?'12%':'3%'}}>
<ShippingComponent />
</div>

  <div className={classes.root}>
        <FooterComponent />
    </div>

</div>)
}