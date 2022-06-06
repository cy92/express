const resp = {
    _success : {
        resp : 0,
        code : "00",
        desc : ""
    },
    _norecord : {
        resp : 1,
        code : "01",
        desc : "No record"
    },
    _noinput : {
        resp : 1,
        code : "02",
        desc : "No required field provided"
    },
    _fail : {
        resp : 1,
        code : "03",
        desc : "API error"
    },
    _programerr : {
        resp : 1,
        code : "50",
        desc : "API execute fail"
    }
}

module.exports = resp;