const express = require('express');
const bodyParser = require('body-parser');
const cronjob = require('cron').CronJob;

const app = express();
const port = 3000;

const dbpool = require('./utils/mysql');
const fl = require('./utils/logger');
fl.checkFile();

new cronjob('00 00 * * *', ()=>{
    console.log("File refersh start");
    fl.checkFile();
}, null, true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', (req, res, next)=>{
    next();
});

app.use('/office', require("./service/office"));
app.use('/product', require("./service/product"));

app.listen(port, ()=>{
    console.log("Express server started with port : " +port);
});