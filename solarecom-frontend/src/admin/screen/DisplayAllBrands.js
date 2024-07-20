import MaterialTable from "@material-table/core"
import { useStyle } from "../css/BrandCss"
import { useState ,useEffect} from "react"
import { getData, serverurl } from "../../services/fetchnodeservices"
import {Dialog,DialogTitle,DialogContent,DialogActions} from "@mui/material"
import { Avatar, Button, Grid, TextField } from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import { postData } from "../../services/fetchnodeservices"
import Swal from "sweetalert2"
import {useNavigate} from "react-router-dom"

export default function DisplayAllBrands(){

const classes=useStyle()
const [BrandsData,setBrandsData] = useState()
const [Status,setStatus] = useState(false)

const fetchAllBrands=async()=>{
  var result = await getData('brands/display_all_brands')
  setBrandsData(result.data)
}

useEffect(function(){
  fetchAllBrands()
},[])


////////////////////////////Edit/////////////////////////

const [brandName,setBrandName]=useState('')
const [icon,setIcon]=useState({bytes:'',file:'fake.png'})
console.log("hello",brandName)
const [errorMessage,setErrorMessage]=useState({})
const [brandId,setBrandId] = useState()
const [btnStatus,setBtnStatus] = useState(false)
const [prePicture,setPrePicture] = useState('')
const navigate=useNavigate()
const twoBtn = ()=>{
  return(<div>
  <Button onClick={updateBrandIcon}>save</Button>
  <Button onClick={handleCancle}>cancle</Button>
  </div>)
}

const handleCancle = ()=>{
  setBtnStatus(false)
  setIcon({bytes:'',file:prePicture})
}

const handelError = (message,label)=>{
  // setErrorMessage({...errorMessage,[label]:message})
  setErrorMessage((prev)=>({...prev,[label]:message}))
}

const updateBrandName = async()=>{
//  console.log(brandName)
//  console.log(icon.bytes) 
  var error = false
  
 if(brandName.length == 0){
  // setErrorMessage({...errorMessage,brandname:'pls enter brand name'})
  handelError("Pls Enter Brand Name....",'brandname')
  error=true
 }

  
  if(error == false){
var body = {'brandname':brandName,'brandid':brandId}
var result = await postData('brands/edit_brandname',body)
// alert(result.message)
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
fetchAllBrands()
}

const updateBrandIcon = async()=>{
    var error = false
    if(icon.bytes.length==0) {
     handelError("Pls select icon...",'icon')
     error=true
    }
    
    if(error == false){
 var formData = new FormData()
 formData.append('icon',icon.bytes)
 formData.append('brandid',brandId)
  var result = await postData('brands/update_brand_icon',formData)
  // alert(result.message)
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
  fetchAllBrands()
  }

const handleDeleteData = (rowData)=>{
  Swal.fire({
    title: "Are you sure to delete this brand?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    toast:true,
  }).then(async(result) => {
    if (result.isConfirmed) {
      var result = await postData('brands/delete_data',{brandid:rowData.brandid})
      if(result.status){
      Swal.fire({
        title: "Deleted!",
        text: result.message,
        icon: "success",
        
      });
    }else{
      Swal.fire({
        title: "Sorry!",
        text: result.message,
        icon: "error",
       
    });
    }
    fetchAllBrands()
  }
  });
 
}

const handelIconChange=(event)=>{
  console.log("brand ka icon ",URL.createObjectURL(event.target.files[0]))
  console.log("shubham",Object.values(event.target.files))
  setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
  setBtnStatus(true)
}

const showBrandsForm = ()=>{
  return(<div >

      <Grid container spacing={2}>
    <Grid item xs={12}>
          <TitleComponent title="Edit Brand"/>
    </Grid>

    <Grid item xs={12}>
    <TextField value={brandName} error={errorMessage.brandname} helperText={errorMessage.brandname} onFocus={()=>{handelError('','brandname')}} onChange={(e)=>{setBrandName(e.target.value)}} label="Brand Name" fullWidth/>
    </Grid>

    <Grid item xs={6} className={classes.center}>
    {btnStatus?twoBtn():
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
        }
    </Grid>

    <Grid item xs={6} className={classes.center}>
      <Avatar src={icon.file} alt="abc" variant="rounded"/>
    </Grid>


      </Grid>
    </div>
 )
}

/////////////////////////////////////////////////////////////

///////////////Dialog//////////////////////

const displayDialog=()=>{

  return(
    <Dialog open={Status} onClose={handleClose}>
      <DialogContent>{showBrandsForm()}</DialogContent>
      <DialogActions>
      <Button onClick={updateBrandName}>Save</Button>
      <Button onClick={handleClose}>close</Button>
      </DialogActions>
    </Dialog>
  )
}

const handleDialog=(rowData)=>{
  setStatus(true)
  setBrandName(rowData.brandname)
  setBrandId(rowData.brandid)
  setIcon({bytes:' ',file:`${serverurl}/images/${rowData.icon}`})
  setPrePicture(`${serverurl}/images/${rowData.icon}`)
}

const handleClose=()=>{
  setStatus(false)
}


///////////////////////////////////////////////

function SimpleAction() {
  return (
    <MaterialTable
    style={{width:'90%'}}
      title="Brand List"
      columns={[
        { title: 'Brandid', field: 'brandid' },
        { title: 'Brand Name', field: 'brandname' },
        { title: 'Icon', render:(rowData)=><div><Avatar  src={ `${serverurl}/images/${rowData.icon}`}  variant="rounded" /></div>}
        
      ]}
      data={BrandsData}      
      actions={[
        {
          icon: 'edit',
          tooltip: 'edit User',
          onClick: (event, rowData) => handleDialog(rowData)
        },
        {
          icon: 'delete',
          tooltip: 'delete User',
          onClick: (event, rowData) => handleDeleteData(rowData)
        },
        {
          icon: 'add',
          tooltip: 'add User',
          isFreeAction:true,
          onClick: (event, rowData) => navigate('/admindashboards/brands')
        }
      ]}
    />
  )
  }
    return(<div className={classes.root}>  
        {SimpleAction()}
        {displayDialog()}
    </div>)
}