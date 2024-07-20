import { makeStyles } from "@mui/styles"
const ProductStyle = makeStyles({
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
        width:'95%',
        background:'white',
        padding:10
    },
    center:{
        display:'flex',
        justifyContent:'center'
    }
})

export { ProductStyle}