import { Divider, Grid } from "@mui/material";
import {List ,ListItemButton,ListItemIcon,ListItemText }from "@mui/material";
import { serverurl } from "../../services/fetchnodeservices";
import Drawer from '@mui/material/Drawer';
import { useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';

export default function FooterComponent(){

    const theme = useTheme();
    const matches1=useMediaQuery(theme.breakpoints.down('md'))
    const matches2=useMediaQuery(theme.breakpoints.down('sm'))
    const matches3=useMediaQuery(theme.breakpoints.down(450))
    const matches4=useMediaQuery(theme.breakpoints.down(1200))
    var details = ['F-1107 Block-1, First Floor Ardente Office One, Hoodi Circle K.R. Puram, Bangalore - 560048','+91 93723723821','solarbuddy@gmail.com']

    var information=[{text:'About us',link:''},
    {text:'Contact us',link:''},
    {text:'Shipping Policy',link:''},
    {text:'Payment Policy',link:''},
    {text:'Privacy Policy',link:''},
    {text:'Cancellation and Returns Policy',link:''},
    {text:'Terms and Conditions',link:''},]

    var account = [{text:'My Account',link:''},
    {text:'Wishlist',link:''},
    {text:'Order History',link:''},
    {text:'Become a Vendor',link:''},
    {text:'Become an Affiliate',link:''},
    {text:'Become a Seller',link:''},]

    var extra = [{text:'Site Map',link:''},
    {text:'Shop By Brand',link:''},
    {text:'Shop By City',link:''},
    {text:'Shop By Pincode',link:''},
    {text:'SolarClue Projects',link:''},
    {text:'Pay Online',link:''},
    {text:'Investor Relations',link:''}]

    const showDetails=()=>{
        return details.map((item)=>{
            return  <ListItemButton style={{padding:0}}>
            <ListItemText><span style={{fontSize:'.7rem'}}>{item}</span></ListItemText>
        </ListItemButton>
        })  
    }

    const showInformation=()=>{
        return information.map((item)=>{
            return  <ListItemButton style={{padding:0}}>
            <ListItemText><span style={{fontSize:'.7rem'}}>{item.text}</span></ListItemText>
        </ListItemButton>
        })
    }

    const showMyAccount=()=>{
        return account.map((item)=>{
            return  <ListItemButton style={{padding:0}}>
            <ListItemText><span style={{fontSize:'.7rem'}}>{item.text}</span></ListItemText>
        </ListItemButton>
        })
    }

    const showExtra=()=>{
        return extra.map((item)=>{
            return  <ListItemButton style={{padding:0}}>
            <ListItemText><span style={{fontSize:'.7rem'}}>{item.text}</span></ListItemText>
        </ListItemButton>
        })
    }

    return(<div style={{width:matches4?'85%':'97%'}}>
        <Grid container spacing={2} >

            <Grid item md={3} sm={6}>
     <div style={{width:'70%',fontSize:'2.3rem',fontWeight:'bolder'}}>SolarBuddy</div>

<List>
{showDetails()}
</List>

            </Grid>

            <Grid item md={3} sm={6} xs={12}>
              <List>
              <ListItemButton style={{paddingLeft:0}}>
            <ListItemText><span style={{fontSize:'1.1rem',fontWeight:'bold'}}>INFORMATION</span></ListItemText> 
        </ListItemButton>
        <Divider/>
              {showInformation()}
              </List>
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
                <List>
                <ListItemButton style={{paddingLeft:0}}>
            <ListItemText ><span style={{fontSize:'1.1rem',fontWeight:'bold'}}>MY ACCOUNT</span></ListItemText>
        </ListItemButton>
        <Divider/>
                {showMyAccount()}
                </List>
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
                <List >
                <ListItemButton style={{paddingLeft:0}}>
            <ListItemText ><span style={{fontSize:'1.1rem',fontWeight:'bold'}}>EXTRA</span></ListItemText>
        </ListItemButton>
        <Divider/>
                {showExtra()}
                </List>
               
            </Grid>


        </Grid>
    </div>)
}