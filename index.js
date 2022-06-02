const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const dbpool = require('./utils/mysql');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/office', require("./service/office"));

app.listen(port, ()=>{
    console.log("Express server started with port : " +port);
});