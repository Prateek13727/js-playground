function makeAjaxCall(url, methodType, callback){
   var xhr = new XMLHttpRequest();
   xhr.open(methodType, url, true);
   xhr.send();
   xhr.onreadystatechange = function(){
     if (xhr.readyState === 4){
        if (xhr.status === 200){
           console.log("xhr done successfully");
           var resp = xhr.responseText;
           var respJson = JSON.parse(resp);
           callback(respJson);
        } else {
           console.log("xhr failed");
        }
     } else {
        console.log("xhr processing going on");
     }
   }
   console.log("request sent succesfully");
}


//one ajax call
document.getElementById("userDetails").addEventListener("click", function(){
 //git hub url to get a user details
 var userId = document.getElementById("userId").value;
 var URL = "https://api.github.com/users/"+userId;
 makeAjaxCall(URL, "GET", processUserDetailsResponse);
});
function processUserDetailsResponse(userData){
 console.log("render user details", userData);
}

//seond ajax call
document.getElementById("repoList").addEventListener("click", function(){
 // git hub url to get btford details
 var userId = document.getElementById("userId").value;
 var URL = "https://api.github.com/users/"+userId+"/repos";
 makeAjaxCall(URL, "GET", processRepoListResponse);
});
function processRepoListResponse(repoList){
 console.log("render repo list", repoList);
}


//ajax with jQuery
function makeAjaxCall(url, methodType, callback){
 $.ajax({
    url : url,
    method : methodType,
    dataType : "json",
    success : callback,
    error : function (reason, xhr){
     console.log("error in processing your request", reason);
    }
   });
 }
// git hub url to get btford details
var URL = "https://api.github.com/users/btford";
makeAjaxCall(URL, "GET", function(respJson){
 document.getElementById("userid").innerHTML = respJson.login;
 document.getElementById("name").innerHTML = respJson.name;
 document.getElementById("company").innerHTML = respJson.company;
 document.getElementById("blog").innerHTML = respJson.blog;
 document.getElementById("location").innerHTML = respJson.location;
});










