const { query } = require('express');
const express = require('express');
const router = express.Router();
const dbpool = require('../utils/mysql');
const rsp = require('../utils/response');

router.post("/getOrderList", (req, res) =>{
    let sql = "Select a.orderNumber, DATE_FORMAT(a.orderDate, '%Y-%m-%d') as orderDate, DATE_FORMAT(a.requiredDate, '%Y-%m-%d') as requiredDate, DATE_FORMAT(a.shippedDate, '%Y-%m-%d') as shippedDate, a.status, b.customerName from orders a inner join customers b on a.customerNumber = b.customerNumber ";
    let resp = {}
    if (req.body){
        sql += " Where a.orderNumber != '' ";
        if (req.body.orderDate &&  req.body.orderDate.trim() != ""){
            sql += " and CAST(a.orderDate as char) = '" + req.body.orderDate + "' ";
        }

        if (req.body.status &&  req.body.staus.trim() != ""){
            sql += " and a.status = '" + req.body.status + "' ";
        }

        if (req.body.customerName &&  req.body.customerName.trim() != ""){
            sql += " and b.customerName like '%" + req.body.customerName + "%' ";
        }
    }

    sql += " order by 2 desc ";
    dbpool.query(sql, (err, result, field)=>{
        if (err){
            console.log(err);
            resp = rsp._fail;
        }
        else{
            resp = (result.length > 0) ? rsp._success : rsp._norecord;
            resp.data = result;
        }
        res.send(resp);
    });
});

router.post("/getCustomerOrderList", (req, res) =>{
    let sql = "Select orderNumber, DATE_FORMAT(orderDate, '%Y-%m-%d') as orderDate, DATE_FORMAT(requiredDate, '%Y-%m-%d') as requiredDate, DATE_FORMAT(shippedDate, '%Y-%m-%d') as shippedDate, status, customerNumber from orders ";
    let resp = {}

    if (req.body.customerNumber && req.body.customerNumber.trim() != "" ){
        sql += " Where customerNumber = " + req.body.customerNumber.trim() + " order by orderDate desc ";
        dbpool.query(sql, (err, result, fields)=> {
            if (err){
                console.log(err);
                resp = rsp._fail;
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

router.post("/getOrderDetail", (req, res) =>{
    let sql = "Select a.orderNumber, a.orderDate, a.requiredDate, a.shippedDate, a.status, b.productCode, b.quantityOrdered, b.priceEach, c.productName, c.productVendor from orders a inner join orderdetails b on a.orderNumber = b.orderNumber inner join products c on b.productCode = c.productCode ";
    if (req.body.orderNumber && req.body.orderNumber.trim() != "" ){
        sql += " Where a.orderNumber = " + req.body.orderNumber.trim() + " order by a.orderDate desc ";
        dbpool.query(sql, (err, result, fields)=> {
            if (err){
                console.log(err);
                resp = rsp._fail;
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

router.use("/", (req, res, next)=>{
    //route not found
    next();
});

module.exports = router;