import Header from "../components/Header";
import { Divider, Grid, Hidden, useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { getData, postData, serverurl } from "../../services/fetchnodeservices";
import { useSelector } from "react-redux";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlusMinusComponent from "../components/PlusMinusComponent";
import ClearIcon from '@mui/icons-material/Clear';

export default function WishList() {
    const [pageRefresh, setPageRefresh] = useState(false)

    const theme = useTheme();
    const matches1 = useMediaQuery(theme.breakpoints.down('md'))
    const matches2 = useMediaQuery(theme.breakpoints.down('sm'))
    const matches3 = useMediaQuery(theme.breakpoints.down(762))
    const matches4 = useMediaQuery(theme.breakpoints.down(465))

    let userdata = Object.values(JSON.parse(localStorage.getItem('Cart')))[0]

    let dispatch = useDispatch()
    let navigate = useNavigate()

    var product = JSON.parse(localStorage.getItem('WishList'))
    var productFromRedux = JSON.parse(localStorage.getItem('Cart'))
    var data = Object.values(product)
    // alert(JSON.stringify(data)) 
    console.log(data)

    const handleClear = (item) => {
        dispatch({ type: "DELETE_WISHLIST", payload: [item.productdetailid] })
        setPageRefresh(!pageRefresh)
    }

    const handleChange = (v, item) => {
        if (v >= 1) {
            item['qty'] = v
            dispatch({ type: "ADD_CART", payload: [item.productdetailid, item] })
        }
        else {
            dispatch({ type: "DELETE_CART", payload: [item.productdetailid] })
        }
        setPageRefresh(!pageRefresh)
    }

    const showProducts = () => {
        return data.map((item) => {
            return <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff', position: 'relative' }}>
                <div style={{ width: '90%', height: '90%', display: 'flex', flexDirection: 'column', marginBottom: '1%', marginTop: '1%' }}>
                    <div style={{ position: 'absolute', right: "1%" }} ><ClearIcon onClick={() => handleClear(item)} style={{ cursor: 'pointer' }} /></div>
                    <Grid container spacing={2} style={{ marginBottom: '3%' }}>
                        <Grid xs={3} item>
                            <img src={`${serverurl}/images/${item.picture.split(',')[0]}`} style={{ width: '100%',cursor:'pointer' }} onClick={()=>navigate('/showproductdetails', { state: { product: item } })}/>
                        </Grid>

                        <Grid xs={9} item style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontWeight: 'bold',cursor:'pointer', color: '#000', fontSize: matches4 ? '.75rem' : '' }} onClick={()=>navigate('/showproductdetails', { state: { product: item } })}>{item.productname}</div>
                            <div style={{ fontWeight: 'bold', color: 'grey', fontSize: matches4 ? '.75rem' : '' }}>{item.productsubname}</div>
                            <div style={{ fontWeight: 'bold', color: 'grey', fontSize: matches4 ? '.75rem' : '' }}>{item.size}</div>
                            <div style={{ width: matches3 ? '100%' : '80%', display: 'flex', fontWeight: 'bold', marginTop: '1%' }}><span style={{ color: '#30336b', fontWeight: 'bold', fontSize: matches4 ? '.8rem' : '', marginRight: 20 }}>&#8377;{item.offerprice}</span>  <del style={{ color: 'grey', fontWeight: 'bold', fontSize: matches4 ? '.8rem' : '' }}>&#8377;{item.price}</del></div>

                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', fontWeight: 'bolder', marginTop: '1%', color: '#10ac84', fontSize: matches4 ? '.75rem' : '' }}>
                                <span>You Save &#8377;{item.price - item.offerprice}</span>
                                <span>

                                </span>

                            </div>
                            <div style={{ marginTop: '2%' }}>

                                <PlusMinusComponent view='' qty={productFromRedux[item.productdetailid] == undefined ? 0 : productFromRedux[item.productdetailid].qty} onChange={(v) => handleChange(v, item)} />
                            </div>
                        </Grid>
                    </Grid>

                    <Divider />
                </div>

            </div>
        })
    }

    return (<div style={{ width: '100%' }}>
        <div style={{ width: '100%' }}>
            <Header />
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: matches1 ? '125.5px' : '64.4px', marginBottom: '2%' }}>
            <div style={{ width: matches3 ? '90%' : '70%', marginTop: 20 }}>
                <div style={{ fontSize: '2rem' }}>Wish List</div>
                <div style={{ width: '100%', marginTop: 20 }}>{showProducts()}</div>
            </div>
        </div>

    </div>)
}