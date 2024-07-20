var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.post('/display_all_category_by_brand', function(req, res, next) {
    try {
        pool.query("select C.* ,(select B.brandname from brands B where B.brandid=C.brandid ) as brandname from category C where C.brandid=?", [req.body.brandid], function (error, result) {

            if (error) {
               console.log("hellooooooooooooooooooooooooooo")
                res.status(500).json({ data:[], status: false })
            } else {
                res.status(200).json({ data:result, status: true })
                console.log(result.data)
            }
        })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ message: 'fail to fetch SubCategory', status: false })
    }
});

router.get('/display_all_brands',function(req, res, next) {
 
    try{
      pool.query("select * from brands",function(error,result){
       
          if(error){
              res.status(200).json({message:error,status:false})
          }else{
              res.status(200).json({data:result,status:true})
          }
      })
    }
    catch(e){
      console.log(e)
      res.status(200).json({message:'fail to display Brands',status:false})
    }
  });


  router.get('/fetch_all_productdetails',function(req,res,next){

    try{
      pool.query("select Pd.* , (select B.brandname from brands B where B.brandid=Pd.brandid) as brandname, (select C.categoryname from category C where C.categoryid=Pd.categoryid) as categoryname , (select SC.subcategoryname from subcategory SC where SC.subcategoryid=Pd.subcategoryid) as subcategoryname ,(select P.productname from products P where P.productid=Pd.productid) as productname from productdetails Pd",function(error,result){
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

  router.post('/submit_address', function (req, res, next) {
    try {
      
      pool.query("insert into  useraddress (mobileno, emailid, pincode, houseno, floorno, building, address, landmark, state, city) values(?,?,?,?,?,?,?,?,?,?)",[req.body.mobileno, req.body.emailid, req.body.pincode, req.body.houseno, req.body.floorno, req.body.building, req.body.address, req.body.landmark, req.body.state, req.body.city],function (err,result) {
        if (err) {
          console.log(err)
          res.status(500).json({ message: 'Database Error pls  connect with Database Admin...', status: false })
        }
  
        else {
          
          res.status(200).json({ message:"New Address Add Successfully",data:result, status:true })
          
        }
      })
    }
    catch (e) {
      console.log(e)
      res.status(500).json({ message:'Server Error....', status:false })
    }
  })

  router.post('/check_useraddress_by_mobileno', function (req, res, next) {
    try {

      console.log("body:",req.body)
      pool.query("select * from useraddress where mobileno=?",[req.body.mobileno],function (err,result) {
        if (err) {
          console.log(err)
          res.status(500).json({ message: 'Database Error pls  connect with Database Admin...', status: false })
        }
  
        else {
          console.log(result[0])
          console.log(result.length)
          if(result.length>=1){
            console.log("haaaaaaaaaaaa")
          res.status(200).json({ message:"success",data:result, status:true })
          }
          else
          res.status(200).json({ message:"success",data:[], status:false })

        }
      })
    }
    catch (e) {
      console.log(e)
      res.status(500).json({ message:'Server Error....', status:false })
    }
  })


  router.post('/check_user_mobileno', function (req, res, next) {
    try {

      console.log("body:",req.body)
      pool.query("select * from users where mobileno=?",[req.body.mobileno],function (err,result) {
        if (err) {
          console.log(err)
          res.status(500).json({ message: 'Database Error pls  connect with Database Admin...', status: false })
        }
  
        else {
          console.log(result)
          if(result.length==1)
          res.status(200).json({ message:"success",data:result[0], status:true })
          else
          res.status(200).json({ message:"success",data:[], status:false })

        }
      })
    }
    catch (e) {
      console.log(e)
      res.status(500).json({ message:'Server Error....', status:false })
    }
  })

  router.post('/submit_user', function (req, res, next) {
    try {
      
      pool.query("insert into  users (firstname,lastname,mobileno,emailid) values(?,?,?,?)",[req.body.firstname,req.body.lastname,req.body.mobileno,req.body.emailid],function (err,result) {
        if (err) {
          console.log(err)
          res.status(500).json({ message: 'Database Error pls  connect with Database Admin...', status: false })
        }
  
        else {
          
          res.status(200).json({ message:"Registration successfull",data:result, status:true })
          
        }
      })
    }
    catch (e) {
      console.log(e)
      res.status(500).json({ message:'Server Error....', status:false })
    }
  })

  router.post('/fetch_all_products_pattern',function(req,res,next){

    console.log("bhai product wala call to ho rha hai ")
    let q = `select P.productname,P.icon as icon, D.*,B.brandname as brandname,C.categoryname as categoryname,S.subcategoryname as subcategoryname from productdetails D,products P , category C , brands B ,subcategory S where P.productid=D.productid and C.categoryid=D.categoryid and B.brandid=D.brandid and S.subcategoryid=D.subcategoryid and (P.productname like '%${req.body.pattern}%' or D.productsubname like '%${req.body.pattern}%' or C.categoryname like '%${req.body.pattern}%' or B.brandname like '%${req.body.pattern}%' or S.subcategoryname like '%${req.body.pattern}%')`

    try{
      pool.query(q,function(error,result){
        if(error){
           console.log("errorrrrrrrrrrr",error)
          res.status(200).json({message:error,status:false})
        }else{
          console.log("assssssssssssssssss",result)
          res.status(200).json({data:result,status:true})
        }
      })
    }catch(e){
       
      res.status(200).json({message:'fail to fetch product Details',status:false})
    }
  })
  
  router.get('/fetch_all_productdetails_by_category',function(req,res,next){

    try{
      pool.query("select Pd.* , (select B.brandname from brands B where B.brandid=Pd.brandid) as brandname, (select C.categoryname from category C where C.categoryid=Pd.categoryid) as categoryname , (select SC.subcategoryname from subcategory SC where SC.subcategoryid=Pd.subcategoryid) as subcategoryname ,(select P.productname from products P where P.productid=Pd.productid) as productname from productdetails Pd",function(error,result){
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

  router.post('/deleteaddress',function(req,res,next){
    console.log("call hua hai bhai")
    try{

    pool.query("delete from useraddress where addressid=?",[req.body.addressid],function(error,result){
      if(error){  
        res.status(200).json({message:error,status:false})
      }else{
        res.status(200).json({data:result,status:true})
      }
    })
  }catch(err){
    res.status(200).json({message:'fail to delete user address',status:false})
  }
  })

  router.post('/edit_address', function (req, res, next) {
    try {
      
      pool.query("update useraddress set pincode=?, houseno=?, floorno=?, building=?, address=?, landmark=?, state=?, city=? where addressid=?",[req.body.pincode, req.body.houseno, req.body.floorno, req.body.building, req.body.address, req.body.landmark, req.body.state, req.body.city,req.body.addressid],function (err,result) {
        if (err) {
          console.log(err)
          res.status(500).json({ message: 'Database Error pls  connect with Database Admin...', status: false })
        }
  
        else {
          
          res.status(200).json({ message:"Edit Address successfull",data:result, status:true })
          
        }
      })
    }
    catch (e) {
      console.log(e)
      res.status(500).json({ message:'Server Error....', status:false })
    }
  })


  router.post('/fetch_products_by_brands', function(req, res, next) {
    try {
        pool.query(`select pd.* , b.brandname , c.categoryname , sb.subcategoryname , p.productname , p.icon from productdetails pd , brands b , category c , subcategory sb , products p
        where pd.brandid = b.brandid 
        and pd.categoryid = c.categoryid
        and pd.subcategoryid = sb.subcategoryid
        and pd.productid = p.productid
        and b.brandname in(?);`,[req.body.brandlist], function (error, result) {

            if (error) {
               console.log("hellooooooooooooooooooooooooooo",error)
                res.status(500).json({ data:[], status: false })
            } else {
                res.status(200).json({ data:result, status: true })
                console.log(result.data)
            }
        })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ message: 'fail to fetch products', status: false })
    }
});

router.post('/fetch_products_by_brands_and_category', function(req, res, next) {
  console.log("req.body.categorylist",req.body.categorylist)
  console.log("req.body.brandlist",req.body.brandlist)
  try {
      pool.query(`select pd.* , b.brandname , c.categoryname , sb.subcategoryname , p.productname , p.icon from productdetails pd , brands b , category c , subcategory sb , products p
      where pd.brandid = b.brandid 
      and pd.categoryid = c.categoryid
      and pd.subcategoryid = sb.subcategoryid
      and pd.productid = p.productid
      and b.brandname in(?)
      and c.categoryname in(?)`,[req.body.brandlist,req.body.categorylist], function (error, result) {

          if (error) {
             console.log("hellooooooooooooooooooooooooooo",error)
              res.status(500).json({ data:[], status: false })
          } else {
              res.status(200).json({ data:result, status: true })
              console.log(result.data)
          }
      })
  }
  catch (e) {
      console.log(e)
      res.status(200).json({ message: 'fail to fetch products', status: false })
  }
});


router.post('/fetch_products_by_category', function(req, res, next) {
  console.log("req.body.categorylist",req.body.categorylist)
  try {
      pool.query(`select pd.* , b.brandname , c.categoryname , sb.subcategoryname , p.productname , p.icon from productdetails pd , brands b , category c , subcategory sb , products p
      where pd.brandid = b.brandid 
      and pd.categoryid = c.categoryid
      and pd.subcategoryid = sb.subcategoryid
      and pd.productid = p.productid
      and c.categoryname in(?);`,[req.body.categorylist], function (error, result) {

          if (error) {
             console.log("hellooooooooooooooooooooooooooo",error)
              res.status(500).json({ data:[], status: false })
          } else {
              if(result.length >=1){
                res.status(200).json({ data:result, status: true })
              }else{
                console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
                res.status(200).json({ data:[], status: true })
              }
             
              console.log(result.data)
          }
      })
  }
  catch (e) {
      console.log(e)
      res.status(200).json({ message: 'fail to fetch products', status: false })
  }
});


router.post('/fetch_products_by_price', function(req, res, next) {
 
  try {
      pool.query(`select pd.* , b.brandname , c.categoryname , sb.subcategoryname , p.productname , p.icon from productdetails pd , brands b , category c , subcategory sb , products p
      where pd.brandid = b.brandid 
      and pd.categoryid = c.categoryid
      and pd.subcategoryid = sb.subcategoryid
      and pd.productid = p.productid
      and pd.offerprice between ? and ?
      and (p.productname like '%${req.body.pattern}%' or pd.productsubname like '%${req.body.pattern}%' or c.categoryname like '%${req.body.pattern}%' or b.brandname like '%${req.body.pattern}%' or sb.subcategoryname like '%${req.body.pattern}%');`,[req.body.minPrice,req.body.maxPrice], function (error, result) {

          if (error) {
             console.log("hellooooooooooooooooooooooooooo",error)
              res.status(500).json({ data:[], status: false })
          } else {
              if(result.length >=1){
                res.status(200).json({ data:result, status: true })
              }else{
                console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
                res.status(200).json({ data:[], status: true })
              }
             
              console.log(result.data)
          }
      })
  }
  catch (e) {
      console.log(e)
      res.status(200).json({ message: 'fail to fetch products', status: false })
  }
});
  
router.post('/fetch_products_by_price_and_brands', function(req, res, next) {
  console.log("bhai brandlist ==> ",req.body.brandlist)
  try {
      pool.query(`select pd.* , b.brandname , c.categoryname , sb.subcategoryname , p.productname , p.icon from productdetails pd , brands b , category c , subcategory sb , products p
      where pd.brandid = b.brandid 
      and pd.categoryid = c.categoryid
      and pd.subcategoryid = sb.subcategoryid
      and pd.productid = p.productid
      and b.brandname in(?)
      and pd.offerprice between ? and ?;`,[req.body.brandlist,req.body.minPrice,req.body.maxPrice], function (error, result) {

          if (error) {
             console.log("hellooooooooooooooooooooooooooo",error)
              res.status(500).json({ data:[], status: false })
          } else {
              if(result.length >=1){
                res.status(200).json({ data:result, status: true })
              }else{
                console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
                res.status(200).json({ data:[], status: true })
              }
             
              console.log(result.data)
          }
      })
  }
  catch (e) {
      console.log(e)
      res.status(200).json({ message: 'fail to fetch products', status: false })
  }
});

router.post('/fetch_products_by_price_and_category', function(req, res, next) {
      console.log("bhai categorylist ==> ",req.body.categorylist)
  try {
      pool.query(`select pd.* , b.brandname , c.categoryname , sb.subcategoryname , p.productname , p.icon from productdetails pd , brands b , category c , subcategory sb , products p
      where pd.brandid = b.brandid 
      and pd.categoryid = c.categoryid
      and pd.subcategoryid = sb.subcategoryid
      and pd.productid = p.productid
      and c.categoryname in(?)
      and pd.offerprice between ? and ?;`,[req.body.categorylist,req.body.minPrice,req.body.maxPrice], function (error, result) {

          if (error) {
             console.log("hellooooooooooooooooooooooooooo",error)
              res.status(500).json({ data:[], status: false })
          } else {
              if(result.length >=1){
                res.status(200).json({ data:result, status: true })
              }else{
                console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
                res.status(200).json({ data:[], status: true })
              }
             
              console.log(result.data)
          }
      })
  }
  catch (e) {
      console.log(e)
      res.status(200).json({ message: 'fail to fetch products', status: false })
  }
});


router.post('/fetch_products_by_price_and_brands_and_category', function(req, res, next) {

  try {
      pool.query(`select pd.* , b.brandname , c.categoryname , sb.subcategoryname , p.productname , p.icon from productdetails pd , brands b , category c , subcategory sb , products p
      where pd.brandid = b.brandid 
      and pd.categoryid = c.categoryid
      and pd.subcategoryid = sb.subcategoryid
      and pd.productid = p.productid
      and b.brandname in(?)
      and c.categoryname in(?)
      and pd.offerprice between ? and ?;`,[req.body.brandlist,req.body.categorylist,req.body.minPrice,req.body.maxPrice], function (error, result) {

          if (error) {
             console.log("hellooooooooooooooooooooooooooo",error)
              res.status(500).json({ data:[], status: false })
          } else {
              if(result.length >=1){
                res.status(200).json({ data:result, status: true })
              }else{
                console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
                res.status(200).json({ data:[], status: true })
              }
             
              console.log(result.data)
          }
      })
  }
  catch (e) {
      console.log(e)
      res.status(200).json({ message: 'fail to fetch products', status: false })
  }
});


module.exports = router;