var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')
const{ LocalStorage } = require('node-localstorage')
var localstorage = require('node-localstorage').LocalStorage
localstorage = new LocalStorage('./scratch')

router.post('/add_new_brand',upload.single('icon'),function(req, res, next) {
 
  try{
    pool.query("insert into brands (brandname,icon) values(?,?) ",[req.body.brandname,req.file.filename],function(error,result){
     
        if(error){
          console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",error)
            res.status(200).json({message:error,status:false})
        }else{
            res.status(200).json({message:'brands submittes successfully',status:true})
        }
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({message:'fail to submit Brands',status:false})
  }
});


router.get('/display_all_brands',function(req, res, next) {
  var admin = JSON.parse(localstorage.getItem('ADMIN'))
  try{
    pool.query("select * from brands",function(error,result){
     
        if(error){
            res.status(200).json({message:error,status:false})
        }else{
          if(admin)
          res.status(200).json({data:result,status:true})
        else
        res.status(200).send('Login PLease!')
        }
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({message:'fail to display Brands',status:false})
  }
});

router.post('/edit_brandname',function(req, res, next) {
 
  try{
    pool.query("update brands set brandname=?  where brandid=?",[req.body.brandname,req.body.brandid],function(error,result){
     
        if(error){
          console.log(error)
            res.status(200).json({message:error,status:false})
        }else{
            res.status(200).json({message:"Brand name update succussfully",status:true})
        }
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({message:'fail to submit Brands',status:false})
  }
});

router.post('/update_brand_icon',upload.single('icon'),function(req, res, next) {
 
  try{
    pool.query("update brands set icon=? where brandid=?",[req.file.filename,req.body.brandid],function(error,result){
     console.log(req.body.icon)
        if(error){
            res.status(200).json({message:error,status:false})
        }else{

            res.status(200).json({message:"Brand icon update succussfully",status:true})
        }
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({message:'fail to submit Brands',status:false})
  }
});

router.post('/delete_data',function(req, res, next) {
 console.log("ha bhai backend call ho rhi ahi ")
 console.log("ha bhai backend call ho rhi ahi ")
  try{
    console.log("ha bhai backend call ho rhi ahi ander")
    pool.query("delete from brands where brandid=?",[req.body.brandid],function(error,result){
     
        if(error){
          
            res.status(200).json({message:error,status:false})
        }else{
          console.log("delete to ho gya hai ")
            res.status(200).json({message:"brand deleted succussfully ",status:true})
        }
    })
  }
  catch(e){
    console.log(e)
    res.status(200).json({message:'fail to submit Brands',status:false})
  }
});

module.exports = router;
