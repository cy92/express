let fl = {};
const { timeStamp } = require('console');
const fs = require('fs');
let date = getToday();
let fileList = ['EV', 'ER', 'TR', 'RQ', 'RS'];
const maxfile = 5;

fl.eventLog = ()=>{

}

fl.trxLog = (req)=>{

}

fl.rqLog = ()=>{

}

fl.rsLog = ()=>{

}

fl.erLog = ()=>{

}

fl.checkFile = ()=>{
    console.log(Date.now());
    date = getToday();
    fileList.forEach((ele)=>{
        let temp = ele+"_"+date;
        if (!fs.existsSync('./log/'+temp+'.txt')){
            fs.writeFile('./log/'+temp+'.txt','',function(err, fd){
                if (err) {
                    console.log(err)
                }
            });
        }
    });
    listFile();
    console.log(Date.now());
}

function getToday(){
    let t = new Date();
    let y = t.getFullYear().toString();
    let m = (t.getMonth() + 1).toString();
    let d = t.getDate().toString();

    return y+m.padStart(2, '0')+d.padStart(2,'0');
}

function getNow(){
    let t = new Date();
    let y = t.getFullYear().toString();
    let m = (t.getMonth() + 1).toString();
    let d = t.getDate().toString();
    let h = t.getHours().toString();
    let min = t.getMinutes().toString();
    let s = t.getSeconds().toString();

    return y+"-"+m.padStart(2, '0')+"-"+d.padStart(2,'0') + " " + h.padStart(2,'0') + ":" + min.padStart(2,'0') + ":" + s.padStart(2,'0');
}

function listFile(){
    //Check and clean up file if file is more than number should keep.
    fs.readdir('./log', (err, files) => {
        fileList.forEach((ele) =>{
            let tempary = files.filter((item) => {
                return item.indexOf(ele) >= 0;
            });
            if (tempary.length > maxfile){
                let rmary = tempary.reverse().slice(maxfile);
                rmary.forEach((ele) =>{
                    fs.unlinkSync('./log/'+ele);
                });
            }
        });
    });
}

module.exports =fl;
