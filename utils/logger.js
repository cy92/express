let fl = {};
const { timeStamp } = require('console');
const fs = require('fs');
let date = getToday();
let fileList = ['EV', 'ER', 'TR', 'RQ', 'RS'];

fl.eventLog = ()=>{

}

fl.trxLog = ()=>{

}

fl.rqLog = ()=>{

}

fl.rsLog = ()=>{

}

fl.erLog = ()=>{

}

fl.checkFile = ()=>{
    console.log(Date.now());
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
    console.log(Date.now());
    listFile();
}

function getToday(){
    let t = new Date();
    let y = t.getFullYear().toString();
    let m = (t.getMonth() + 1).toString();
    let d = t.getDate().toString();

    return y+m.padStart(2, '0')+d.padStart(2,'0');
}

function listFile(){
    fs.readdir('./log', (err, files) => {
       // console.log(files.reverse());    
    });
}

module.exports =fl;
