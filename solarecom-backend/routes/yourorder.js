var express = require('express')
var router = express.Router();
var pool = require('./pool')

/* GET home page. */
router.post('/submit_orderdetails', function(req, res, next) {
  try{

    let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December']
    let d = new Date()
    let date = d.getDate()+" "+monthList[d.getMonth()]+" "+d.getFullYear()

    pool.query("insert into yourorder (productdetailid,userid,addressid,transitionid,date,qty) values(?,?,?,?,?,?)",[req.body.productdetailid,req.body.userid,req.body.addressid,req.body.transitionid,date,req.body.qty],function(error,result){
        if (error) {
            console.log("hellooooooooooooooooooooooooooo",error)
             res.status(500).json({ data:[], status: false })
         } else {
             res.status(200).json({ data:result, status: true })
             console.log(result.data)
         }
    })    
  }catch(err){
    console.log(e)
    res.status(400).json({ message: 'fail to submit', status: false })
  }
});

router.post('/fetch_orderid', function(req, res, next) {
    try {
        console.log("id =====> ",req.body.transitionid)
        pool.query("select * from yourorder where transitionid=?",[req.body.transitionid] ,function (error, result) {

            if (error) {
               console.log("hellooooooooooooooooooooooooooo",error)
                res.status(500).json({ data:[], status: false })
            } else {
                res.status(200).json({ data:result, status: true })
                console.log("result data",result)
            }
        })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ message: 'fail to fetch order details', status: false })
    }
});

router.post('/fetch_products', function(req, res, next) {
    try {
        pool.query(`select b.brandname,c.categoryname,sc.subcategoryname,p.productname,pd.*,ad.*,yo.* 
from brands b,category c,subcategory sc,products p,productdetails pd,useraddress ad,yourorder yo
where yo.productdetailid=pd.productdetailid
and yo.addressid=ad.addressid
and yo.userid=?
and pd.brandid=b.brandid
and pd.categoryid=c.categoryid
and pd.subcategoryid=sc.subcategoryid
and pd.productid=p.productid;`,[req.body.userid] ,function (error, result) {

            if (error) {
               console.log("hellooooooooooooooooooooooooooo",error)
                res.status(500).json({ data:[], status: false })
            } else {
                res.status(200).json({ data:result, status: true })
                console.log("result data",result)
            }
        })
    }
    catch (e) {
        console.log(e)
        res.status(200).json({ message: 'fail to fetch products', status: false })
    }
});

module.exports = router;
