import { makeStyles } from "@mui/styles";

const BannerStyle = makeStyles({
    root:{
        width:'100%',
        height:'100vh',
        background:'#ecf0f1',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
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
    }
})

export {BannerStyle}