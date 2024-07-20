import { useState, useEffect } from "react"
import { getData, postData } from "../../services/fetchnodeservices"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, Grid, List, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { DataGridPro } from '@mui/x-data-grid-pro';
import FilteringCSS from '../CSS/FilteringCSS.css'
import { useNavigate } from "react-router-dom"
import Slider from '@mui/material/Slider';

export default function Filtering({ setProductList , pattern , setTitle,maxPrice,setMaxPrice,minPrice,setMinPrice,value,setValue}) {
  const [categoryList, setCategoryList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [subCategoryList, setSubCategoryList] = useState([])
  const [brandId, setBrandId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [brandAccordionOpen, setBrandAccordionOpen] = useState(false)
  const [categoryAccordionOpen, setCategoryAccordionOpen] = useState(false)
  const [subcategoryAccordionOpen, setSubcategoryAccordionOpen] = useState(false)
  const [brandSearchPattern, setBrandSearchPattern] = useState('')
  const [categorySearchPattern, setCategorySearchPattern] = useState('')
  const [filterProductsByBrands, setFilterProductsByBrands] = useState([])
  const [filterProductsByCategory, setFilterProductsByCategory] = useState([])



  const navigate = useNavigate()

  console.log("row se id mili", brandId)

  useEffect(function () {
    fetchAllBrands()
    fetchAllCategory()
  }, [])

    const handleFillPrice=(data)=>{

      let maxi=Number.MIN_SAFE_INTEGER,mini=Number.MAX_SAFE_INTEGER;

      if(data.length == 0){
        maxi=0
        mini=0
      }
      
      data.map((item)=>{

        if(maxi <= parseInt(item.offerprice)){
          maxi = parseInt(item.offerprice)
        }

        if(mini >= parseInt(item.offerprice)){
          mini = parseInt(item.offerprice)
        }
      })

      setMaxPrice(maxi)
      setMinPrice(mini)
      setValue([mini,maxi])
    }

  const fetchAllCategory = async () => {
    var result = await getData('category/fetch_all_category')
    setCategoryList(result.data)
  }




  const showCatgeoryList = () => {
    return categoryList.map((item) => {
      if (item.categoryname.toLowerCase().includes(categorySearchPattern.toLowerCase())) {
        return <div style={{ margin: '10px 0px', fontSize: '1.1rem' }}> <label>
          <input type="checkbox" check onChange={handleSelectCategory} value={item.categoryname.toLowerCase()} />
          {item.categoryname}
        </label>
        </div>
      }
    })

  }


  const fetchAllBrands = async () => {
    var result = await getData('brands/display_all_brands')
    setBrandList(result.data)
    
  }

  const handleSelectBrands = async (e) => {
    let val = e.target.value
    const index = filterProductsByBrands.indexOf(val);

    if(e.target.checked){

      if(filterProductsByCategory.length >=1){
        setFilterProductsByBrands([...filterProductsByBrands,val])
        let result = await postData('userinterface/fetch_products_by_brands_and_category', { categorylist:filterProductsByCategory ,  brandlist: [...filterProductsByBrands,val] })
          setProductList(result.data)
          handleFillPrice(result.data)
          setTitle(val+","+[...filterProductsByBrands].toString())
      }else{
        setFilterProductsByBrands([...filterProductsByBrands, val ])
        let result = await postData('userinterface/fetch_products_by_brands', {  brandlist: [...filterProductsByBrands,val]  })
        setProductList(result.data)
        handleFillPrice(result.data)
        setTitle(val+","+[...filterProductsByBrands].toString())
      }
    }else{
      if(filterProductsByCategory.length >=1){
        setFilterProductsByBrands( [...filterProductsByBrands.toSpliced(index, 1)])
        if(filterProductsByBrands.length >1){
        let result = await postData('userinterface/fetch_products_by_brands_and_category', { categorylist:filterProductsByCategory ,  brandlist: filterProductsByBrands.toSpliced(index, 1)})
        setProductList(result.data)
        handleFillPrice(result.data)
        // alert(filterProductsByCategory.toSpliced(index, 1).toString())
        setTitle(filterProductsByBrands.toSpliced(index, 1).toString())
        }else{
          let result = await postData('userinterface/fetch_products_by_category', { categorylist:filterProductsByCategory })
          setProductList(result.data)
          handleFillPrice(result.data)
          setTitle(filterProductsByCategory.toString())
        }
      }else{
        setFilterProductsByBrands(filterProductsByBrands.toSpliced(index, 1))

        if(filterProductsByBrands.length >1){  
          let result = await postData('userinterface/fetch_products_by_brands', {bralist:filterProductsByBrands.toSpliced(index, 1)})
          setProductList(result.data)
          handleFillPrice(result.data)
          setTitle(filterProductsByBrands.toSpliced(index, 1).toString())
        }else{
         
          let result= await postData('userinterface/fetch_all_products_pattern',{pattern:pattern})
          setProductList(result.data)
          handleFillPrice(result.data)
          setTitle(pattern)
        }
       
      }
    }
  }

  const handleSelectCategory = async (e) => {
    let val = e.target.value
    const index = filterProductsByCategory.indexOf(val);
    if(e.target.checked){ 

        if(filterProductsByBrands.length >=1){
          setFilterProductsByCategory([...filterProductsByCategory, val])
          let result = await postData('userinterface/fetch_products_by_brands_and_category', { categorylist:[...filterProductsByCategory, val] ,  brandlist: filterProductsByBrands })
          setProductList(result.data)
          handleFillPrice(result.data)
          setTitle(val+","+[...filterProductsByCategory].toString())
        }else{
          setFilterProductsByCategory([...filterProductsByCategory, val])
          let result = await postData('userinterface/fetch_products_by_category', { categorylist:[...filterProductsByCategory, val] })
          setProductList(result.data)
          handleFillPrice(result.data)
          // alert([...filterProductsByCategory].toString())
          setTitle(val+","+[...filterProductsByCategory].toString())
        }

    }else{
      
      if(filterProductsByBrands.length >=1){
        setFilterProductsByCategory( [...filterProductsByCategory.toSpliced(index, 1)])
        if(filterProductsByCategory.length >1){  
        let result = await postData('userinterface/fetch_products_by_brands_and_category', { categorylist:filterProductsByCategory.toSpliced(index, 1) ,  brandlist: filterProductsByBrands })
        setProductList(result.data)
        handleFillPrice(result.data)
        setTitle(filterProductsByCategory.toSpliced(index, 1).toString())
        }else{
          
          let result = await postData('userinterface/fetch_products_by_brands', {brandlist: filterProductsByBrands })
        setProductList(result.data)
        handleFillPrice(result.data)
        setTitle(filterProductsByBrands.toString())
        }
      }else{
        setFilterProductsByCategory(filterProductsByCategory.toSpliced(index, 1))

        if(filterProductsByCategory.length >1){
          let result = await postData('userinterface/fetch_products_by_category', {categorylist:filterProductsByCategory.toSpliced(index,1)})
          setProductList(result.data)
          handleFillPrice(result.data)
          setTitle(filterProductsByCategory.toSpliced(index, 1).toString())
        }else{
          let result= await postData('userinterface/fetch_all_products_pattern',{pattern:pattern})
          setProductList(result.data)
          handleFillPrice(result.data)
          setTitle(pattern)
        }
       
      }

     
    }

    
  }


  console.log(filterProductsByBrands)

  const showBrandList = () => {
    return brandList.map((item) => {
      if (item.brandname.toLowerCase().includes(brandSearchPattern.toLowerCase())) {
        return <div style={{ margin: '10px 0px', fontSize: '1.1rem' }}> <label>
          <input type="checkbox" check onChange={handleSelectBrands} value={item.brandname.toLowerCase()} />
          {item.brandname}
        </label>
        </div>
      }
    })
  }

  const handleBrandSearchPattern = (e) => {
    setBrandSearchPattern(e.target.value)
  }

  const handleBrandList = (item) => {
    fetchAllCategory()
    setBrandAccordionOpen(!brandAccordionOpen)
    navigate(`/ShowProductsByCategory/${item.brandname}`)
  }



  const fetchAllSubcategory = async () => {
    var result = await postData('subcategory/search_by_category', { categoryid: categoryId })
    setSubCategoryList(result.data)
  }


  const handleCategoryList = (item) => {
    fetchAllSubcategory()
    navigate(`/ShowProductsByCategory/${item.categoryname}`)
  }

  const handleChange = async(event, newValue) => {
    setMinPrice(event.target.value[0])
    setMaxPrice(event.target.value[1])
    setValue(newValue);

    if(filterProductsByBrands.length == 0 && filterProductsByCategory.length == 0){// search by only pattern or search by only price

      let result =await postData('userinterface/fetch_products_by_price',{minPrice:event.target.value[0] , maxPrice:event.target.value[1] , pattern:pattern})
      setProductList(result.data)

    }else if(filterProductsByCategory.length == 0){
// search by price and brands
      let result = await postData('userinterface/fetch_products_by_price_and_brands',{brandlist:filterProductsByBrands,minPrice:event.target.value[0] , maxPrice:event.target.value[1]})
      setProductList(result.data)

    }else if(filterProductsByBrands.length == 0){
// search by price and category
let result = await postData('userinterface/fetch_products_by_price_and_category',{categorylist:filterProductsByCategory,minPrice:event.target.value[0] , maxPrice:event.target.value[1]})
      setProductList(result.data)
    }else{
// search by price and brands and category 

let result = await postData('userinterface/fetch_products_by_price_and_brands_and_category',{brandlist:filterProductsByBrands,categorylist:filterProductsByCategory,minPrice:event.target.value[0] , maxPrice:event.target.value[1]})
      setProductList(result.data)
    }
  };

  function AccordionExpandDefault() {
    return (
      <Grid  container spacing={2}>

        <Grid item xs={12} className="filter-scrollbar">
          <div style={{ fontWeight: 550, fontSize: '1.2rem', margin: '10px 0px' }}>Brands</div>
          <TextField fullWidth variant='outlined' size="small" label="Brands" onChange={(e) => setBrandSearchPattern(e.target.value)} />
          <div style={{ height: '200px', overflow: 'scroll' }} >
            {showBrandList()}
          </div>
        </Grid>

        <Grid item xs={12} className="filter-scrollbar">
          <div style={{ fontWeight: 550, fontSize: '1.2rem', margin: '10px 0px', marginTop: '20px' }}>Category</div>
          <TextField fullWidth variant='outlined' size="small" label="Category" onChange={(e) => setCategorySearchPattern(e.target.value)} />
          <div style={{ height: '200px', overflow: 'scroll' }} >
            {showCatgeoryList()}
          </div>
        </Grid>

{/* it is for filter by price  */}

        <Grid item xs={12}>
          <div style={{ fontWeight: 550, fontSize: '1.2rem', margin: '10px 0px', marginTop: '20px' }}>Price</div>
          <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
            <div style={{fontSize:'.9rem',fontWeight:'bold'}}>Min: <span style={{fontSize:'1.2rem',color:'green',fontWeight:'bold'}}>{minPrice}</span></div>
            <div style={{fontSize:'.9rem',fontWeight:'bold'}}>Max: <span  style={{fontSize:'1.2rem',color:'green',fontWeight:'bold'}}>{maxPrice}</span></div>
          </div>
          <Box >
            <Slider
              // getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              // getAriaValueText={valuetext}
              max={200000}
              min={0}
             
            />
          </Box>

        </Grid>

      </Grid>
    );
  }
  return (<div style={{ width: '100%' }}>
    {AccordionExpandDefault()}
    {/* {showBrandList()}
<Divider />
{showCatgeoryList()} */}
  </div>)
}