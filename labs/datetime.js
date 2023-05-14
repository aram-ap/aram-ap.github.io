function telltime() {
    var out = "";
    var now = new Date();
    out += "<br />Date: " + now.getDate();
    out += "<br />Month: " + now.getMonth();
    out += "<br />Year: " + now.getFullYear();
    out += "<br />Hours: " + now.getHours();
    out += "<br />Minutes: " + now.getMinutes();
    out += "<br />Seconds: " + now.getSeconds();
    document.getElementById("div1").innerHTML = out;
}

window.onload = function() {
    var jsActiveDiv = document.getElementById("hasJS");
    var dateTimeLabel = document.createTextNode("The current date and time are:");
    var div1 = document.createElement("div");
    div1.setAttribute("id","div1");
    var refreshButton = document.createElement("input");
    refreshButton.setAttribute("id", "btn1");
    refreshButton.setAttribute("type", "button");
    refreshButton.setAttribute("value", "Refresh ");

    jsActiveDiv.appendChild(dateTimeLabel);
    jsActiveDiv.appendChild(div1);
    jsActiveDiv.appendChild(refreshButton);

    document.getElementById("btn1").onclick= function() {location.reload();}
    telltime();
}
