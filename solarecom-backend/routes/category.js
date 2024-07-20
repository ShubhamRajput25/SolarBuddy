var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/add_new_category',upload.single('icon'),function(req, res, next) {
 
    try{
      pool.query("insert into category (brandid,categoryname,icon) values(?,?,?) ",[req.body.brandid,req.body.categoryname,req.file.filename],function(error,result){
       
          if(error){
              res.status(200).json({message:error,status:false})
          }else{
              res.status(200).json({message:'category submitted successfully',status:true})
          }
      })
    }
    catch(e){
      res.status(200).json({message:'fail to submit category',status:false})
    }
  });

  router.post('/update_category_data',function(req, res, next) {
 
    try{
      pool.query("update category set brandid=?,categoryname=?  where categoryid=?",[req.body.brandid,req.body.categoryname,req.body.categoryid],function(error,result){
       console.log(req.body.brandid)
       console.log(req.body.categoryname)
       console.log(req.body.categoryid)
          if(error){
              res.status(200).json({message:"bhai kuch to dikkat aa rhi hai",status:false})
          }else{
              res.status(200).json({message:'category Edit successfully',status:true})
          }
      })
    }
    catch(e){
      res.status(200).json({message:'fail to Edit category',status:false})
    }
  });

  router.post('/edit_category_icon',upload.single('icon'),function(req, res, next) {
 
    try{
      pool.query("update category set icon=? where categoryid=?",[req.file.filename,req.body.categoryid],function(error,result){
    
          if(error){
              res.status(200).json({message:"bhai kuch to dikkat aa rhi hai",status:false})
          }else{
              res.status(200).json({message:'category Edit successfully',status:true})
          }
      })
    }
    catch(e){
      res.status(200).json({message:'fail to Edit category',status:false})
    }
  });

   router.post('/delete_category_data',function(req, res, next) {
 
    try{
      pool.query("delete from category where categoryid=?",[req.body.categoryid],function(error,result){
    
          if(error){
              res.status(200).json({message:"bhai kuch to dikkat aa rhi hai",status:false})
          }else{
              res.status(200).json({message:'Category Delete successfully',status:true})
          }
      })
    }
    catch(e){
      res.status(200).json({message:'fail to Delete category',status:false})
    }
  });

  router.get('/fetch_all_category',function(req,res,next){
    try{
      pool.query("select C.* , (select B.brandname from brands B where B.brandid=C.brandid) as brandname from category C",function(error,result){
        if(error){
          res.status(200).json({message:error,status:false})
        }else{
          res.status(200).json({data:result,status:true})
          console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrr",result)
        }
      })
    }catch(e){
      res.status(200).json({message:'fail to fetch category',status:false})
    }
  })

  router.post('/search_by_brand',function(req,res,next){
  try{
    pool.query("select C.* , (select B.brandname from brands B where B.brandid=C.brandid) as brandname from category C where C.brandid=?",[req.body.brandid],function(error,result){
      if(error){
        res.status(200).json({message:error,status:false})
      }else{
        console.log("data hai bhai ",result)
        res.status(200).json({data:result,status:true})
      }
    })
  }catch(e){
    res.status(200).json({message:'fail to fetch category',status:false})
  }
  })

  module.exports = router