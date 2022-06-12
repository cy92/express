const express = require('express');
const router = express.Router();
const rsp = require('../utils/response');
const dbpool = require('../utils/mysql');

router.post("/getEmployeeList", (req, res) => {
    let sql = "Select employeeNumber, lastName, firstName, jobTitle from employees ";

    if (req.body){
        sql += " Where employeeNumber != '' ";
        if (req.body.lastName && req.body.lastName.trim() != ""){
            sql += " and lastName like '%"+req.body.lastName.trim()+"%'";
        }

        if (req.body.firstName && req.body.firstName.trim() != ""){
            sql += " and firstName like '%"+req.body.firstName.trim()+"%'";
        }

        if (req.body.jobTitle && req.body.jobTitle.trim() != ""){
            sql += " and jobTitle = '"+req.body.jobTitle.trim()+"'";
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

router.post("/getEmployeeDetail", (req, res) => {
    let sql = "Select a.employeeNumber, a.lastName, a.firstName, a.jobTitle, a.email, b.city, b.phone, b.addressLine1, b.addressLine2, b.state, b.country, b.postalCode from employees a inner join offices b on a.officeCode = b.officeCode  ";
    let resp = {};
    if (req.body.employeeNumber && req.body.employeeNumber.trim() != ""){
        sql += " Where a.employeeNumber = " + req.body.employeeNumber.trim();
        
        dbpool.query(sql, (err, result, fields)=>{
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

router.post("/getEmployeeReporting", (req, res) => {
    let sql = "Select employeeNumber, lastName, firstName, jobTitle from employees ";
    let resp = {};
    if (req.body.employeeNumber && req.body.employeeNumber.trim() != ""){
        sql += " Where reportsTo = " + req.body.employeeNumber.trim();
        dbpool.query(sql, (err, result, fields)=>{
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

router.post("/getOfficeList", (req, res) => {
    let sql = "Select officeCode, city, state, country, territory from offices ";

    if (req.body){
        sql += " Where officeCode != '' ";

            if (req.body.city && req.body.city.trim() != ""){
                sql += " and city = '"+req.body.city.trim()+"'";
            }

            if (req.body.state && req.body.state.trim() != ""){
                sql += " and state = '"+req.body.state.trim()+"'";
            }

            if (req.body.country && req.body.country.trim() != ""){
                sql += " and country = '"+req.body.country.trim()+"'";
            }
    }
    sql += " order by 1";
    dbpool.query(sql, (err, result, fields)=>{
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
    })
});

module.exports = router;
