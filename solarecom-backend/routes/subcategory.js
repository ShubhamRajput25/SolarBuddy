var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */
router.post('/add_new_subcategory', upload.single('icon'), function (req, res, next) {
  
    try {
        pool.query("insert into subcategory (brandid,categoryid,subcategoryname,icon) values(?,?,?,?) ", [req.body.brandid, req.body.categoryid, req.body.subcategoryname, req.file.filename], function (error, result) {

            if (error) {
                res.status(500).json({ message: error, status: false })
            } else {
                res.status(200).json({ message: 'SubCategory submitted successfully', status: true })
            }
        })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ message: 'fail to submit SubCategory', status: false })
    }
});

router.post('/search_by_category', function (req, res, next) {
    try {
        pool.query("select * from subcategory where categoryid=? ", [req.body.categoryid], function (error, result) {

            if (error) {
               
                res.status(500).json({ message: error, status: false })
            } else {
                res.status(200).json({ data:result, status: true })
            }
        })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ message: 'fail to fetch SubCategory', status: false })
    }
});

router.get('/fetch_all_subcategory',function(req,res,next){
    try{
      pool.query("select SC.* , (select B.brandname from brands B where B.brandid=SC.brandid) as brandname, (select C.categoryname from category C where C.categoryid=SC.categoryid) as categoryname from subcategory SC",function(error,result){
        if(error){
          res.status(200).json({message:error,status:false})
        }else{
          res.status(200).json({data:result,status:true})
        }
      })
    }catch(e){
      res.status(200).json({message:'fail to fetch subcategory',status:false})
    }
  })

  router.post('/update_subcategory_data',function(req, res, next) {
 
    try{
      pool.query("update subcategory set brandid=?,categoryid=?,subcategoryname=?  where subcategoryid=?",[req.body.brandid,req.body.categoryid,req.body.subcategoryname,req.body.subcategoryid],function(error,result){
      
          if(error){
            console.log(error)
              res.status(200).json({message:"bhai kuch to dikkat aa rhi hai",status:false})
          }else{
              res.status(200).json({message:'subcategory Edit successfully',status:true})
          }
      })
    }
    catch(e){
      res.status(200).json({message:'fail to Edit subcategory',status:false})
    }
  });

  router.post('/edit_subcategory_icon',upload.single('icon'),function(req, res, next) {
 
    try{
      pool.query("update subcategory set icon=? where subcategoryid=?",[req.file.filename,req.body.subcategoryid],function(error,result){
    
          if(error){
              res.status(200).json({message:"bhai kuch to dikkat aa rhi hai",status:false})
          }else{
              res.status(200).json({message:'Icon Edit successfully',status:true})
          }
      })
    }
    catch(e){
      res.status(200).json({message:'fail to Edit subcategory Icon',status:false})
    }
  });


  router.post('/delete_subcategory_data',function(req, res, next) {
    console.log("backend call ho rha hai ")
    try{
   
      pool.query("delete from subcategory where subcategoryid=?",[req.body.subcategoryid],function(error,result){
    
          if(error){
              res.status(200).json({message:"bhai kuch to dikkat aa rhi hai",status:false})
          }else{
              res.status(200).json({message:'subcategory Delete successfully',status:true})
          }
      })
    }
    catch(e){
      res.status(200).json({message:'fail to Delete subcategory',status:false})
    }
  });
  
module.exports = router;