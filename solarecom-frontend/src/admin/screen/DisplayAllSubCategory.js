import { useStyle } from "../css/BrandCss";
import MaterialTable from "@material-table/core"
import { Avatar, Button , Grid , TextField,FormControl,MenuItem,Select,InputLabel,FormHelperText} from "@mui/material"
import { useEffect, useState } from "react"
import { getData, serverurl  , postData} from "../../services/fetchnodeservices"
import {Dialog,DialogTitle,DialogActions,DialogContent} from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"


export default function DispalyAllSubCategory(){
    const classes = useStyle()
    const [subCategoryData,setSubCategoryData] = useState()
    const [status,setStatus]=useState(false)
    const [brandId,setBrandId]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [subCategoryName,setSubCategoryName]=useState('')
    const [icon,setIcon]=useState({bytes:'',file:'fake.png'})
    const [errorMessage,setErrorMessage]=useState('')
    const [btnStatus,setBtnStatus] = useState(false)
    const [prevPicture,setPrevPicture] = useState()
    const [brandList,setBrandList] = useState([])
    const [categoryList,setCategoryList]=useState([])
    const navigate=useNavigate()

    function twoBtn(){
        return(<div>
          <Button onClick={editProductIcon}>save</Button>
          <Button onClick={handleCancle}>cancle</Button>
          </div>
        )
      }
  
      const handleCancle = ()=>{
        setBtnStatus(false)
        setIcon({bytes:'',file:prevPicture})
    
      }

      useEffect(function(){
        fetchAllSubCategory()
    },[])

    const fetchAllSubCategory = async()=>{
        var result = await getData('subcategory/fetch_all_subcategory')
        setSubCategoryData(result.data)
    }


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
    
    const fetchAllCategory=async(bid)=>{
        var result=await postData('category/search_by_brand',{brandid:bid})
        setCategoryList(result.data)
      
      }
      const handleChangeBrand=(event)=>{
        setBrandId(event.target.value)
        fetchAllCategory(event.target.value)
    }
      
      
    const fillCategory=(event)=>{
    return categoryList?.map((item)=>{
        if(event=item.brandid){
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        }
    })
    }


    function showSubCategory (){
        return(
          <MaterialTable
          style={{width:'90%'}}
          title="Sub Category List"
          columns={[
            { title: 'subcategoryId', field: 'subcategoryid' },
            { title: 'BrandId', render:(rowData)=><div>{rowData.brandid}/{rowData.brandname}</div>},
            { title: 'CategoryId', render:(rowData)=><div>{rowData.categoryid}/{rowData.categoryname}</div>},
            { title: 'SubCategoryName', field:'subcategoryname'},
            {
              title:'Icon',
              render:(rowData)=><div><Avatar src={`${serverurl}/images/${rowData.icon}`} variant="rounded"/></div>
              
            },
       
          ]}
          
          data={subCategoryData}        
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit User',
              onClick: (event, rowData) => handleDialog(rowData)
            },
            {
              icon: 'delete',
              tooltip: 'delete User',
              onClick: (event, rowData) => deleteSubCategoryData(rowData)
            },
            {
              icon: 'add',
              tooltip: 'add subcategory',
              isFreeAction:true,
              onClick: (event, rowData) => navigate('/admindashboards/subcategory')
            }
          ]}
        />
        )
    }

    const displayDialog = (rowData)=>{
        return(
          <Dialog open={status} onClose={handleClose}>
            <DialogContent>
              {showSubCategoryForm()}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmit}>save</Button>
              <Button onClick={handleClose}>close</Button>
            </DialogActions>
          </Dialog>
        )
      }

      const handleClose = ()=>{
        setStatus(false)
      }
  
      const handleDialog = (rowData)=>{
          setStatus(true)
          setBrandId(rowData.brandid)
          setCategoryId(rowData.categoryid)
          setSubCategoryId(rowData.subcategoryid)
          setSubCategoryName(rowData.subcategoryname)
          setIcon({bytes:'',file:`${serverurl}/images/${rowData.icon}`})
          setPrevPicture(`${serverurl}/images/${rowData.icon}`)
        }

        const showSubCategoryForm = ()=>{
            return(
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleComponent title=" SubCategory Register"/>
                </Grid>
    
                <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Brands</InputLabel>
                      <Select
                      label="Brands"
                      onChange={handleChangeBrand}
                      value={brandId}
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
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                      id='category'
                      label="Category"
                      onChange={(event)=>setCategoryId(event.target.value)}
                      value={categoryId}
                      error={errorMessage.categoryid}
                      helperText={errorMessage.categoryid}
                      onFocus={()=>handleError('','categoryid')}
                      >
                     
                      {fillCategory()}
                      
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
      marginLeft: "14px" }}>{errorMessage.categoryid}</FormHelperText>
                    </FormControl>
                    
                </Grid>
              
    
                <Grid item xs={12}>
                    <TextField label='SubCategory Name' error={errorMessage.subcategoryname} value={subCategoryName}
                    helperText={errorMessage.subcategoryname} onFocus={()=>handleError('','subcategoryname')} onChange={(event)=>setSubCategoryName(event.target.value)} fullWidth/>
                </Grid>
    
                <Grid xs={6} item className={classes.center}> 
                {btnStatus?twoBtn():
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <Button  onClick={()=>handleError('','icon')} component='label' variant="contained">
                        upload
                        <input  onChange={handleAvatarChange} type="file" accept="image/*" multiple hidden />
                    </Button>
                    {errorMessage.icon==undefined?<div></div>:errorMessage.icon?<div  style={{fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
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
                            Pls Select Icon..</div>:<div></div>}
                            </div>
        }
                </Grid>
    
                <Grid item xs={6} className={classes.center}>
                    <Avatar alt="Brand" src={icon.file} variant="square"/>
                </Grid>
    
            </Grid>
            )
        }

        const handleAvatarChange=(event)=>{
      
            setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
            setBtnStatus(true)
        
          }
    
          const handleError=(message,label)=>{
            setErrorMessage((prev)=>({...prev,[label]:message}))
    
          }
          const handleSubmit=async()=>{
    
    
            var error=false
            if(brandId.length==0){
                handleError("Pls Input Brand Id..",'brandid')
    
            }
            if(categoryId.length==0){
                handleError("Pls Input Category Id..",'categoryid')
    
            }
            if(subCategoryName.length==0){
                handleError("Pls Input SubCategory Name..",'subcategoryname')
    
            }
    
    
             if(error==false){

            var body = {brandid:brandId,categoryid:categoryId,subcategoryname:subCategoryName,subcategoryid:subCategoryId}
            var result= await postData ('subcategory/update_subcategory_data' ,body)

            if(result.status)
            {
             Swal.fire({
                icon:"success",
                title:" SubCategory Register",
                text:"SubCategory Edit Successfully",
                toast:true
    
             })
                 
            }
            else{
                Swal.fire({
                    icon:"error",
                    title:"SubCategory Register",
                    text:"Not Edit...Try Again.!",
                    toast:true
        
        
                 })
    
            }
        }
          }

          const deleteSubCategoryData = (rowData)=>{
            Swal.fire({
              title: "Are you sure to delete this subCategory?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
              toast:true,
            }).then(async(result) => {
              if (result.isConfirmed) {
                var body = {subcategoryid:rowData.subcategoryid}
                var result = await postData('subcategory/delete_subcategory_data',body)
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
              fetchAllSubCategory()
            }
            }) 
          }

          const editProductIcon = async()=>{
            var error = false
            if(icon.bytes.length==0){
              handleError("Pls select icon....",'icon')
              error = true
          }
        
          if(error == false){
            var formData = new FormData()
            formData.append('icon',icon.bytes)
            formData.append('subcategoryid',subCategoryId)
            var result = await postData('subcategory/edit_subcategory_icon',formData)
        
            if(result.status){
              Swal.fire({
                icon: "success",
                title: "subcategory Register",
                text: result.message,
                toast:true
              });
            }else{
              Swal.fire({
                icon: "error",
                title: "subcategory Register",
                text: result.message,
                toast:true
              });
            }
            setBtnStatus(false)
            fetchAllSubCategory()
          }
          }

    return(<div className={classes.root} >      
           {showSubCategory()}
           {displayDialog()}
    </div>)
}