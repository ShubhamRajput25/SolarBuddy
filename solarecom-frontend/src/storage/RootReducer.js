import Cookies from "js-cookie"

const initialState = {
    Cart:{},
    User:{},
    WishList:{},
}


export function RootReducer(state=initialState,action){
    // console.log("cookies se data ",JSON.parse(Cookies.get('Cart')))
switch(action.type){
    case 'ADD_CART':
        state.Cart[action.payload[0]]=action.payload[1]
        // Cookies.set('Cart',JSON.stringify(state.Cart),{expires:365},{ HttpOnly: true })
        let prevC = JSON.parse(localStorage.getItem('Cart'))
        window.localStorage.setItem('Cart',JSON.stringify({...prevC,...state.Cart}))
        return {Cart:state.Cart,User:state.User,WishList:state.WishList}

    case 'DELETE_CART' :
        delete state.Cart[action.payload[0]]   
        console.log("Dataaaaa delete",state.Cart)
        // Cookies.set('Cart',JSON.stringify(state.Cart),{expires:365},{ HttpOnly: true })
        let dataC = JSON.parse(localStorage.getItem('Cart'))
        let keyC = action.payload[0]
        delete dataC[keyC]
        window.localStorage.setItem('Cart',JSON.stringify(dataC))
        return {Cart:state.Cart,User:state.User,WishList:state.WishList}

    case 'ADD_USER' :
        state.User[action.payload[0]]=action.payload[1] 
        // console.log("Dataaaaa",state.User)
        return {Cart:state.Cart,User:state.User,WishList:state.WishList}

    case 'DELETE_USER':
        delete state.User[action.payload[0]]  
        // console.log("Delete ke baad user data",state.User)
        return {Cart:state.Cart,User:state.User,WishList:state.WishList}
    
    case 'ADD_WISHLIST':
        state.WishList[action.payload[0]]=action.payload[1] 
        // console.log("Dataaaaa",state.WishList)
        let prevW = JSON.parse(localStorage.getItem('WishList'))
        window.localStorage.setItem('WishList',JSON.stringify({...prevW,...state.WishList}))
        return {Cart:state.Cart,User:state.User,WishList:state.WishList}

    case 'DELETE_WISHLIST':
        delete state.WishList[action.payload[0]]  
        // console.log("Delete ke baad wishlist data",state.WishList)
        let dataW = JSON.parse(localStorage.getItem('WishList'))
        let keyW = action.payload[0]
        delete dataW[keyW]
        window.localStorage.setItem('WishList',JSON.stringify(dataW))
        return {Cart:state.Cart,User:state.User,WishList:state.WishList}   

    default:
        return {Cart:state.Cart,User:state.User,WishList:state.WishList}
}

}