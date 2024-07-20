import Header from "../components/Header";
import { Hidden, useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { getData, postData, serverurl } from "../../services/fetchnodeservices";
import { useSelector } from "react-redux";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function YourOrder() {
    const [orders, setOrders] = useState([])

    const theme = useTheme();
    const matches1 = useMediaQuery(theme.breakpoints.down('md'))
    const matches2 = useMediaQuery(theme.breakpoints.down('sm'))
    const matches3 = useMediaQuery(theme.breakpoints.down(762))
    const matches4 = useMediaQuery(theme.breakpoints.down(465))

    // let userdata = Object.values(useSelector((state) => state.User))[0]
    let userdata = JSON.parse(localStorage.getItem('USER'))

    let navigate = useNavigate()

    useEffect(function () {
        fetchAllOrders()
    }, [])

    const fetchAllOrders = async () => {
        let result = await postData('yourorder/fetch_products', { userid: userdata?.userid })
        console.log("orderss ==> ", result.data)
        setOrders(result?.data)
    }

    let dispatch = useDispatch()
    const handleBuyAgain = (item) => {
        let v = 1
        item['qty'] = v
        dispatch({ type: 'ADD_CART', payload: [item.productdetailid, item] })
        navigate('/cart')
    }


    const showProducts = () => {
        return orders.map((item) => {
            var imgsrc = item.picture.split(',')
            return <div style={{ width: '100%', border: '2px solid #dfe6e9', borderRadius: 10, marginTop: 10, overflow: 'hidden' }}>
                <div style={{ width: '100%', background: '#F0F2F2', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '97%', paddingTop: '1%', paddingBottom: '1%', flexDirection: matches4 ? 'column' : 'row' }}>
                        <div style={{ display: 'flex', width: matches4 ? '100%' : matches3 ? '70%' : '50%' }}>
                            <div style={{}}>
                                <div style={{ fontSize: '.7rem', color: '#565959' }}>ORDER PLACED</div>
                                <div style={{ fontSize: '.95rem', color: '#565959' }}>{item.date}</div>
                            </div>
                            <div style={{ marginLeft: '4%' }}>
                                <div style={{ fontSize: '.75rem', color: '#565959', fontWeight: 600 }}>TOTAL</div>
                                <div style={{ fontSize: '.9rem', color: '#565959', fontWeight: 600 }}>₹{item.offerprice * item.qty}</div>
                            </div>
                            <div style={{ marginLeft: '4%', position: 'relative' }}>
                                <div style={{ fontSize: '.75rem', color: '#565959', fontWeight: 600 }}>SHIP TO</div>
                                <div style={{ fontSize: '.9rem', color: '#008296', fontWeight: 600 }}>{userdata.firstname} {userdata.lastname} </div>

                            </div>

                        </div>
                        <div style={{ fontSize: '.9rem', color: '#008296', fontWeight: 600, cursor: 'pointer', marginTop: matches4 ? '2%' : '' }} onClick={() => { navigate('/orderdetails', { state: { product: item } }) }}>View order details</div>
                    </div>
                </div>


                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }} >
                    <div style={{ display: 'flex', width: '97%', paddingTop: '2%', paddingBottom: '2%' }}>
                        <div>
                            <img src={`${serverurl}/images/${imgsrc[0]}`} style={{ width: 120 }} />
                        </div>
                        <div style={{ marginLeft: '1.5%' }}>
                            <div style={{ fontWeight: 600, fontSize: '.9rem', color: '#008296', overflow: 'auto' }}>
                                {item.productname}
                            </div>

                            <div style={{ fontWeight: 600, fontSize: '.9rem', color: '#008296' }}>
                                {item.productsubname}
                            </div>

                            <div style={{ display: 'flex', flexDirection: matches4 ? 'column' : 'row', marginTop: 10 }}>
                                <div style={{ boxShadow: '.2px .2px 2px #565959', fontSize: '.9rem', paddingLeft: 15, paddingTop: 3, paddingBottom: 5, width: '90px', borderRadius: 10, fontWeight: 500, color: "#636e72", cursor: 'pointer' }} onClick={() => handleBuyAgain(item)}>Buy it again</div>

                                <div style={{ boxShadow: '.2px .2px 2px #565959', fontSize: '.9rem', paddingLeft: 15, paddingTop: 3, paddingBottom: 5, width: '150px', borderRadius: 10, fontWeight: 500, color: "#636e72", marginLeft: matches4 ? '' : '10px', cursor: 'pointer', marginTop: matches4 ? '3%' : '', marginBottom: matches4 ? '2%' : '' }} onClick={() => { navigate('/showproductdetails', { state: { product: item } }) }}>View product details</div>
                            </div>
                        </div>
                    </div>



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
                <div style={{ fontSize: '2rem' }}>Your Orders</div>
                <div style={{ width: '100%' }}>{showProducts()}</div>
            </div>
        </div>

    </div>)
}