import { useStyle} from "../css/BrandCss"
import MaterialTable from "@material-table/core"
import { Avatar, Button , Grid , TextField,FormControl,MenuItem,Select,InputLabel,FormHelperText} from "@mui/material"
import { useEffect, useState } from "react"
import { getData, serverurl  , postData} from "../../services/fetchnodeservices"
import {Dialog,DialogTitle,DialogActions,DialogContent} from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export default function DisplayAllCategory(){
    const classes = useStyle()
    const [categoryData,setCategoryData] = useState()
    const [status,setStatus]=useState(false)
    const [brandId,setBrandId]=useState('')
    const [categoryName,setCategoryName]=useState('')
    const [icon,setIcon]=useState({bytes:'',file:'fake.png'})
    const [errorMessage,setErrorMessage]=useState('')
    const [categoryId,setCategoryId] = useState()
    const [btnStatus,setBtnStatus] = useState(false)
    const [prevPicture,setPrevPicture] = useState()
    const [brandList,setBrandList] = useState([])
    const navigate=useNavigate()

    const fetchAllBrands = async()=>{
      var result = await getData('brands/display_all_brands')
      setBrandList(result.data)
  }

  const displayBrands = ()=>{
      return brandList?.map((item)=>{
          return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
      })
  }

  useEffect(function(){
      fetchAllBrands()
  },[])

    useEffect(function(){
      fetchAllCategory()
    },[])

    const fetchAllCategory = async()=>{
      var result = await getData('category/fetch_all_category')
      setCategoryData(result.data)
      // console.log(result.data)
    }

    const handleChangeIcon = (e)=>{
      // setPrevPicture(icon.bytes)
      setIcon({bytes:e.target.files[0],file:URL.createObjectURL(e.target.files[0])})
      setBtnStatus(true)
      
  }

  function twoBtn(){
    return(<div>
      <Button onClick={editCategoryIcon}>save</Button>
      <Button onClick={handleCancle}>cancle</Button>
      </div>
    )
  }

  const handleError = (message,lable)=>{
      setErrorMessage((prev)=>({...prev,[lable]:message}))
      
  }

  const handelSubmit = async()=>{

      var error = false
      if(brandId.length == 0){
          handleError("Pls Enter Brand Id...",'brandid')
          error = true
      }

      if(categoryName.length == 0){
          handleError("Pls Enter category Name...",'categoryname')
          error = true
      }

      if(error == false){
          var body = {'categoryname':categoryName,'brandid':brandId,'categoryid':categoryId}
          var result = await postData('category/update_category_data',body)

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
      fetchAllCategory()
  }

  const editCategoryIcon = async()=>{
    var error = false
    if(icon.bytes.length==0){
      handleError("Pls select icon....",'icon')
      error = true
  }

  if(error == false){
    var formData = new FormData()
    formData.append('icon',icon.bytes)
    formData.append('categoryid',categoryId)
    var result = await postData('category/edit_category_icon',formData)

    if(result.status){
      Swal.fire({
        icon: "success",
        title: "Category Register",
        text: result.message,
        toast:true
      });
    }else{
      Swal.fire({
        icon: "error",
        title: "Category Register",
        text: result.message,
        toast:true
      });
    }
    setBtnStatus(false)
    fetchAllCategory()
  }
  }

  const handleCancle = ()=>{
    setBtnStatus(false)
    setIcon({bytes:'',file:prevPicture})

  }

  const deleteCategoryData = (rowData)=>{
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
        var result = await postData('category/delete_category_data',{categoryid:rowData.categoryid})
        if(result.status){
        Swal.fire({
          title: "Deleted!",
          text: result.message,
          icon: "success",
          toast:true
        });
      }else{
        Swal.fire({
          title: "Sorry!",
          text: result.message,
          icon: "error",
          toast:true
      });
      }
      fetchAllCategory()
    }
    }) 
  }

    function showCategory (){
        return(
          <MaterialTable
          style={{width:'90%'}}
          title="Category List"
          columns={[
            { title: 'CategoryId', field: 'categoryid' },
            { title: 'BrandId', render:(rowData)=><div>{rowData.brandid}/{rowData.brandname}</div>},
            { title: 'Category Name', field: 'categoryname' },
            {
              title:'Icon',
              render:(rowData)=><div><Avatar src={`${serverurl}/images/${rowData.icon}`} variant="rounded"/></div>
              
            }
       
          ]}
          
          data={categoryData}        
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit User',
              onClick: (event, rowData) => handleDialog(rowData)
            },
            {
              icon: 'delete',
              tooltip: 'delete User',
              onClick: (event, rowData) => deleteCategoryData(rowData)
            },
             {
              icon: 'add',
              tooltip: 'add category',
              isFreeAction:true,
              onClick: (event, rowData) => navigate('/admindashboards/category')
            }
          ]}
        />
        )
    }

    const showCategoryForm = ()=>{
      return(
<Grid container spacing={2}>

<Grid item xs={12}>
<TitleComponent title="Category" />
</Grid>

<Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel>Brand List</InputLabel>
            <Select label="Brands"
            onChange={(e)=>{setBrandId(e.target.value)}} onFocus={()=>{handleError('','brandid')}} helperText={errorMessage.brandid} error={errorMessage.brandid} value={brandId}
            >
            {displayBrands()}
            </Select>
            <FormHelperText style={{ color: "#d32f2f",
            fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            fontWeight: 400,
            fontSize: "0.75rem",
            lineHeight: 1.66,
            letterSpacing: "0.03333em",
            textAlign: "left",
            marginTop: "3px",
            marginRight: "14px",
            marginBottom: "0",
            marginLeft: "14px"}}>{errorMessage.brandid}</FormHelperText>
        </FormControl>

        </Grid>

<Grid item xs={12}>
<TextField fullWidth label="Brand Id" onChange={(e)=>{setBrandId(e.target.value)}} onFocus={()=>{handleError('','brandid')}} helperText={errorMessage.brandid} error={errorMessage.brandid} value={brandId}/>
</Grid>

<Grid item xs={12}>
<TextField fullWidth label="Category Name"  onChange={(e)=>{setCategoryName(e.target.value)}} onFocus={()=>{handleError('','categoryname')}} helperText={errorMessage.categoryname} error={errorMessage.categoryname} value={categoryName}/>
</Grid>

<Grid item xs={6} className={classes.center}>
  {btnStatus?twoBtn():
<div style={{display:'flex',flexDirection:'column'}}>
    <Button component="label" variant="contained">
        Upload
        <input type="file" hidden accept="image/*" multiple onChange={handleChangeIcon} onClick={()=>{handleError('','icon')}}/>
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
      )
    }

    ///////////////////////Edit///////////////////////////////////////

     

    ////////////////////////////////////////////////////////////////////


    //////////////////////////////Dialog///////////////////////////////

      const displayDialog = (rowData)=>{
        return(
          <Dialog open={status} onClose={handleClose}>
            <DialogContent>
              {showCategoryForm()}
            </DialogContent>
            <DialogActions>
              <Button onClick={handelSubmit}>save</Button>
              <Button onClick={handleClose}>close</Button>
            </DialogActions>
          </Dialog>
        )
      }

      const handleDialog = (rowData)=>{
        setStatus(true)
        setBrandId(rowData.brandid)
        setCategoryName(rowData.categoryname)
        setIcon({bytes:'',file:`${serverurl}/images/${rowData.icon}`})
        setCategoryId(rowData.categoryid)
        setPrevPicture(`${serverurl}/images/${rowData.icon}`)
      }

      const handleClose = ()=>{
        setStatus(false)
      }

    /////////////////////////////////////////////////////////////////////

    return(<div className={classes.root}>
        {showCategory()}
        {displayDialog()}
</div>)
}