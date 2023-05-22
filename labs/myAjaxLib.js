

function addZero(x, n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}

function getTimeString() {
    const d = new Date();
    let h = addZero(d.getHours(), 2);
    let m = addZero(d.getMinutes(), 2);
    let s = addZero(d.getSeconds(), 2);
    let ms = addZero(d.getMilliseconds(), 3);
    return "(" + h + ":" + m + ":" + s + ":" + ms + ")";
}

function getXMLHttpRequest() {
    var msg = "0: request not initialized " + getTimeString();
    state(msg);
    try {
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(e) {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }
    }
    catch(e) {
        return new XMLHttpRequest();
    }
}

function doAjax(url, query, callback, reqtype, getxml) {
    var myreq = getXMLHttpRequest();

    myreq.onreadystatechange = function() {

        let t = getTimeString();


        switch(myreq.readyState) {
            case 0:
                var msg = "0: request not initialized " + t;
                state(msg);
                break;
            case 1:
                var msg = "1: server connection established " + t;
                state(msg);
                break;
            case 2:
                var msg = "2: request received "  + t;
                state(msg);
                break;
            case 3:
                var msg = "3: processing request " + t;
                state(msg);
                break;
            case 4:
                var msg = "4: request finished and response is ready " + t;
                state(msg);
                if(myreq.status == 200) {
                    var item = myreq.responseText;
                    if(getxml == 1) item = myreq.responseXML;
                    eval(callback + '(item)');
                }
                break;
            default:
                var msg = "default";
                state(msg);
                break;

        }
    }


    if(reqtype.toUpperCase() == "POST") {
        requestPOST(url, query, myreq);
    } else {
        requestGET(url, query, myreq);
    }
}

function requestGET(url, query, req) {
    var myRandom = parseInt(Math.random()*99999999);
    if(query == '') {
        var callUrl = url + '?rand=' + myRandom;
    } else {
        var callUrl = url + '?' + query + '&rand=' + myRandom;
    }
    req.open("GET", callUrl, true);
    req.send(null);
}

function requestPOST(url, query, req) {

    req.open("POST", url, true);

    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    req.send(query);

}
