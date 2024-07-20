var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer');
const multer = require('multer');
const { connect } = require('./category');


router.post('/add_new_product',upload.single('icon'),function(req, res, next) {
 
    try{
      pool.query("insert into products (brandid,categoryid,subcategoryid,productname,description,icon) values(?,?,?,?,?,?) ",[req.body.brandid,req.body.categoryid,req.body.subcategoryid,req.body.productname,req.body.description,req.file.filename],function(error,result){
       
          if(error){
            console.log("bhai kya error aa rhi hai yrr",error)
              res.status(200).json({message:error,status:false})
          }else{
            console.log("xxxxxxxxx",error)
              res.status(200).json({message:'Product submitted successfully',status:true})
          }
      })
    }
    catch(e){
      res.status(200).json({message:'fail to submit Product',status:false})
    }
  });

  router.post('/update_product_data',function(req, res, next) {
 
    try{
      pool.query("update products set brandid=?,categoryid=?,subcategoryid=?,productname=?,description=?  where productid=?",[req.body.brandid,req.body.categoryid,req.body.subcategoryid,req.body.productname,req.body.description,req.body.productid],function(error,result){
      
          if(error){
            console.log(error)
              res.status(200).json({message:"bhai kuch to dikkat aa rhi hai",status:false})
          }else{
              res.status(200).json({message:'product Edit successfully',status:true})
          }
      })
    }
    catch(e){
      res.status(200).json({message:'fail to Edit product',status:false})
    }
  });

  router.post('/edit_product_icon',upload.single('icon'),function(req, res, next) {
 
    try{
      pool.query("update products set icon=? where productid=?",[req.file.filename,req.body.productid],function(error,result){
    
          if(error){
              res.status(200).json({message:"bhai kuch to dikkat aa rhi hai",status:false})
          }else{
              res.status(200).json({message:'product Edit successfully',status:true})
          }
      })
    }
    catch(e){
      res.status(200).json({message:'fail to Edit product',status:false})
    }
  });

  router.post('/delete_product_data',function(req, res, next) {
 
    try{
      pool.query("delete from products where productid=?",[req.body.productid],function(error,result){
    
          if(error){
              res.status(200).json({message:"bhai kuch to dikkat aa rhi hai",status:false})
          }else{
              res.status(200).json({message:'product Delete successfully',status:true})
          }
      })
    }
    catch(e){
      res.status(200).json({message:'fail to Delete product',status:false})
    }
  });

router.get('/fetch_all_products',function(req,res,next){
    try{
      pool.query("select P.* , (select B.brandname from brands B where B.brandid=P.brandid) as brandname, (select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname , (select SC.subcategoryname from subcategory SC where SC.subcategoryid=P.subcategoryid) as subcategoryname  from products P",function(error,result){
        if(error){
          res.status(200).json({message:error,status:false})
        }else{
          res.status(200).json({data:result,status:true})
        }
      })
    }catch(e){
      res.status(200).json({message:'fail to fetch products',status:false})
    }
  })

  router.post('/search_by_subcategory',function(req,res,next){
    try{
     
      pool.query("select P.* , (select B.brandname from brands B where B.brandid=P.brandid) as brandname, (select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname , (select SC.subcategoryname from subcategory SC where SC.subcategoryid=P.subcategoryid) as subcategoryname  from products P where P.subcategoryid=?",[req.body.subcategoryid],function(error,result){
        if(error){
          console.log("bhai error aa rha hai ",error)
          res.status(200).json({message:error,status:false})
        }else{
          res.status(200).json({data:result,status:true})
        }
      })
    }catch(e){
      res.status(200).json({message:'fail to fetch products',status:false})
    }
  })

  module.exports = router