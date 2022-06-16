let fl = {};
const { timeStamp } = require('console');
const fs = require('fs');
let date = getToday();
let fileList = ['EV', 'ER', 'TR', 'RQ', 'RS'];
const maxfile = 5;

fl.eventLog = ()=>{

}

fl.trxLog = (req)=>{
    let id = req.id;
    let dnow = new Date();
    let y = dnow.getFullYear().toString();
    let m = (dnow.getMonth() + 1).toString().padStart(2, "0");
    let d = dnow.getDate().toString().padStart(2, "0");
    let nh = dnow.getHours();
    let nm = dnow.getMinutes().toString().padStart(2, "0");
    let ns = dnow.getSeconds().toString().padStart(2, "0");
    let now = y+"/"+m+"/"+ d + " " + nh + ":" +nm + ":" + ns;
    let url = req.url;
    let method = req.method;
    let client = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    client = (client.includes("127.0.0.1"))? "127.0.0.1": client;

    let logstr = now+","+method+","+url+","+client;
    writeLog("TR", logstr);
}

fl.rqLog = ()=>{

}

fl.rsLog = ()=>{

}

fl.erLog = (err, req, res, next)=>{
    console.log(123);
    next(err);
}

fl.checkFile = ()=>{
    console.log("Start logger : ", Date.now());
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
    console.log("End checking:", Date.now());
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

function writeLog(logname, input){
    let wrfile = logname+"_"+date;
    fs.appendFile('./log/'+wrfile+".txt", input+"\n", (err)=>{
        if (err){
            console.log("Write file error : " + err);
        }
    });
}

module.exports =fl;
