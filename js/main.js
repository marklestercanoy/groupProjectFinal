// ----------------- LOCAL STORAGE

var submitBtn = $("#submitBtn");
var tyDisplay = $("#thankYou");
var formData = $ ("form input");

checkLocalStorage();

submitBtn.click(function(event){
    event.preventDefault();
    localStorage.clickcount = 1;
    checkLocalStorage();
});

function checkLocalStorage(){
    if (typeof localStorage.clickcount !== "undefined") {
        $.each(formData, function (fieldNum, field) {
            //storing form date
            localStorage.setItem(field.name, field.value);
            //console.log(localStorage.getItem(field.name));
        });
        //display a thank you message
        tyDisplay.html("Thank you for submitting");
        //hide button
        submitBtn.css({"display": "none"});
        //hideform
        $("form.normal").css({"opacity": 0});
    }else{
        $("form.normal").css({"opacity":"1"});
        tyDisplay.hide().fadeIn(500);
    }

}



// Registration Form

var email = $("#email");
var  fullName = $("#name");
var gender = $("#gender");
var bDate = $("#birthDate");
var submit = $("#submit");

//AJAX CALL
$.ajax({
    url:"json/users.json",
    method:"GET",
    dataType:"json"
}).success(function(response){
    // if the request is successful then return a success response
    console.log("success: " + response);
    console.log(response);

    $.each(response,function(key,value){
        console.log(key+":"+value);
        console.log(email[0].value = key);

        $.each(value,function(usersKey,usersValue){
            console.log(fullName[usersKey].value = usersValue.name);
            console.log(gender[usersKey].value = usersValue.gender);
            console.log(bDate[usersKey].value = usersValue.birthDate.month+" "+usersValue.birthDate.day+","+usersValue.birthDate.year);
        });
    });
}).error(function(response){
    //if the request is failed then return an error response
    console.log(response);

});

//-------------- Web Worker

var w;
function startWorker() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("demo_workers.js");
        }
        w.onmessage = function(event) {
            document.getElementById("result").innerHTML = event.data;
        };
    } else {
        document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
    }
}

function stopWorker() {
    w.terminate();
    w = undefined;
}