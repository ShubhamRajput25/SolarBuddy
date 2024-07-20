import { productDetailsStyle } from "../css/ProductDetailsCss"
import {Grid , FormControl , InputLabel , MenuItem , FormHelperText , Select, TextField, Button, Avatar } from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import { useState , useEffect } from "react"
import { getData, postData } from "../../services/fetchnodeservices"
import Swal from "sweetalert2"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ProductDetails(){
    const classes = productDetailsStyle()
    const [brandList,setBrandList]=useState([])
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [productList,setProductList]=useState([])
    const [brandId,setBrandId]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [productId,setProductId]=useState('')
    const [productSubName,setProductSubName]=useState('')
    const [description,setDescription]=useState('')
    const [weight,setWeight]=useState('')
    const [weightType,setWeightType]=useState('')
    const [packaging,setPackaging]=useState('')
    const [qty,setQty]=useState('')
    const [price,setPrice]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const [offerType,setOfferType]=useState('')
    const [picture,setPicture]=useState({file:[]})
    const [errorMessage,setErrorMessage]=useState({})

console.log(packaging)

    useEffect(function(){
        fetchAllBrands()
    },[])

    const fetchAllBrands = async()=>{
        var result=await getData('brands/display_all_brands')
        setBrandList(result.data)
    }

    const displayBrandList = ()=>{
        return brandList?.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    const handleChangeBrand = (event)=>{
        fetchAllCategory(event.target.value)
        setBrandId(event.target.value)
    }

    const fetchAllCategory = async(bid)=>{
        var result = await postData('category/search_by_brand',{brandid:bid})
        setCategoryList(result.data)
    }

    const displayCategoryList = ()=>{
        return categoryList?.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handleChangeCategory = (event)=>{
        fetchAllSubCategory(event.target.value)
        setCategoryId(event.target.value)
    }

    const fetchAllSubCategory = async(cid)=>{
        var result = await postData('subcategory/search_by_category',{categoryid:cid})
        setSubCategoryList(result.data)
    }

    const displaySubCategoryList = ()=>{
        return subCategoryList?.map((item)=>{
            return <MenuItem value={item.subcategoryid} >{item.subcategoryname}</MenuItem>
        })
    }

    const handleChangeSubCategory = (event)=>{
        fetchAllProduct(event.target.value)
        setSubCategoryId(event.target.value)
    }

    const fetchAllProduct = async(scid)=>{
        var result = await postData('products/search_by_subcategory',{subcategoryid:scid})
        setProductList(result.data)
    }

    const displayProductList = ()=>{
        return productList?.map((item)=>{
            return <MenuItem value={item.productid} >{item.productname}</MenuItem>
        })
    }

    const handlePictureChange =(event)=>{

        if(Object.values(event.target.files).length<3){
            Swal.fire({
                icon: "error",
                title: "Please Upload 4 or more files",
                timer:1500,
                toast:true
              });
        }else{
            console.log("shubham",Object.values(event.target.files))
        setPicture({file:Object.values(event.target.files)})
        }
    }

    const showPictures = ()=>{

        return picture?.file.map((item)=>{
            return <div style={{margin:2}}>  
              <Avatar src={URL.createObjectURL(item)} alt="picture" variant="rounded" />
            </div>
        })
  
    }

    const handleError = (message,label)=>{
        setErrorMessage((prev)=>({...prev,[label]:message}))
    }

    const submit = async()=>{
            var error = false

        if(productSubName.length==0){
            handleError("Plz Enter Product Subname....",'productsubname')
            error=true
        }

        if(description.length==0){
            handleError("Plz Enter Description....",'description')
            error=true
        }

        if(weight.length==0){
            handleError("Plz Enter weight....",'weight')
            error=true
        }

        if(weightType.length==0){
            handleError("Plz Enter weight type....",'weighttype')
            error=true
        }

        if(packaging.length==0){
            handleError("Plz Select Packaging....",'packaging')
            error=true
        }


        if(qty.length==0){
            handleError("Plz Enter qty....",'qty')
            error=true
        }

        if(price.length==0){
            handleError("Plz Enter Price....",'price')
            error=true
        }

        if(offerPrice.length==0){
            handleError("Plz Enter Offer Price....",'offerprice')
            error=true
        }

        if(offerType==0){
            handleError("Plz Select offer Type....",'offertype')
            error=true
        }

        if(brandId.length==0){
            handleError("Plz Select brand....",'brand')
            error=true
        }

        if(categoryId.length==0){
            handleError("Plz Select category....",'category')
            error=true
        }

        if(subCategoryId.length==0){
            handleError("Plz Select Sub Category ....",'subcategory')
            error=true
        }

        if(productId.length==0){
            handleError("Plz Select product....",'product')
            error=true
        }

        if(picture.file.length==0){
            handleError("Plz Select Picture...",'picture')
            error=true
        }


            if(error==false){
        var formData = new FormData()
        formData.append('brandid',brandId)
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('productid',productId)
        formData.append('productsubname',productSubName)
        formData.append('description',description)
        formData.append('weight',weight)
        formData.append('weighttype',weightType)
        formData.append('packaging',packaging)
        formData.append('qty',qty)
        formData.append('price',price)
        formData.append('offerprice',offerPrice)
        formData.append('offertype',offerType)

        picture.file.map((item,i)=>{
            formData.append('picture'+i,item)
        })
        
        var result = await postData('productdetails/add_new_productdetails',formData)
        if(result.status){
            Swal.fire({
              icon: "success",
              title: "Product Details Register",
              text: result.message,
             
            });
          }else{
            Swal.fire({
              icon: "error",
              title: "Product Details Register",
              text: result.message,
             
            });
          }
       
        }
        
    }

    return(<div className={classes.root}>
<div className={classes.box}>
        <Grid container spacing={2}>

        <Grid item xs={12}>
        <TitleComponent title="Product Details" link="/admindashboards/displayallproductdetails"/>
        </Grid>

        <Grid item xs={3}>
        <FormControl fullWidth>
            <InputLabel>Brands</InputLabel>
            <Select
            label="Brands"
            value={brandId}
            onChange={handleChangeBrand}
            onFocus={()=>handleError('','brandid')}
            error={errorMessage.brand} 
            helperText={errorMessage.brand}
            >
                {displayBrandList()}
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
  marginLeft: "14px" }}>{errorMessage.brand}</FormHelperText>
        </FormControl>
        </Grid>

        <Grid item xs={3} >
            <FormControl fullWidth >
                <InputLabel>Category</InputLabel>
                <Select
                label="Category"
                onChange={handleChangeCategory}
                onFocus={()=>handleError('','category')}
            error={errorMessage.category} 
            helperText={errorMessage.category}
                >
                    {displayCategoryList()}
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
  marginLeft: "14px" }}>{errorMessage.category}</FormHelperText>
            </FormControl>
        </Grid>


        <Grid item xs={3} >
            <FormControl fullWidth >
                <InputLabel>SubCategory</InputLabel>
                <Select
                label="SubCategory"
                onChange={handleChangeSubCategory}
                onFocus={()=>handleError('','subcategory')}
            error={errorMessage.subcategory} 
            helperText={errorMessage.subcategory}
                >
                    {displaySubCategoryList()}
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
  marginLeft: "14px" }}>{errorMessage.subcategory}</FormHelperText>
            </FormControl>
        </Grid>

        <Grid item xs={3} >
            <FormControl fullWidth >
                <InputLabel>Product</InputLabel>
                <Select
                label="Product"
                onChange={(event)=>setProductId(event.target.value)}
                onFocus={()=>handleError('','product')}
            error={errorMessage.product} 
            helperText={errorMessage.product}
                >
                    {displayProductList()}
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
  marginLeft: "14px" }}>{errorMessage.product}</FormHelperText>
            </FormControl>
        </Grid>

        <Grid item xs={12}>
            <TextField fullWidth label="Product SubName" error={errorMessage.productsubname} helperText={errorMessage.productsubname} onFocus={()=>handleError('','prodcutsubname')} onChange={(event)=>setProductSubName(event.target.value)}/>
        </Grid>

        <Grid item xs={12}>
        <ReactQuill theme="snow" value={description} onChange={setDescription} />
            {/* <TextField fullWidth label="Product Description" error={errorMessage.description} helperText={errorMessage.description} onFocus={()=>handleError('','description')} onChange={(event)=>setDescription(event.target.value)}/> */}
        </Grid>
        
        <Grid item xs={3}>
            <TextField fullWidth label="Product Weight" error={errorMessage.weight} helperText={errorMessage.weight} onFocus={()=>handleError('','weight')} onChange={(event)=>setWeight(event.target.value)}/>
        </Grid>

        <Grid item xs={3}>
            <TextField fullWidth label="Weight Type" error={errorMessage.weighttype} helperText={errorMessage.weighttype} onFocus={()=>handleError('','weighttype')} onChange={(event)=>setWeightType(event.target.value)}/>
        </Grid>

        <Grid item xs={3}>
        <FormControl fullWidth>
            <InputLabel>Packaging</InputLabel>
            <Select
            label="Packaging"
            onChange={(event)=>setPackaging(event.target.value)}
            onFocus={()=>handleError('','packaging')}
            error={errorMessage.packaging} 
            helperText={errorMessage.packaging}
            >
                <MenuItem value="Bottle">Bottle</MenuItem>
                <MenuItem value="Box">box</MenuItem>
                <MenuItem value="Cartoon">Cartoon</MenuItem>
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
  marginLeft: "14px" }}>{errorMessage.packaging}</FormHelperText>
        </FormControl>
        </Grid>

        <Grid item xs={3}>
            <TextField fullWidth label="qty" error={errorMessage.qty} helperText={errorMessage.qty} onChange={(event)=>setQty(event.target.value)}/>
        </Grid>

        <Grid item xs={4}>
            <TextField fullWidth label="Price" error={errorMessage.price} helperText={errorMessage.price} onChange={(event)=>setPrice(event.target.value)}/>
        </Grid>

        <Grid item xs={4}>
            <TextField fullWidth error={errorMessage.offerprice} helperText={errorMessage.offerprice} label="Offer Price" onChange={(event)=>setOfferPrice(event.target.value)}/>
        </Grid>

        <Grid item xs={4}>
        <FormControl fullWidth>
            <InputLabel>Offer Type</InputLabel>
            <Select
            label="OfferType"
            onChange={(event)=>setOfferType(event.target.value)}
            onFocus={()=>handleError('','offertype')}
            error={errorMessage.offertype} 
            helperText={errorMessage.offertype}
            >
                <MenuItem value="Festival Offer">Festival Offer</MenuItem>
                <MenuItem value="Month End Sale">Month End Sale</MenuItem>
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
  marginLeft: "14px" }}>{errorMessage.offertype}</FormHelperText>
        </FormControl>
        </Grid>

        <Grid item xs={6} className={classes.center}>
        <div style={{display:'flex',flexDirection:'column'}}>
            <Button component="label" variant="contained" >
                Upload
                <input type="file" hidden onChange={handlePictureChange} accept="image/*" multiple/>
            </Button>
            {errorMessage.picture==undefined?<div></div>:errorMessage.picture?<div style={{ color: "#d32f2f",
            fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
            fontWeight: 400,
            fontSize: "0.75rem",
            lineHeight: 1.66,
            letterSpacing: "0.03333em",
            textAlign: "left",
            marginTop: "3px",
            marginRight: "14px",
            marginBottom: "0",
            marginLeft: "14px"}}>{errorMessage.picture}</div>:<div></div>}
            </div>
        </Grid>

        <Grid item xs={6} className={classes.center} >
                {showPictures()}
        </Grid>

        <Grid item xs={6} >
        <Button variant="contained" fullWidth onClick={submit}>Submit</Button>
        </Grid>

        <Grid item xs={6} >
        <Button variant="contained" fullWidth>Reset</Button>
        </Grid>

        </Grid>
</div>
    </div>)
}