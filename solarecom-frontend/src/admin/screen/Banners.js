import { BannerStyle } from "../css/BannerCss";
import { useState} from "react"
import {useEffect } from "react"
import { getData,postData } from "../../services/fetchnodeservices"
import { Grid,TextField,Button,Avatar,FormControl,MenuItem,FormHelperText,InputLabel,Select } from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import Swal from "sweetalert2"

export default function Banners(){
    const classes = BannerStyle()
    const[brandId,setBrandId]=useState('')
    const [bannerName,setBannerName] = useState('')
    const[picture,setPicture]=useState({bytes:'',file:'fake.png'})
    const[errorMessage,setErrorMessage]=useState({})
    const [brandList,setBrandList]=useState([])
    const fetchAllBrands=async()=>{
      var result=await getData('brands/display_all_brands')
      setBrandList(result.data)
    
    }
    useEffect(function(){
      fetchAllBrands()
    
    },[])
    
    const fillBrands=()=>{
    return brandList?.map((item)=>{
    
        return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
    })
    
    }
    const handleError=(message,label)=>{
        setErrorMessage((prev)=>({...prev,[label]:message}))

      }

      const handlePictureChange=(event)=>{
      
        setPicture({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
    
      }

      const handleSubmit = async()=>{
       
         var error = false
         
        if(bannerName.length == 0){
         handleError("Pls Enter Brand Name....",'bannername')
         error=true
        }

        if(brandId.length == 0){
          handleError("Pls Enter Brand Id....",'brandid')
          error=true
         }
     
        if(picture.bytes.length==0)
        {
         handleError("Pls select icon...",'picture')
         error=true
        }
      
         
         if(error == false){
       var formData = new FormData()
       formData.append('bannername',bannerName)
       formData.append('picture',picture.bytes)
       formData.append('brandid',brandId)
       var result = await postData('banners/add_new_banner',formData)
       if(result.status){
         Swal.fire({
           icon: "success",
           title: "Brand Register",
           text: result.message,
           toast:true
         });
       }else{
         Swal.fire({
           icon: "error",
           title: "Brand Register",
           text: result.message,
           toast:true
         });
       }
     }
       
       }


    return (
        <div className={classes.root}>
            <div className={classes.box}>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <TitleComponent title="Banner"/>
                </Grid>

                <Grid item xs={12}>
                   <FormControl fullWidth >
                    <InputLabel>Brands</InputLabel>
                    <Select
                    value={brandId}
                    label="Brands"
                    onChange={(e)=>setBrandId(e.target.value)}
                    error={errorMessage.brandid}
                    helperText={errorMessage.brandid}
                    onFocus={()=>handleError('','brandid')}
                    >
                        {fillBrands()}
                    </Select>
                    <FormHelperText style={{fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontWeight: 400,
  color:' #d32f2f',
  fontSize: "0.75rem",
  lineHeight: 1.66,
  letterSpacing: "0.03333em",
  textAlign: "left",
  marginTop: "3px",
  marginRight: "14px",
  marginBottom: "0",
  marginLeft: "14px" }}>{errorMessage.brandid}</FormHelperText>
                
                   </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Banner Name" onChange={(e)=>setBannerName(e.target.value)} error={errorMessage.bannername} helperText={errorMessage.bannername} onFocus={()=>handleError('','bannername')} fullWidth />
                </Grid>

                <Grid item xs={6}>
                <div style={{display:'flex',flexDirection:'column'}}> 
                <Button  onClick={()=>handleError('','picture')} component='label' variant="contained">
                    upload
                    <input  onChange={handlePictureChange} type="file" accept="image/*" multiple hidden />
                </Button>
                {errorMessage.picture==undefined?<div></div>:errorMessage.picture?<div  style={{fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontWeight: 400,
  color:' #d32f2f',
  fontSize: "0.75rem",
  lineHeight: 1.66,
  letterSpacing: "0.03333em",
  textAlign: "left",
  marginTop: "3px",
  marginRight: "14px",
  marginBottom: "0",
  marginLeft: "14px" }}>
                        Pls Select Picture..</div>:<div></div>}
                        </div>
                </Grid>

                <Grid item xs={6} className={classes.center}>
                <Avatar alt="Brand" src={picture.file} variant="square"/>
            </Grid>

            <Grid item xs={6}>
                <Button fullWidth variant="contained" onClick={handleSubmit}>Submit
                </Button>
            </Grid>

            <Grid item xs={6}> 
            <Button fullWidth variant="contained">Reset</Button>
            </Grid>

            </Grid>
            </div>
        </div>
    )
}