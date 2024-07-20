import { useStyle } from "../css/BrandCss"
import { Avatar, Button, Grid, TextField ,FormControl,MenuItem,Select,InputLabel,FormHelperText} from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import { useEffect, useState } from "react"
import { getData, postData } from "../../services/fetchnodeservices"
import Swal from "sweetalert2"



export default function Category(){

    const [brandId,setBrandId]=useState('')
    const [categoryName,setCategoryName]=useState('')
    const [icon,setIcon]=useState({bytes:'',file:'fake.png'})
    const [errorMessage,setErrorMessage]=useState({})
    const [brandList,setBrandList] = useState([])

    var classes = useStyle()

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

    const handleChangeIcon = (e)=>{
        // console.log("phle ",icon.bytes)
        setIcon({bytes:e.target.files[0],file:URL.createObjectURL(e.target.files[0])})
        console.log(icon.bytes)
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

        if(icon.bytes.length==0){
            handleError("Pls select icon....",'icon')
            error = true
        }

        if(error == false){
            var formData = new FormData()
            formData.append('brandid',brandId)
            formData.append('categoryname',categoryName)
            formData.append('icon',icon.bytes)
            var result = await postData('category/add_new_category',formData)

            if(result.status){
                Swal.fire({
                    icon: "success",
                    title: "Category Register",
                    text: result.message,
                    
                    }); 
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Category Register",
                    text: result.message,
                    
                    });
            }
        }
    }

    return(<div className={classes.root}>
    <div className={classes.box}>
        <Grid container spacing={2}>

        <Grid item xs={12}>
        <TitleComponent title="Category" link="/admindashboards/displayallcategory" />
        </Grid>

        <Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel>Brand List</InputLabel>
            <Select label="Brands"
            onChange={(e)=>{setBrandId(e.target.value)}} onFocus={()=>{handleError('','brandid')}} helperText={errorMessage.brandid} error={errorMessage.brandid}
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
        <TextField fullWidth label="Category Name"  onChange={(e)=>{setCategoryName(e.target.value)}} onFocus={()=>{handleError('','categoryname')}} helperText={errorMessage.categoryname} error={errorMessage.categoryname}/>
        </Grid>

        <Grid item xs={6} className={classes.center}>
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
        </Grid>

        <Grid item xs={6} className={classes.center}>
        <Avatar src={icon.file} alt="abc" variant="rounded"/>
        </Grid>

        <Grid item xs={6} className={classes.center}>
       <Button fullWidth variant="contained" onClick={handelSubmit}>Submit</Button>
        </Grid>

        <Grid item xs={6} className={classes.center}>
        <Button fullWidth variant="contained">Reset</Button>
        </Grid>

        </Grid>
    </div>
   </div>) 
}