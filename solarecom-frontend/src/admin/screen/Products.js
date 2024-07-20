import { useState} from "react"
import {useEffect } from "react"
import { getData,postData } from "../../services/fetchnodeservices"
import { Grid,TextField,Button,Avatar,FormControl,MenuItem,FormHelperText,InputLabel,Select } from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import Swal from "sweetalert2"
import { ProductStyle } from "../css/ProductCss"

export default function Product(){
    const classes = ProductStyle()
    const[brandId,setBrandId]=useState('')
    const[categoryId,setCategoryId]=useState('')
    const[subCategoryName,setSubCategoryName]=useState('')
    const[icon,setIcon]=useState({bytes:'',file:'fake.png'})
    const[errorMessage,setErrorMessage]=useState({})
    const [subCategoryId,setSubCategoryId] = useState('')
    const [productName,setProductName] = useState('')
    const [description,setDescription] = useState('')
   
                                             ///DROP DOWN HANDLING//////
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
    const [categoryList,setCategoryList]=useState([])
    const[selectBrand,setSelectBrand]=useState('')
    
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

    const [subCategoryList,setSubCategoryList] = useState([])

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
    
    const handleAvatarChange=(event)=>{
      
        setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
    
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

        if(icon.bytes.length==0){
            handleError("Pls Select Icon..",'icon')

        }

        if(description.length==0){
            handleError("Pls Input Description...",'description')

        }

         if(error==false){
            // console.log("subcategoryid :- ",subCategoryId)
        var formData=new FormData()
        formData.append('brandid',brandId)
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('icon',icon.bytes)
        formData.append('productname',productName)
        formData.append('description',description)
        var result= await postData ('products/add_new_product' ,formData)
       
       
       
        if(result.status)
        {
         Swal.fire({
            icon:"success",
            title:" Product Register",
            text:"Product Submitted Successfully",
            

         })
             
        }
        else{
            Swal.fire({
                icon:"error",
                title:"Product Register",
                text:result.message,
                
    
    
             })

        }
    }
      }
    return(<div className={classes.root} >
        <div className={classes.box}>
  
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TitleComponent title=" Product Register" link="/admindashboards/displayallproducts"/>
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
                  id='category'
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
                <TextField label='Product Name' error={errorMessage.productname} 
                helperText={errorMessage.productname} onFocus={()=>handleError('','productname')} onChange={(event)=>setProductName(event.target.value)} fullWidth/>
            </Grid>

            <Grid item xs={12}>
                <TextField label='Description' error={errorMessage.description} 
                helperText={errorMessage.description} onFocus={()=>handleError('','description')} onChange={(event)=>setDescription(event.target.value)} fullWidth/>
            </Grid>

            <Grid xs={6} item className={classes.center}> 
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
            </Grid>

            <Grid item xs={6} className={classes.center}>
                <Avatar alt="Brand" src={icon.file} variant="square"/>
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

    </div>)
}