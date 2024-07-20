import { useState} from "react"
import {useEffect } from "react"
import { getData,postData } from "../../services/fetchnodeservices"
import { Grid,TextField,Button,Avatar,FormControl,MenuItem,FormHelperText,InputLabel,Select } from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import Swal from "sweetalert2"
import { useStyle } from "../css/BrandCss"


export default function SubCategory(){
    const classes= useStyle()
    const[brandId,setBrandId]=useState('')
    const[categoryId,setCategoryId]=useState('')
    const[subCategoryName,setSubCategoryName]=useState('')
    const[icon,setIcon]=useState({bytes:'',file:'fake.png'})
    const[errorMessage,setErrorMessage]=useState('')
   
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
        if(subCategoryName.length==0){
            handleError("Pls Input SubCategory Name..",'subcategoryname')

        }

        if(icon.bytes.length==0){
            handleError("Pls Select Icon..",'icon')

        }

         if(error==false){
        var formData=new FormData()
        formData.append('brandid',brandId)
        formData.append('categoryid',categoryId)
        formData.append('subcategoryname',subCategoryName)
        formData.append('icon',icon.bytes)
        var result= await postData('subcategory/add_new_subcategory',formData)
       
       
       
        if(result.status)
        {
         Swal.fire({
            icon:"success",
            title:" SubCategory Register",
            text:"SubCategory Submitted Successfully",
            toast:true

         })
             
        }
        else{
            Swal.fire({
                icon:"error",
                title:"SubCategory Register",
                text:"Not Submitted...Try Again.!",
                toast:true
    
    
             })

        }
    }
      }
      
    return(<div className={classes.root} >
        <div className={classes.box}>
  
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TitleComponent title=" SubCategory Register" link="/admindashboards/displayallsubcategory"/>
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
                <TextField label='SubCategory Name' error={errorMessage.subcategoryname} 
                helperText={errorMessage.subcategoryname} onFocus={()=>handleError('','subcategoryname')} onChange={(event)=>setSubCategoryName(event.target.value)} fullWidth/>
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