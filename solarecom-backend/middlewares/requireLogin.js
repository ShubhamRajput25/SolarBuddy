const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../keys")


module.exports=(req,res,next)=>{
    const {authorization} = req.body;
    
    if(!authorization){
        return res.status(401).json({error:"you must have login"})
    }

    const token = authorization.replace("Bearer ","")

    jwt.verify(token,jwt_secret,(error,payload)=>{
        if(error){
            return res.status(401).json({error:"you must have login"}) 
        }

        const {_id}=payload
        user.findById(_id).then(userData=>{
            req.user = userData
            console.log(userData)
            res.status(200).json({data:userData})
        })
        
    })
    next()
    
}