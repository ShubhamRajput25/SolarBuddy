import { ProductStyle } from "../css/ProductCss";
import MaterialTable from "@material-table/core"
import { Avatar, Button , Grid , TextField,FormControl,MenuItem,Select,InputLabel,FormHelperText} from "@mui/material"
import { useEffect, useState } from "react"
import { getData, serverurl  , postData} from "../../services/fetchnodeservices"
import {Dialog,DialogTitle,DialogActions,DialogContent} from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"


export default function DisplayAllProduct(){
    const classes = ProductStyle()
    const [productData,setProductData] = useState([])
    const [status,setStatus]=useState(false)
    const [brandId,setBrandId]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [productName,setProductName]=useState('')
    const [icon,setIcon]=useState({bytes:'',file:'fake.png'})
    const [errorMessage,setErrorMessage]=useState('')
    const [productId,setProductId] = useState()
    const [btnStatus,setBtnStatus] = useState(false)
    const [prevPicture,setPrevPicture] = useState()
    const [brandList,setBrandList] = useState([])
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList] = useState([])
    const [description,setDescription] = useState('')
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
        fetchAllProducts()
    },[])

    const fetchAllProducts = async()=>{
        var result = await getData('products/fetch_all_products')
        setProductData(result.data)
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

    const fetchAllSubCategory = async(cid)=>{
        var result=await postData('subcategory/search_by_category',{categoryid:cid})
        setSubCategoryList(result.data)
    }

    const handleChangeCategory = (event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
    }

    const fillSubCategory=(event)=>{
        return subCategoryList?.map((item)=>{
            if(event=item.categoryid){
                return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
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
          formData.append('productid',productId)
          var result = await postData('products/edit_product_icon',formData)
      
          if(result.status){
            Swal.fire({
              icon: "success",
              title: "Product Register",
              text: result.message,
              toast:true
            });
          }else{
            Swal.fire({
              icon: "error",
              title: "product Register",
              text: result.message,
              toast:true
            });
          }
          setBtnStatus(false)
          fetchAllProducts()
        }
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
        if(subCategoryId.length==0){
            handleError("Pls Input SubCategory Id..",'subcategoryid')

        }

        if(productName.length==0){
            handleError("Pls Input Product Name...",'productname')
        }


        if(description.length==0){
            handleError("Pls Input Description...",'description')

        }

         if(error==false){
          var body = {'productname':productName,'brandid':brandId,'categoryid':categoryId,'subcategoryid':subCategoryId,'description':description,'productid':productId}
        var result= await postData ('products/update_product_data' ,body)
       
       
       
        if(result.status)
        {
         Swal.fire({
            icon:"success",
            title:" Product Register",
            text:"Product Submitted Successfully",
            toast:true

         })
             
        }
        else{
            Swal.fire({
                icon:"error",
                title:"Product Register",
                text:result.message,
                toast:true
    
    
             })

        }
        fetchAllProducts()
    }
      }

      const deleteProductData = (rowData)=>{
        Swal.fire({
          title: "Are you sure to delete this product?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
          toast:true,
        }).then(async(result) => {
          if (result.isConfirmed) {
            var result = await postData('products/delete_product_data',{productid:rowData.productid})
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
          fetchAllProducts()
        }
        }) 
      }

    const showProductForm =()=>{
     return(
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <TitleComponent title=" Product Register"/>
      </Grid>

      <Grid item xs={4}>
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
      <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
          
            label="Category"
            onChange={handleChangeCategory}
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
    
      <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>SubCategory</InputLabel>
            <Select
            id='subcategory'
            label="SubCategory"
            onChange={(event)=>setSubCategoryId(event.target.value)}
            value={subCategoryId}
            error={errorMessage.subcategoryid}
            helperText={errorMessage.subcategoryid}
            onFocus={()=>handleError('','subcategoryid')}
            >
           
            {fillSubCategory()}
            
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
marginLeft: "14px" }}>{errorMessage.subcategoryid}</FormHelperText>
          </FormControl>
          
      </Grid>

      <Grid item xs={12}>
          <TextField label='Product Name' error={errorMessage.productname} value={productName}
          helperText={errorMessage.productname} onFocus={()=>handleError('','productname')} onChange={(event)=>setProductName(event.target.value)} fullWidth/>
      </Grid>

      <Grid item xs={12}>
          <TextField label='Description' error={errorMessage.description} value={description}
          helperText={errorMessage.description} onFocus={()=>handleError('','description')} onChange={(event)=>setDescription(event.target.value)} fullWidth/>
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

    const handleClose = ()=>{
      setStatus(false)
    }

    const handleDialog = (rowData)=>{
        setStatus(true)
        
        setBrandId(rowData.brandid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setProductId(rowData.productid)
        setProductName(rowData.productname)
        setIcon({bytes:'',file:`${serverurl}/images/${rowData.icon}`})
        setPrevPicture(`${serverurl}/images/${rowData.icon}`)
        setDescription(rowData.description)
        // setCategoryList(rowData.categoryid)
      }

      const displayDialog = (rowData)=>{
        return(
          <Dialog open={status} onClose={handleClose}>
            <DialogContent>
              {showProductForm()}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmit}>save</Button>
              <Button onClick={handleClose}>close</Button>
            </DialogActions>
          </Dialog>
        )
      }

    function showProducts (){
        return(
          <MaterialTable
          style={{width:'90%'}}
          title="Product List"
          options={{
            maxBodyHeight: 400,
          }}
          columns={[
            { title: 'ProductId',render:(rowData)=><div>{rowData.productid}/{rowData.productname}</div> },
            { title: 'BrandId', render:(rowData)=><div>{rowData.brandid}/{rowData.brandname}</div>},
            { title: 'CategoryId', render:(rowData)=><div>{rowData.categoryid}/{rowData.categoryname}</div>},
            { title: 'SubCategoryId', render:(rowData)=><div>{rowData.subcategoryid}/{rowData.subcategoryname}</div>},
            {
              title:'Icon',
              render:(rowData)=><div><Avatar src={`${serverurl}/images/${rowData.icon}`} variant="rounded"/></div>
              
            },
       
          ]}
          
          data={productData}        
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit User',
              onClick: (event, rowData) => handleDialog(rowData)
            },
            {
              icon: 'delete',
              tooltip: 'delete User',
              onClick: (event, rowData) => deleteProductData(rowData)
            },
            {
              icon: 'add',
              tooltip: 'add product',
              isFreeAction:true,
              onClick: (event, rowData) => navigate('/admindashboards/products')
            }
          ]}
        />
        )
    }

    return(<div className={classes.root}>
          {showProducts()}
          {displayDialog()}
  </div>)
}