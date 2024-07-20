import { serverurl } from '../../services/fetchnodeservices';
import { Button, Divider } from "@mui/material"
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux';
import PlusMinusComponent from "./PlusMinusComponent";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from 'js-cookie';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function SolarProduct(props) {

    const theme = useTheme();
    const matches1 = useMediaQuery(theme.breakpoints.down('md'))
    const matches2 = useMediaQuery(theme.breakpoints.down('sm'))
    const matches3 = useMediaQuery(theme.breakpoints.down(450))

    var settings = {
        infinite: true,
        slidesToShow: matches2 ? 2 : matches1 ? 3 : 4,
        slidesToScroll: 2,
    };

    var dispatch = useDispatch()
    var navigate = useNavigate()

    var productFromRedux = useSelector(state => state.Cart)
    let prd
    try {
        prd = JSON.parse(localStorage.getItem('Cart'))
    } catch (e) {
        prd = {}
    }
    // console.log("reduc product ==========> ", productFromRedux)
    var showProduct = props?.data

    var product = JSON.parse(localStorage.getItem('WishList'))
    // var data=Object.values(product)


    const handlePlusMinus = (v, item) => {
        if (v >= 1) {
            item['qty'] = v
            dispatch({ type: 'ADD_CART', payload: [item.productdetailid, item] })

        } else {
            dispatch({ type: 'DELETE_CART', payload: [item.productdetailid] })
        }

        props.setPageRefesh(!props.pageRefesh)
    }

    const handleNextPage = (item) => {
        navigate('/showproductdetails', { state: { product: item } })

    }

    const handleWishListChange = (item, e) => {
        if (e) {
            dispatch({ type: 'ADD_WISHLIST', payload: [item.productdetailid, item] })
            props.setPageRefesh(!props.pageRefesh)
        } else {

            dispatch({ type: 'DELETE_WISHLIST', payload: [item.productdetailid] })
            props.setPageRefesh(!props.pageRefesh)
        }
    }

    const showItems = () => {
        return showProduct.map((item) => {
            // var imgsrc=JSON.(item.picture)
            var imgsrc = item.picture.split(',')
            let isChecked = product ? product[item?.productdetailid] ? true : false : false
            return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <div style={{ width: '95%', display: 'flex', flexDirection: 'column' }}>

                    <div style={{ width: '100%', position: 'relative' }}>

                        <div style={{ position: 'absolute' }}>
                            <p style={{
                                width: "70px",
                                height: "25px",
                                background: "#f1c40f", clipPath: "polygon(100% 0, 90% 48%, 100% 100%, 0% 100%, 0 51%, 0% 0%)", fontWeight: 'bolder', fontSize: ".8rem", display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }}>{(((item.price - item.offerprice) / item.price) * 100).toFixed(2)}%</p>
                        </div>

                        <div style={{ position: 'absolute', right: 0 }}>
                            {isChecked ? <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={(event) => handleWishListChange(item, event.target.checked)} checked={true} /> : <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onChange={(event) => handleWishListChange(item, event.target.checked)} />}
                        </div>

                        <img src={`${serverurl}/images/${imgsrc[0]}`} style={{ width: '100%' }} onClick={() => handleNextPage(item)} />

                    </div>

                    <div style={{ marginRight: 'auto', width: '90%', display: 'flex', flexDirection: 'column', marginTop: '5%', marginLeft: '2%' }}>

                        <div style={{ fontWeight: 'bold', fontSize: '1rem', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: '.8rem' }}>
                            {item.productname}
                        </div>

                        <div style={{ fontWeight: 'bold', fontSize: '0.8rem', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: '50%' }}>
                            {item.productsubname}
                        </div>

                        <div style={{ fontWeight: 'bolder', marginTop: 5, fontSize: '.8rem' }}>₹{item.offerprice}<del style={{ marginLeft: '4%', color: 'grey', fontWeight: 'lighter' }}>₹{item.price}</del></div>

                        <div style={{ marginBottom: '5%' }}>
                            <div style={{ fontWeight: 'bolder', fontSize: '0.8rem' }}><span style={{ color: 'green', fontWeight: 'bolder' }}>You Save</span> ₹{item.price - item.offerprice}</div>
                        </div>

                        <Divider />
                    </div>

                    <div style={{ width: '100%', marginTop: '5%' }}>
                        <PlusMinusComponent view='' qty={prd[item.productdetailid] == undefined ? 0 : prd[item.productdetailid].qty} onChange={(v) => handlePlusMinus(v, item)} />
                    </div>

                </div>

            </div>



        })
    }



    return (<div style={{ width: matches3 ? '86%' : matches1 ? '80%' : '90%' }}>

        <Slider {...settings}>
            {showItems()}
        </Slider>

    </div>)
}