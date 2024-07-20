var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.post('/add_new_productdetails',upload.any(),function(req, res, next) {  
  console.log("hooo rha hai bhai call ")
  console.log(req.file)
  try{

    var files;
    files = req?.files?.map((item)=>{
      return item.filename
    })
    
      console.log("bhai query me kuch galat hai ",req.body)
  console.log("file :- ",req.files)
      
      pool.query("insert into productdetails (brandid,categoryid,subcategoryid,productid,productsubname,description,weight,weighttype,packaging,quantity,price,offerprice,offertype,picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",[req.body.brandid,req.body.categoryid,req.body.subcategoryid,req.body.productid,req.body.productsubname,req.body.description,req.body.weight,req.body.weighttype,req.body.packaging,req.body.qty,req.body.price,req.body.offerprice,req.body.offertype,files + ""],function(error,result){
       
          if(error){
            console.log("bhai kya error aa rhi hai yrr",error)
              res.status(200).json({message:error,status:false})
          }else{
              res.status(200).json({message:'Product Details submitted successfully',status:true})
          }
      })
    }
    catch(e){
      console.log("error",e)
      res.status(200).json({message:e,status:false})
    }
  });

  router.get('/fetch_all_productdetails',function(req,res,next){
    try{
      pool.query("select Pd.* , (select B.brandname from brands B where B.brandid=Pd.brandid) as brandname, (select C.categoryname from category C where C.categoryid=Pd.categoryid) as categoryname , (select SC.subcategoryname from subcategory SC where SC.subcategoryid=Pd.subcategoryid) as subcategoryname ,(select P.productname from products P where P.productid=Pd.productid) from productdetails Pd",function(error,result){
        if(error){
          res.status(200).json({message:error,status:false})
        }else{
          res.status(200).json({data:result,status:true})
        }
      })
    }catch(e){
      res.status(200).json({message:'fail to fetch product Details',status:false})
    }
  })

  router.post('/update_productdetails_data',function(req, res, next) {
 
    try{
      pool.query("update productdetails set brandid=?,categoryid=?,subcategoryid=?,productid=?,productsubname=?,description=?,weight=?,weighttype=?,packaging=?,quantity=?,price=?,offerprice=?,offertype=? where productdetailid=?",[req.body.brandid,req.body.categoryid,req.body.subcategoryid,req.body.productid,req.body.productsubname,req.body.description,req.body.weight,req.body.weighttype,req.body.packaging,req.body.quantity,req.body.price,req.body.offerprice,req.body.offertype,req.body.productdetailid],function(error,result){
      
          if(error){
            console.log(error)
              res.status(200).json({message:"bhai kuch to dikkat aa rhi hai",status:false})
          }else{
              res.status(200).json({message:'productdetails Edit successfully',status:true})
          }
      })
    }
    catch(e){
      res.status(200).json({message:'fail to Edit product details',status:false})
    }
  });

  router.post('/edit_productdetail_picture',upload.any(),function(req, res, next) {
 
    try{

      var files;
      files=req?.files?.map((item)=>{
       
        return item.filename
      })

      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",req.files,"body : ",req.body)
      pool.query("update productdetails set picture=? where productdetailid=?",[files+"",req.body.productdetailid],function(error,result){
    
          if(error){
              res.status(200).json({message:"bhai kuch to dikkat aa rhi hai",status:false})
          }else{
              res.status(200).json({message:'Icon Edit successfully',status:true})
          }
      })
    }
    catch(e){
      res.status(200).json({message:'fail to Edit product details Icon',status:false})
    }
  });

  router.post('/delete_productdetails_data',function(req, res, next) {
 
    try{
      pool.query("delete from productdetails where productdetailid=?",[req.body.productdetailid],function(error,result){
    
          if(error){
              res.status(200).json({message:"bhai kuch to dikkat aa rhi hai",status:false})
          }else{
              res.status(200).json({message:'product details Delete successfully',status:true})
          }
      })
    }
    catch(e){
      res.status(200).json({message:'fail to Delete product details',status:false})
    }
  });

  module.exports = router