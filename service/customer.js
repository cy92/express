const express = require('express');
const router = express.Router();
const dbpool = require('../utils/mysql');
const rsp = require('../utils/response');

router.post("/getCustomerList", (req , res) =>{
    let sql = "Select customerNumber, customerName, phone, city, country, creditLimit from customers";
    let resp = {}
    if (req.body){
        sql += " Where customerNumber != '' ";
        if (req.body.customerName && req.body.customerName.trim() !=""){
            sql += " and customerName like '%"+ req.body.customerName.trim() + "'% ";
        }
        if (req.body.country && req.body.country.trim() !=""){
            sql += " and country = '"+ req.body.country.trim() + "' ";
        }
        if (req.body.city && req.body.city.trim() !=""){
            sql += " and city = '"+ req.body.city.trim() + "' ";
        }
    }
    sql += " order by 1";

    dbpool.query(sql, (err, result, field)=>{
        if (err){
            console.log(err);
            resp = rsp._fail;
        }
        else{
            if (result.length > 0){
                resp = rsp._success;
            }
            else{
                resp = rsp._norecord;
            }
            resp.data = result;
        }
        res.send(resp);
    });
});

router.post("/getCustomerDetail", (req , res) =>{
    let sql = "Select customerNumber, customerName, phone, addressLine1, addressLine2, city, state, postalCode, country, creditLimit from customers";
    let resp = {}
    if (req.body.customerNumber && req.body.customerNumber.trim() != ""){
        sql += " Where customerNumber = " + req.body.customerNumber.trim();
        dbpool.query(sql, (err, result, fields)=>{
            if (err){
                console.log(err);
                resp = rsp._fail;
            }
            else{
                if (result.length > 0){
                    resp = rsp._success;
                }
               else{
                resp = rsp._norecord;
               }
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