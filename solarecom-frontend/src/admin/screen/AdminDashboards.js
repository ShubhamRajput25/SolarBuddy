import DraftsIcon from "@mui/icons-material/Drafts";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {Routes , Route} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import { serverurl } from "../../services/fetchnodeservices";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, Drawer, Grid, Paper, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CategoryIcon from '@mui/icons-material/Category';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import LogoutIcon from '@mui/icons-material/Logout';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BoltIcon from '@mui/icons-material/Bolt';
import Brands from './Brands';
import DisplayAllBrands from './DisplayAllBrands';
import Category from './Category';
import DisplayAllCategory from './DisplayAllCategory';
import SubCategory from './SubCategory';
import DisplayAllSubCategory from './DisplayAllSubCategory';
import Products from './Products';
import DisplayAllProducts from './DisplayAllProducts';
import ProductDetails from './ProductDetails';
import DisplayAllProductDetails from './DisplayAllProductDetails';
import AdminLogin from './AdminLogin';
import Banners from "./Banners";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AdminDashboardCss from "../css/AdminDashboardCss.css"
import AdminDashboardDrawer from "../components/AdminDashboardDrawer"
import { useState } from "react";

export default function AdminDashboard(props) {
const [open,setOpen]=useState(false)


     
    var navigate=useNavigate()

    var admin = JSON.parse(localStorage.getItem('ADMIN'))
    let AdminToken = localStorage.getItem('AdminToken')

    let theme = useTheme()
    const matches1=useMediaQuery(theme.breakpoints.down('md'))
    const matches2=useMediaQuery(theme.breakpoints.down('sm'))
    const matches3=useMediaQuery(theme.breakpoints.down(450))
    const matches4=useMediaQuery(theme.breakpoints.down(1000))

    let listData=[
        {name:'Brand List',icon:<CategoryIcon />,link:'displayallbrands'},
        {name:'Category List',icon:<AddShoppingCartIcon />,link:'displayallcategory'},
        {name:'SubCategory List',icon:<AddPhotoAlternateIcon />,link:'displayallsubcategory'},
        {name:'Product List',icon:<ViewCarouselIcon />,link:'displayallproducts'},
        {name:'Product Details',icon:<ProductionQuantityLimitsIcon />,link:'displayallproductdetails'},
        {name:'Banner',icon:<BoltIcon />,link:'banners'},
        {name:'Logout',icon:<LogoutIcon />,link:'/adminlogin'}
    ]

    const handleClick=(item)=>{
        if(item.name == 'Logout'){
           window.localStorage.removeItem('ADMIN')
           window.localStorage.removeItem('AdminToken')
        } 
        navigate(item.link)
    }

    const showList=()=>{
        return listData.map((item)=>{
            return <div onClick={()=>handleClick(item)} id="listbox" style={{display:'flex',justifyContent:'center'}}>
            <div style={{display:'flex',justifyContent:'space-between',padding:'10px 0px 10px 0px',cursor:'pointer',width:'90%'}} >
                <div style={{width:'10px'}}>{item.icon}</div>
                <div style={{fontWeight:'bold',fontSize:'.9rem',letterSpacing:'0.5'}}>{item.name}</div>
            </div>
            </div>
        })
    }

    const showAdminDetails=()=>{
        return  <div style={{ display: 'flex', flexDirection: 'column',width:'100%',marginBottom:'10%',alignItems:'start',marginLeft:'5%'}}>
        <img src={`${serverurl}/images/${admin?.picture}`} style={{ width: 80, marginTop:10 }} />
        <div style={{ width:'100%',display: 'flex', alignItems: 'center',marginLeft:'2%'}}>
            
            <div>
            <div style={{ fontWeight: 'bold', fontFamily: 'Poppins',fontSize:'1.3rem',fontWeight:'bold'}} >{admin?.adminname}</div>
            <div style={{  fontFamily: 'Poppins', marginRight: 30,fontSize:'.9rem',fontWeight:'bold',color:'grey' }} >{admin?.emailid}</div>
            <div style={{  fontFamily: 'Poppins', marginRight: 30 ,fontSize:'.9rem',fontWeight:'bold',color:'grey'}} >+91{admin?.mobileno}</div>
            </div>
            </div>
        </div>
    }

    const AdminDrawer=()=>{
        return  <Drawer  anchor='left' open={open} onClose={handleClose} >   
          <div style={{width:'220px'}}>
            {showAdminDetails()}
          {showList()} 
        </div>    
     </Drawer>
    }
 
    const handleOpen=()=>{
        setOpen(true)
    }

    const handleClose=()=>{
        setOpen(false)
    }

    if(!AdminToken){
        return(
            <div style={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'3rem'}}>
                <div>
                    <div>You Need to Login </div>
                    <div>
                        <Button onClick={()=>navigate('/adminlogin')}>Go to Login</Button>
                    </div>
                </div>
            </div>
        )
    }else{
    return (
    <div>

        <AppBar position='static' style={{ background: '#488A99' }}>
            <Toolbar variant="dense">
            {matches1?
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          onClick={handleOpen}
          >
            <MenuIcon />
          </IconButton>:<div></div>
    }
                <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
                   
                </IconButton>
                <Typography variant="h6" component="div">
                    <div style={{ color: '#FFF' }}> SolarBuddy </div>
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container spacing={2}>
            <Grid item md={2.3} >
            {matches1?<></>: <div style={{display: 'flex', flexDirection: 'column',alignItems:'center',marginLeft:5,borderRight:'1px solid #dfe6e9'}}>            
                  <div style={{width:'100%'}}>
                    {showAdminDetails()}
                </div>
                
                <div style={{width:'100%'}}>
                {showList()}
                </div>

                </div>
                }
            </Grid>
            <Grid item md={9.7} xs={12} >
                <div style={{width:'100%',margin:0,display:'flex',justifyContent:'start'}}>
                <Routes >
                <Route element={<Banners />} path="/banners" />
            <Route element={<Brands />} path="/brands" />
          <Route element={<DisplayAllBrands />} path="/displayallbrands" />
          <Route element={<Category/>} path="/category" />
          <Route element={<DisplayAllCategory/>} path="/displayallcategory" />
          <Route element={<SubCategory/>} path="/subcategory" />
          <Route element={<DisplayAllSubCategory/>} path="/displayallsubcategory" />
          <Route element ={<Products />} path="/products" />
          <Route element={<DisplayAllProducts />} path="/displayallproducts" />
          <Route element={<ProductDetails />} path="/productdetails" />
          <Route element={<DisplayAllProductDetails />} path="/displayallproductdetails" />
          </Routes>
          </div>
            </Grid>

        </Grid>
     
        {AdminDrawer()}


  </div>
            
 )
}
}