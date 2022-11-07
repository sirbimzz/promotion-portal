/*var dataLink = "http://bny-s-t117/datacentric/promotion/PromotionEligibility/Eligibility_list/Elibility.json";
//var dataLink = "http://10.4.19.36/PromotionEligibility/Eligibility_list/Elibility.json";
var usersLink = "http://bny-s-t117/datacentric/promotion/php/getUsersData.php";
var userLink = "http://bny-s-t117/datacentric/promotion/php/getUser.php";
var deptLink = "http://bny-s-t117/datacentric/promotion/php/getDept.php";
var dbLink = "http://bny-s-t117/datacentric/promotion/php/getData.php";

function sentRequest(onePath, callback, payload, callbackData){	
	var xhttp = new XMLHttpRequest();
  	xhttp.withCredentials = true
  	if(callbackData){
	  xhttp.callbackData = callbackData;
  	} 
 	xhttp.onreadystatechange = callback;
  
  	if(payload){
	  xhttp.open("POST", onePath, true);
	  xhttp.send(payload);
  	}else
  	{
	  xhttp.open("GET", onePath, true);
	  xhttp.send();
  	}
  
}

$(document).ready(function () {
	sentRequest(userLink , userCallBack, null);
	sentRequest(usersLink , usersCallBack, null);
	sentRequest(deptLink , deptCallBack, null);
	sentRequest(dataLink , dataCallBack, null);
	sentRequest(dbLink , dbCallBack, null);
	console.log("sent data request");
});

function userCallBack() {
	if (this.readyState == 4 && (this.status == 200)) {
		var obj = (this.responseText).split('\\');
        var userName = obj[1];
       	processUser(userName);
  	}
  	else{
  	}
}
function usersCallBack() {
	if (this.readyState == 4 && (this.status == 200)) {
  		var liveData = JSON.parse(this.responseText);
  		processUsers(liveData);
  	}
  	else{
  	}
}
function deptCallBack() {
	if (this.readyState == 4 && (this.status == 200)) {
  		var liveData = JSON.parse(this.responseText);
  		processDept(liveData);
  	}
  	else{
  	}
}
function dataCallBack() {
	if (this.readyState == 4 && (this.status == 200)) {
  		var liveData = JSON.parse(this.responseText);
  		processDataList(liveData);
  	}
  	else{
  	}
}
function dbCallBack() {
	if (this.readyState == 4 && (this.status == 200)) {
  		var liveData = JSON.parse(this.responseText);
  		processData(liveData);
  	}
  	else{
  	}
}

*/

$.ajax({
	url : 'php/getUser.php', // your php file
	type : 'GET', // type of the HTTP request
	cache: false,
	success : function(data){
		var obj = data.split('\\');
		var userName = obj[1];
		processUser(userName);
		$.ajax({
			url : 'php/getUsersData.php', // your php file
			type : 'GET', // type of the HTTP request
			cache: false,
			success : function(data){
			   var obj = jQuery.parseJSON(data);
			   processUsers(obj);
			   $.ajax({
					url : 'php/getDept.php', // your php file
					type : 'GET', // type of the HTTP request
					cache: false,
					success : function(data){
						var obj = jQuery.parseJSON(data);
						processDept(obj);
						$.ajax({
							url : 'php/getData.php', // your php file
							type : 'GET', // type of the HTTP request
							cache: false,
							success : function(data){
							   var obj = jQuery.parseJSON(data);
							   processData(obj);
							   $.ajax({
									url : 'PromotionEligibility/Eligibility_list/Elibility.json', // your php file
									type : 'GET', // type of the HTTP request
									dataType : 'json',
    								async: true,
									cache: false,
									success : function(data){
										processDataList(data);
									}
								});
							}
						});
					}
				});
			}
		});
	}
});