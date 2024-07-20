import { makeStyles } from "@mui/styles";

const productDetailsStyle = makeStyles({
    root:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent:'start',
        marginLeft:'2%',
        marginTop:'2%'
    },
    box:{
        width:'800px',
        background:'white',
        padding:10
    },
    displaybox:{
        width:'97%',
        background:'white',
        padding:10
    },
    center:{
        display:'flex',
        justifyContent:'center'
    }
})

export {productDetailsStyle}