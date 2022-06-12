const express = require('express');
const router = express.Router();
const dbpool = require("../utils/mysql");
const rsp = require("../utils/response");

router.post("/getProductList", (req, res) =>{
    let sql = "Select productCode , productName, productLine, productVendor, quantityInStock from products";

    if (req.body){
        sql += " Where productCode != '' ";
        if (req.body.productName && req.body.productName.trim() != ""){
            sql += " and productName like '%"+req.body.productName.trim()+"%'";
        }

        if (req.body.productLine && req.body.productLine.trim() != ""){
            sql += " and productLine = '"+req.body.productLine.trim()+"'";
        }

        if (req.body.productVendor && req.body.productVendor.trim() != ""){
            sql += " and productVendor = '"+req.body.productVendor.trim()+"'";
        }
    }

    sql += " order by 1";
    dbpool.query(sql, (err, result, fields) => {
        let resp = {};
        if (err){
            resp = rsp._fail;
            console.log(err);
        }
        else{
            resp = (result.length > 0) ? rsp._success : rsp._norecord;
            resp.data = result;
        }

        res.send(resp);
    });
});

router.post("/getProductDetail", (req, res) =>{
    let sql = "Select a.productCode , a.productName, a.productLine, a.productScale, a.productVendor, a.productDescription, a.quantityInStock, a.buyPrice, a.MSRP, b.textDescription from products a inner join productlines b on a.productLine = b.productLine ";
    let resp = {}
    if (req.body.productCode && req.body.productCode.trim() != ""){
        sql += " Where a.productCode = '"  +req.body.productCode.trim() + "' ";
        dbpool.query(sql, (err, result, fields) => {
            if (err){
                resp = rsp._fail;
                console.log(err);
            }
            else{
                resp = (result.length > 0) ? rsp._success : rsp._norecord;
                resp.data = result;
            }
            res.send(resp);
        });
    }
    else{
        resp = rsp._noinput;
        res.send(resp);
    }
});

module.exports = router;