  import {useState} from "react"
  import { Avatar, Button, Grid, TextField } from "@mui/material"
  import { useStyle } from "../css/BrandCss"
  import TitleComponent from "../components/TitleComponent"
  import { postData } from "../../services/fetchnodeservices"
  import Swal from "sweetalert2"


export default function Brands(){

  const classes = useStyle()
  const [brandName,setBrandName]=useState('')
  const [icon,setIcon]=useState({bytes:'',file:'fake.png'})
  // console.log("hello",brandName)
  const [errorMessage,setErrorMessage]=useState({})


  const handelError = (message,label)=>{
    // setErrorMessage({...errorMessage,[label]:message})
    setErrorMessage((prev)=>({...prev,[label]:message}))
  }

  const handelSubmit = async()=>{
   console.log(brandName)
   console.log(icon.bytes) 
    var error = false
    
   if(brandName.length == 0){
    // setErrorMessage({...errorMessage,brandname:'pls enter brand name'})
    handelError("Pls Enter Brand Name....",'brandname')
    error=true
   }

   if(icon.bytes.length==0)
   {
    handelError("Pls select icon...",'icon')
    error=true
   }
 
    
    if(error == false){
  var formData = new FormData()
  formData.append('brandname',brandName)
  formData.append('icon',icon.bytes)
  var result = await postData('brands/add_new_brand',formData)
  console.log(result.message)
  if(result.status){
    Swal.fire({
      icon: "success",
      title: "Brand Register",
      text: result.message
    });
  }else{
    Swal.fire({
      icon: "error",
      title: "Brand Register",
      text: result.message
    });
  }
}
  
  }

  const handelIconChange=(event)=>{
    setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
  }



    return(<div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={2}>
      <Grid item xs={12}>
            <TitleComponent title="Brand Register" link="/admindashboards/displayallbrands"/>
      </Grid>

      <Grid item xs={12}>
      <TextField error={errorMessage.brandname} helperText={errorMessage.brandname} onFocus={()=>{handelError('','brandname')}} onChange={(e)=>{setBrandName(e.target.value)}} label="Brand Name" fullWidth/>
      </Grid>

      <Grid item xs={6} className={classes.center}>
        <div style={{display:'flex' , flexDirection:'column'}}>
      <Button component="label" variant="contained">
        Upload
        <input onClick={()=>{handelError('','icon')}} onChange={handelIconChange} type="file" hidden accept="image/*" multiple />
      </Button>
      {errorMessage.icon==undefined?<div></div>:errorMessage.icon?<div style={{ color: "#d32f2f",
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontWeight: 400,
  fontSize: "0.75rem",
  lineHeight: 1.66,
  letterSpacing: "0.03333em",
  textAlign: "left",
  marginTop: "3px",
  marginRight: "14px",
  marginBottom: "0",
  marginLeft: "14px"}}>{errorMessage.icon}</div>:<div></div>}
      </div>
      </Grid>

      <Grid item xs={6} className={classes.center}>
        <Avatar src={icon.file} alt="abc" variant="rounded"/>
      </Grid>

      <Grid item xs={6} className={classes.center}>
      <Button onClick={handelSubmit} fullWidth variant="contained">
        Submit
      </Button>
      </Grid>

      <Grid item xs={6} className={classes.center}>
      <Button  fullWidth variant="contained">
        Reset
      </Button>
      </Grid>


        </Grid>
      </div>
    </div>)
}