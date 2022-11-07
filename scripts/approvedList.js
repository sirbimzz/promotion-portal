var currentRowCollection = null;
var rowCollection = null;
var current = null;

current = {};
rowCollection = {};

function processUser(data){
	current["user"] = lowCase(data);
}

function processUsers(data){
    current["usersData"] = data;
    for(var i = 0; i < data.length; i++) {
        if (current["user"] == lowCase(data[i].userName)) {
            rowCollection["access"] = data[i].accessProfile;
            rowCollection["dept"] = data[i].userDept;
            rowCollection["div"] = data[i].userDiv;
            rowCollection["HRO"] = data[i].sortHRO;
            rowCollection["HRODept"] = rowCollection["HRO"].slice(0, -1);
        }
    }
}

function processDataList(data){}

var rowDB = null;  
rowDB = {};

function processDept(data){
    rowDB["dept"] = data;
}

function processData(data){
    rowDB["data"] = data;
      ///////////HRT Approved for Promotion
    
      $("#hrt").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
      });

	var table5 = $('#hrt').DataTable({
					deferLoading:true,
                    "bPaginate": false,
					dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        			autoWidth: false,
                    "bInfo" : false,
        			buttons: [
        				{ extend: 'excel', text: 'Export Promotion List to Excel' }
        			],
                    "data": data,
                    select:"single",
        "columns": [
        	{ "data": "genCriteria", render: showInfo },
            { "data": "persNo", title:"Pers. No." },
            { "data": "persName", title:"Personnel Name", width:"20%" },
            { "data": "empSubgroup", title:"Employee Subgroup", width:"15%" },
            { "data": "persSubarea", title:"Div" },
            { "data": "orgUnit", title:"Dept" },
            { "data": "persPosition", title:"Position", width:"20%" },
            { "data": "refIndic", title:"Ref. Indic." },
            { "data": "psGroup", title:"Curr. SG" },
            { "data": "psGroup", title:"New SG", render: newSG },
            { "data": "jobGroup", title:"Job Group" },
            { "data": "yr1IPF", title:"Yr1 IPF", render: approx },
            { "data": "yr2IPF", title:"Yr2 IPF", render: approx },
            { "data": "yr3IPF", title:"Yr3 IPF", render: approx },
            { "data": "avgIPF", title:"Avg IPF", render: approx },
            { "data": "headRoom", title:"Head Room" },
            { "data": "sbCriteria", title:"Meet A&P?", render: showAP },
            { "data": "lastCep", title:"CEP" },
            { "data": "promYr", title:"Last Prom. Year" },
            { "data": "genCriteria", title:"Meet Criteria?", width:"5%" },
            { "data": "sConsider", title:"Special Consideration?" },
            { "data": "promStatus", title:"Status", width:"12%"  },
            { "data": "mgrComment", title:"Justification for Nomination" },
        ],
        columnDefs: [ 
            { "targets": [ 20,22 ], "visible": false },
        	{ "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ] }
        ],
        'searchCols': [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        { 'sSearch': 'Approved at Challenge Session' },
      	],
        "order": [[21, 'asc'],[4, 'asc'],[5, 'asc']],
    });

    document.getElementById("hrtCount").innerHTML = table5.rows( {search:'applied'} ).count();
    
    // Add event listener for opening and closing details
    $('#hrt tbody').on('click', 'i.rowInfo', function () {
        var tr = $(this).closest('tr');
        var tdi = tr.find("i.fa");
        var row = table5.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
            tdi.first().removeClass('fa-minus-square');
            tdi.first().addClass('fa-plus-square');
        }
        else {
        // Open this row
        row.child(format(row.data())).show();
        tr.addClass('shown');
        tdi.first().removeClass('fa-plus-square');
        tdi.first().addClass('fa-minus-square');
        }
    });
    
    table5.on("user-select", function (e, dt, type, cell, originalEvent) {
        if ($(cell.node()).hasClass("details-control")) {
            e.preventDefault();
        }
    });

    ///////////HRO Approved for Promotion
    
    $("#hro").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
      });

	var table = $('#hro').DataTable({
        deferLoading:true,
        "bPaginate": false,
        dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        autoWidth: false,
        "bInfo" : false,
        buttons: [
            //{ extend: 'excel', text: 'Export Promotion List to Excel' }
        ],
        "data": data,
        select:"single",
        "columns": [
        	{ "data": "genCriteria", render: showInfo },
            { "data": "persNo", title:"Pers. No." },
            { "data": "persName", title:"Personnel Name", width:"20%" },
            { "data": "empSubgroup", title:"Employee Subgroup", width:"15%" },
            { "data": "persSubarea", title:"Div" },
            { "data": "orgUnit", title:"Dept" },
            { "data": "persPosition", title:"Position", width:"20%" },
            { "data": "refIndic", title:"Ref. Indic." },
            { "data": "psGroup", title:"Curr. SG" },
            { "data": "psGroup", title:"New SG", render: newSG },
            { "data": "jobGroup", title:"Job Group" },
            { "data": "yr1IPF", title:"Yr1 IPF", render: approx },
            { "data": "yr2IPF", title:"Yr2 IPF", render: approx },
            { "data": "yr3IPF", title:"Yr3 IPF", render: approx },
            { "data": "avgIPF", title:"Avg IPF", render: approx },
            { "data": "headRoom", title:"Head Room" },
            { "data": "sbCriteria", title:"Meet A&P?", render: showAP },
            { "data": "lastCep", title:"CEP" },
            { "data": "promYr", title:"Last Prom. Year" },
            { "data": "genCriteria", title:"Meet Criteria?", width:"5%" },
            { "data": "sConsider", title:"Special Consideration?" },
            { "data": "promStatus", title:"Status", width:"12%"  },
            { "data": "sortHRO" },
        ],
        columnDefs: [ 
            { "targets": [ 20,22 ], "visible": false },
        	{ "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,19,20,21,22 ] }
        ],
        'searchCols': [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        { 'sSearch': 'Approved at Challenge Session' },
        { 'sSearch': rowCollection["HRODept"] },
      	],
        "order": [[21, 'asc'],[4, 'asc'],[5, 'asc']],
    });

    document.getElementById("hroCount").innerHTML = table.rows( {search:'applied'} ).count();
    
    // Add event listener for opening and closing details
    $('#hro tbody').on('click', 'i.rowInfo', function () {
        var tr = $(this).closest('tr');
        var tdi = tr.find("i.fa");
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
            tdi.first().removeClass('fa-minus-square');
            tdi.first().addClass('fa-plus-square');
        }
        else {
        // Open this row
        row.child(format(row.data())).show();
        tr.addClass('shown');
        tdi.first().removeClass('fa-plus-square');
        tdi.first().addClass('fa-minus-square');
        }
    });
    
    table.on("user-select", function (e, dt, type, cell, originalEvent) {
        if ($(cell.node()).hasClass("details-control")) {
            e.preventDefault();
        }
    });

    ///////////// Load page based on Role
        
    if (rowCollection["access"] == "HRT") {
        $('#homepage').show();
        $('#error').hide();
        $('#PP1').show();	
        $('#tab1').show();
        $('#PP2').hide();	
        $('#tab2').hide();
    }
    else if (rowCollection["access"] == "HRO") {
        $('#homepage').show();
        $('#error').hide();
        $('#PP1').hide();	
        $('#tab1').hide();
        $('#PP2').show();	
        $('#tab2').show();
    }
    else {
        $('#homepage').hide();
        $('#error').show();
    }
    $("#loading").hide();
    
}

function format(d){
    if (d.mgrComment == "") {
        var mgrComment = ""
    }
    else {
        var mgrComment = '<b>' + "Justification for Nomination: " + '</b>' + d.mgrComment + '<br>' + '<br>';
    }
    if (d.hrtReason == "") {
        var hrtReason = ""
    }
    else {
        var hrtReason = '<b>' + "HRT's Reason for Decline: " + '</b>' + d.hrtReason + '<br>' + '<br>';
    }
    if (d.gmReason == "") {
        var gmReason = ""
    }
    else {
        var gmReason = '<b>' + "HRO's Reason for Decline: " + '</b>' + d.gmReason + '<br>' + '<br>';
    }
    if (d.mgrReason == "") {
        var mgrReason = ""
    }
    else {
        var mgrReason = '<b>' + "GMs/ Manager's Justification for Decline: " + '</b>' + d.mgrReason + '<br>' + '<br>';
    }
    if (d.sConsider == "") {
        var sConsider = ""
    }
    else {
        var sConsider = '<b>' + "Special Consideration: " + '</b>' + d.sConsider + '<br>' + '<br>';
    }
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px; width:84%; margin-left:8.9%;">' +
        //'<th>' + '' + '</th>' + '<th>' + '' + '</th>' + 
        '<tr>' +
            '<td style="width:80%;">' + sConsider + mgrComment + mgrReason + hrtReason + gmReason + '</td>' +
        '</tr>' +
    '</table>'; 
};

function format2(d){

// `d` is the original data object for the row
return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px; width:84%; margin-left:8.9%;">' +
        //'<th>' + '' + '</th>' + '<th>' + '' + '</th>' + 
        '<tr>' +
            '<td style="width:21%;">' + '<b>' + 'Reason for Nomination:' + '</b>' + '</td>' + '<td style="width:75%;">' + d.mgrComment + '</td>' +
        '</tr>' +
        '<tr>' +
            '<td style="width:21%;">' + '<b>' + 'Reason for Decline:' + '</b>' + '</td>' + '<td style="width:75%;">' + d.gmReason + '</td>' +
        '</tr>' +
        '</table>'; 
};

function formatDatee(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function showApprove(genCriteria) {
	if (genCriteria == "NO") {
		return '<i class="editRow2"><button id="editRow2" style="background:#70AD47; color:white; width:85%;">&#10004;</button></i><i class="editRow3"><button id="editRow3" style="background:red; color:white; width:85%;">&#10006;</button></i>';
	}
	else {
		return ""
	}
}

function showInfo(genCriteria) {
	if (genCriteria == "NO") {
		//return '<i class="fa fa-plus-square" aria-hidden="true"></i>';
		return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
	}
	else {
		return ""
	}
}

function showInfo2(promStatus) {
	if (promStatus == "Declined at Challenge Session" || promStatus == "Declined by HRT") {
		//return '<i class="fa fa-plus-square" aria-hidden="true"></i>';
		return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
	}
	else {
		return ""
	}
}

function approx(ipf) {
    if (ipf == "") {
        return "";
    }
    else {
        return (parseFloat(ipf)).toFixed(2);
    }
}

$(document).ready(function(){
  var id_num = 0;                                    // define the id number
  $('#show').on('click',function(){
      id_num++;                                      // add +1 to the id number
      $('#' + id_num).show(); // show tr with that id
  });
  $('#hide').on('click',function(){
      $('tr:not(:nth-child(1)):visible:last').hide(); // hide the last visible tr but not the first one
      id_num = $('tr:visible:last').attr('id') ? $('tr:visible:last').attr('id') : 0;                      // check for tr id when hide if this isn't the first return id number if not return 0
  });
});

function titleCase(str) {
   var splitStr = str.toLowerCase().split('.');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1).toLowerCase();     
   }
   return splitStr.join('.'); 
}
function lowCase(str) {
   var splitStr = str.toLowerCase().split('.');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].substring(0).toLowerCase();     
   }
   // Directly return the joined string
   return splitStr.join('.'); 
}

function newSG(SG) {
    if (SG == "") {
        return "";
    }
    else {
        return parseFloat(SG) + 1;
    }
}

function showAP(meetAP){
    if (meetAP == "YES" || meetAP == "NO") {
        return meetAP;
    }
    else {
        return "NA"
    }
}

function openClear(){
    if(rowDB["data"].length == 0){
        alert("Database is empty!")
    }
    else{
        document.getElementById('id06').style.display='block';
    }
}

function postYear(){
    var c = document.getElementById("currYr");
    var currYr = c.options[c.selectedIndex].text;
    if (currYr != ""){
        if (confirm("Confirm selected year is " + currYr + ", Archived records for year " + currYr + " will be deleted.")) {
            updateCurrYr(currYr);
            delFromArch(currYr);
        }
    }
}

function archDB() {
    var c = document.getElementById("currYr");
    var currYr = c.options[c.selectedIndex].text;
    if (currYr == ""){
        alert("Please select the current promotion year!")
    }
    else {
        postArch(0);
        current["otp"] = Math.floor(100000+Math.random()*900000);
        var recipient = current["user"];
        var to = current["user"] + '@nlng.com';
        var cc = 'Cc: ' + current["user"] + '@nlng.com';
        var subject = "Clear Promotion Database - OTP";
        var txt = 'Dear ' + titleCase(recipient) + '\n\nPlease use the One-time Password: ' + current["otp"] + ' to complete the process of clearing the database on the portal.' + '\n\nRegards\nTalent Management';
        sendMail (to,subject,txt,cc);
        document.getElementById('id06').style.display='none';
        document.getElementById('id07').style.display='block';
    }
}

function sendOTP2() {
    current["otp"] = Math.floor(100000+Math.random()*900000);
    var recipient = current["user"];
    var to = current["user"] + '@nlng.com';
    var cc = 'Cc: ' + current["user"] + '@nlng.com';
    var subject = "Clear Promotion Database - OTP";
    var txt = 'Dear ' + titleCase(recipient) + '\n\nPlease use the One-time Password: ' + current["otp"] + ' to complete the process of clearing the database on the portal.' + '\n\nRegards\nTalent Management';
    sendMail (to,subject,txt,cc);
    document.getElementById("currentUser").innerHTML = current["user"] + '@nlng.com';
    document.getElementById('otpMsg').style.display='block';
}

function clearDB() {
    if (document.getElementById("clearCode").value == current["otp"]){
        var count = rowDB["data"].length;
        deleteData(0);
        document.getElementById('id07').style.display='none';

        var cc = "";
        for(var m = 0; m < current["usersData"].length; m++) {
            if (current["usersData"][m].accessProfile == "HRT") {
                var cc = cc + current["usersData"][m].userEmail + ', ';
                //var recipient = current["usersData"][m].userName;
            }
        }
        var to = current["user"] + '@nlng.com';
        var recipient = current["user"];
        var cc = 'Cc: ' + cc;
        var subject = "Promotion Database Cleared";
        var txt = 'Dear ' + titleCase(recipient) + '\n\nThe database has been cleared and archived successfully.\n\nVisit the link below to confirm. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/index.html' + '\n\nRegards\nTalent Management';

        if (count == 0) {
            alert("Database is empty")
        }
        else {
            sendMail (to,subject,txt,cc)
            alert("The database has been cleared and archived");
            location.reload();
        }
    }
    else {
        alert("Invalid or expired OTP!");
    }
}