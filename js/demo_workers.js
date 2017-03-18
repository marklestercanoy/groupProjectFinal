//-----------Count Timer
var i = 0;

function timedCount() {
    i = i + 1;
    postMessage(i);
    setTimeout("timedCount()",1000);
}
function load(size) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            //document.getElementById("");
            var obj = JSON.parse(xhttp.responseText);
            if(size <= Object.keys(obj).length){
                console.log(size);
                if(size == Object.keys(obj).length){
                    postMessage(obj);
                }else{
                    postMessage(size);
                }
            }
        }
    };
    xhttp.open("GET","json/users.json",true);
    xhttp.send();
}
timedCount();
console.log("Ok");
