
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
    root:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'start',
        marginLeft:'2%',
        marginTop:'2%'
    },
    box:{
        width:500,
        background:'white',
        padding:10
    },
    displaybox:{
        width:650,
        background:'white',
        padding:10
    },
    center:{
        display:'flex',
        justifyContent:'center'
    },
    displayboxofsubcategory:{
        width:850,
        background:'white',
        padding:10
    }


})

export {useStyle}