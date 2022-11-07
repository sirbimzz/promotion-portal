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
            rowCollection["access"] = data[i].accessProfile;
            rowCollection["dept"] = data[i].userDept;
            rowCollection["div"] = data[i].userDiv;
            rowCollection["HRO"] = data[i].sortHRO;
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
    $("#hro").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
        });
    
    var table7 = $('#hrt').DataTable({
        deferLoading:true,
        "bPaginate": false,
        "bInfo" : false,
        dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        autoWidth: false,
        buttons: [
            //{ extend: 'excel', text: 'Export  to Excel' }
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
            { "data": "genCriteria", title:"Meet Criteria?" },
            { "data": "sConsider", title:"Special Consideration?" },
            { "data": "promStatus", title:"Status", width:"10%"  },
            { "data": "id" },
            { "data": "mgrComment" },
            { "data": "mgrReason" },
            { "data": "sortHRO" },
            //{ "data": "genCriteria", render: showApprove, width:"15px", title:"Action" },
            { "mData": null,
                "bSortable": false,
                "mRender": function (o) { return '<i class="editRow2" title="Approve"><button id="editRow2" style="background:#70AD47; color:white; width:45%;">&#10004;</button></i>&nbsp;<i class="editRow3" title="Decline"><button id="editRow3" style="background:red; color:white; width:45%;">&#10006;</button></i>'; },
                width:"10%",
                title:"Action"
            },
        ],
        columnDefs: [ 
            { "targets": [ 20,22,23,24,25 ], "visible": false },
            { "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24,25,26 ] }
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
        { 'sSearch': 'Approved by GM' },
        null,
        null,
        null,
        null,
            ],
        "order": [[19, 'desc'],[4, 'asc'],[5, 'asc']],
    });

    document.getElementById("hrtCount").innerHTML = table7.rows( {search:'applied'} ).count();

    $('#hro thead th').each(function() {
        var title = $(this).text();
        if(title == 'Div'){
            $(this).append('<br /><textarea style="color: black; font-size: 8pt;" rows="1" cols="4" type="text" placeholder="Search" /></textarea>');		  
        }
        if(title == 'Dept'){
            $(this).append('<br /><textarea style="color: black; font-size: 8pt;" rows="1" cols="4" type="text" placeholder="Search" /></textarea>');		  
        }
        if(title == 'Promotion Year'){
            $(this).append('<br /><textarea style="color: black; font-size: 8pt;" rows="1" cols="4" type="text" placeholder="Search" /></textarea>');		  
        }
        if(title == 'Meet Criteria?'){
            $(this).append('<br /><select style="width: 55px;color:black; font-size: 8pt;"><option value="" selected>Filter</option><option value="YES">YES</option><option value="NO">NO</option></select>');			  
        }
        if(title == 'Special Consideration?'){
            $(this).append('<br /><select style="width: 55px;color:black; font-size:8pt;"><option value="" selected>Filter</option><option value="YES">YES</option><option value="NO">NO</option><option value="N/A">N/A</option></select>');			  
        }
        if(title == 'Status'){
            $(this).append('<br /><select style="width: 55px;color:black; font-size:8pt;"><option value="" selected>Filter</option><option value="Criteria Met">Criteria Met</option><option value="Reviewed by HRT">Reviewed by HRT</option><option value="Approved by Manager">Approved by Manager</option><option value="Approved at Challenge Session">Approved at Challenge Session</option></select>');			  
        }
    });
    
    table7.columns().every( function () {
        var that = this;
                
        $( 'select', this.header() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                .search( this.value )
                .draw();
            }
        });
        $( 'textarea', this.header() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                .search( this.value )
                .draw();
            }
        });
    });
    
    // Add event listener for opening and closing details
    $('#hrt tbody').on('click', 'i.rowInfo', function () {
        var tr = $(this).closest('tr');
        var tdi = tr.find("i.fa");
        var row = table7.row(tr);
    
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
        
    table7.on("user-select", function (e, dt, type, cell, originalEvent) {
        if ($(cell.node()).hasClass("details-control")) {
            e.preventDefault();
        }
    });
    
    //Approve Row
    $('#hrt tbody').on('click', 'i.editRow2', function () {
        
        currentRowCollection = {};
                
        table7.column(20).visible(true);
        table7.column(22).visible(true);
        table7.column(23).visible(true);
        table7.column(24).visible(true);
        table7.column(25).visible(true);
        
        var $row = $(this).closest("tr"); 
        var $tds2 = $row.find("td:eq(2)");
        var $tds7 = $row.find("td:eq(7)");
        var $tds21 = $row.find("td:eq(21)");
        var $tds22 = $row.find("td:eq(22)");
        var $tds23 = $row.find("td:eq(23)"); 
        var $tds25 = $row.find("td:eq(25)");
    
        $.each($tds2, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["persName"] = txt;
        });
        $.each($tds7, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["refIndic"] = txt;
        });
        $.each($tds21, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["promStatus"] = txt;
        });
        $.each($tds22, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["id"] = txt;
        });
        $.each($tds23, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["mgrComment"] = txt;
        });
        $.each($tds25, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["HRO"] = txt;
        });              
        //console.log(currentRowCollection["id"]);            
        table7.column(20).visible(false);
        table7.column(21).visible(false);
        table7.column(23).visible(false);
        table7.column(24).visible(false);
        table7.column(25).visible(false);
    
        var nCount = 0;
        var mCount = 0;
        for(var i = 0; i < rowDB["data"].length; i++) {
            if ((rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Declined at Challenge Session" || rowDB["data"][i].promStatus == "Approved at Challenge Session under Spec. Cons." || rowDB["data"][i].promStatus == "Approved at Challenge Session with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session") && rowDB["data"][i].staffCat == "Mgr") {
                nCount = nCount + 1;
            }
            else{}
        }
        for(var i = 0; i < rowDB["data"].length; i++) {
            if ((rowDB["data"][i].promStatus == "Approved at Challenge Session under Spec. Cons." || rowDB["data"][i].promStatus == "Approved at Challenge Session with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session" || rowDB["data"][i].promStatus == "Declined at Challenge Session") && rowDB["data"][i].staffCat == "Mgr") {
                mCount = mCount + 1;
            }
            else{}
        }
        
        var dateRaised = formatDatee (new Date());
        if (currentRowCollection["promStatus"] == "Approved by GM"){
            var promStatus = "Approved at Challenge Session";
            var toPromote = "YES";
            var trackStatus = "JA";
            updateDb (currentRowCollection["id"],dateRaised,promStatus,currentRowCollection["mgrComment"],"","",toPromote,"",trackStatus);

            if ((1 + mCount) == nCount) {

                var myTable = "";
                var sNo = 0;
                var to = "";
                for(var i = 0; i < rowDB["data"].length; i++) {
                    if ((rowDB["data"][i].staffCat == "Mgr" && (rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session" || rowDB["data"][i].promStatus == "Approved at Challenge Session with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session under Spec. Cons."))) {
                        sNo = sNo + 1;
                        var newPers = sNo + '. ' + rowDB["data"][i].persName + ' (' + rowDB["data"][i].refIndic + ')\n';
                        myTable = myTable + newPers;
                    }
                }

                /*for(var n = 0; n < current["usersData"].length; n++) {
                    if (current["usersData"][n].accessProfile == "HRO Line") {
                        var cc2 = current["usersData"][n].userEmail;
                    }
                }*/
                for(var p = 0; p < current["usersData"].length; p++) {
                    if (current["usersData"][p].accessProfile == "Manager" && current["usersData"][p].orgUnit == "HRO") {
                        var cc3 = current["usersData"][p].userEmail;
                    }
                }
                for(var q = 0; q < current["usersData"].length; q++) {
                    if (current["usersData"][q].accessProfile == "Manager" && current["usersData"][q].orgUnit == "HRT") {
                        var cc4 = current["usersData"][q].userEmail;
                    }
                }
                for(var m = 0; m < current["usersData"].length; m++) {
                    if (current["usersData"][m].accessProfile == "HRT") {
                        var to = to + current["usersData"][m].userEmail + ', ';
                        //var recipient = current["usersData"][m].userName;
                    }
                }
                var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc3 + ', ' + cc4;
                var subject = "Promotion List Approved";
                var txt = 'Dear HRT Focal' + '\n\nThe approved promotion list for the underlisted managers has been processed by ' + titleCase(current["user"]) + '.\n\n' + myTable + '\n\nVisit the link below to review. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/approvedList.html \n\n' + 'Regards\nTalent Management';
                sendMail (to,subject,txt,cc)
            }
            alert("Staff has been approved for promotion");
            location.reload();
        }
        else if (currentRowCollection["promStatus"] == "Approved by GM with Justification"){
            var promStatus = "Approved at Challenge Session with Justification";
            var toPromote = "YES";
            var trackStatus = "J";
            updateDb (currentRowCollection["id"],dateRaised,promStatus,currentRowCollection["mgrComment"],"","",toPromote,"",trackStatus);

            if ((1 + mCount) == nCount) {

                var myTable = "";
                var sNo = 0;
                var to = "";
                for(var i = 0; i < rowDB["data"].length; i++) {
                    if ((rowDB["data"][i].staffCat == "Mgr" && (rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session" || rowDB["data"][i].promStatus == "Approved at Challenge Session with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session under Spec. Cons."))) {
                        sNo = sNo + 1;
                        var newPers = sNo + '. ' + rowDB["data"][i].persName + ' (' + rowDB["data"][i].refIndic + ')\n';
                        myTable = myTable + newPers;
                    }
                }

                /*for(var n = 0; n < current["usersData"].length; n++) {
                    if (current["usersData"][n].accessProfile == "HRO Line") {
                        var cc2 = current["usersData"][n].userEmail;
                    }
                }*/
                for(var p = 0; p < current["usersData"].length; p++) {
                    if (current["usersData"][p].accessProfile == "Manager" && current["usersData"][p].orgUnit == "HRO") {
                        var cc3 = current["usersData"][p].userEmail;
                    }
                }
                for(var q = 0; q < current["usersData"].length; q++) {
                    if (current["usersData"][q].accessProfile == "Manager" && current["usersData"][q].orgUnit == "HRT") {
                        var cc4 = current["usersData"][q].userEmail;
                    }
                }
                for(var m = 0; m < current["usersData"].length; m++) {
                    if (current["usersData"][m].accessProfile == "HRT") {
                        var to = to + current["usersData"][m].userEmail + ', ';
                        //var recipient = current["usersData"][m].userName;
                    }
                }
                var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc3 + ', ' + cc4;
                var subject = "Promotion List Approved";
                var txt = 'Dear HRT Focal' + '\n\nThe approved promotion list for the underlisted managers has been processed by ' + titleCase(current["user"]) + '.\n\n' + myTable + '\n\nVisit the link below to review. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/approvedList.html \n\n' + 'Regards\nTalent Management';
                sendMail (to,subject,txt,cc)
            }
            alert("Staff has been approved for promotion");
            location.reload();
        }
        else if (currentRowCollection["promStatus"] == "Approved by GM under Spec. Cons."){
            var promStatus = "Approved at Challenge Session under Spec. Cons.";
            var toPromote = "YES";
            var trackStatus = "J";
            updateDb (currentRowCollection["id"],dateRaised,promStatus,currentRowCollection["mgrComment"],"","",toPromote,"",trackStatus);

            if ((1 + mCount) == nCount) {

                var myTable = "";
                var sNo = 0;
                var to = "";
                for(var i = 0; i < rowDB["data"].length; i++) {
                    if ((rowDB["data"][i].staffCat == "Mgr" && (rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session" || rowDB["data"][i].promStatus == "Approved at Challenge Session with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session under Spec. Cons."))) {
                        sNo = sNo + 1;
                        var newPers = sNo + '. ' + rowDB["data"][i].persName + ' (' + rowDB["data"][i].refIndic + ')\n';
                        myTable = myTable + newPers;
                    }
                }

                /*for(var n = 0; n < current["usersData"].length; n++) {
                    if (current["usersData"][n].accessProfile == "HRO Line") {
                        var cc2 = current["usersData"][n].userEmail;
                    }
                }*/
                for(var p = 0; p < current["usersData"].length; p++) {
                    if (current["usersData"][p].accessProfile == "Manager" && current["usersData"][p].orgUnit == "HRO") {
                        var cc3 = current["usersData"][p].userEmail;
                    }
                }
                for(var q = 0; q < current["usersData"].length; q++) {
                    if (current["usersData"][q].accessProfile == "Manager" && current["usersData"][q].orgUnit == "HRT") {
                        var cc4 = current["usersData"][q].userEmail;
                    }
                }
                for(var m = 0; m < current["usersData"].length; m++) {
                    if (current["usersData"][m].accessProfile == "HRT") {
                        var to = to + current["usersData"][m].userEmail + ', ';
                        //var recipient = current["usersData"][m].userName;
                    }
                }
                var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc3 + ', ' + cc4;
                var subject = "Promotion List Approved";
                var txt = 'Dear HRT Focal' + '\n\nThe approved promotion list for the underlisted managers has been processed by ' + titleCase(current["user"]) + '.\n\n' + myTable + '\n\nVisit the link below to review. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/approvedList.html \n\n' + 'Regards\nTalent Management';
                sendMail (to,subject,txt,cc)
            }
            alert("Staff has been approved for promotion");
            location.reload();
        }
    });
    
    //Decline Non-Eligible
    $('#hrt tbody').on('click', 'i.editRow3', function () {
        
        document.getElementById('id04').style.display='block';
        
        currentRowCollection = {};
                
        table7.column(20).visible(true);
        table7.column(22).visible(true);
        table7.column(23).visible(true);
        table7.column(24).visible(true);
        table7.column(25).visible(true);
        
        var $row = $(this).closest("tr");
        var $tds2 = $row.find("td:eq(2)");
        var $tds7 = $row.find("td:eq(7)");
        var $tds21 = $row.find("td:eq(21)");
        var $tds22 = $row.find("td:eq(22)");
        var $tds23 = $row.find("td:eq(23)");
        var $tds25 = $row.find("td:eq(25)"); 
    
        
        $.each($tds2, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["persName"] = txt;
        });
        $.each($tds7, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["refIndic"] = txt;
        });
        $.each($tds21, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["promStatus"] = txt;
        });
        $.each($tds22, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["id"] = txt;
        });
        $.each($tds23, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["mgrComment"] = txt;
        });
        $.each($tds25, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["HRO"] = txt;
        });                
        //console.log(currentRowCollection["id"]);            
        table7.column(20).visible(false);
        table7.column(22).visible(false);
        table7.column(23).visible(false);
        table7.column(24).visible(false);
        table7.column(25).visible(false);    	
    });
    
        
    $("#hrt").on('mousedown', "select", function(e) {
    e.stopPropagation();
    });

///////////// Load page based on Role
      
    if (rowCollection["access"] == "HRT") {
    	$('#homepage').show();
        $('#error').hide();
        $('#PP1').show();
        $('#tab1').show();
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
        var mgrReason = '<b>' + "GM's/ Manager's Justification for Decline: " + '</b>' + d.mgrReason + '<br>' + '<br>';
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

function showAP(meetAP){
    if (meetAP == "YES" || meetAP == "NO") {
        return meetAP;
    }
    else {
        return "NA"
    }
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

function addReason() {
	var dateRaised = formatDatee (new Date());
    var promStatus = "Declined at Challenge Session";
    var gmReason = (document.getElementById("gmReason").value).replace(/[^a-zA-Z1234567890, ]/g, ".");
    var toPromote = "NO";
    var hrtReason = "";
    var trackStatus = "KA";

    var nCount = 0;
    var mCount = 0;
    var to = "";
    for(var i = 0; i < rowDB["data"].length; i++) {
        if ((rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Declined at Challenge Session" || rowDB["data"][i].promStatus == "Approved at Challenge Session under Spec. Cons." || rowDB["data"][i].promStatus == "Approved at Challenge Session with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session") && rowDB["data"][i].staffCat == "Mgr") {
            nCount = nCount + 1;
        }
        else{}
    }
    for(var i = 0; i < rowDB["data"].length; i++) {
        if ((rowDB["data"][i].promStatus == "Approved at Challenge Session under Spec. Cons." || rowDB["data"][i].promStatus == "Approved at Challenge Session with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session" || rowDB["data"][i].promStatus == "Declined at Challenge Session") && rowDB["data"][i].staffCat == "Mgr") {
            mCount = mCount + 1;
        }
        else{}
    }

    if (document.getElementById("gmReason").value == ""){
    	alert("Please enter a reason for decline");
    }
    else if (document.getElementById("gmReason").value.length > 4999){
        alert("Number of characters for reason exceeds limit of 8,000!")
    }
    else {
        /*for(var n = 0; n < current["usersData"].length; n++) {
            if (current["usersData"][n].accessProfile == "HRO Line") {
                var cc2 = current["usersData"][n].userEmail;
            }
        }*/
        for(var p = 0; p < current["usersData"].length; p++) {
            if (current["usersData"][p].accessProfile == "Manager" && current["usersData"][p].orgUnit == "HRO") {
                var cc3 = current["usersData"][p].userEmail;
            }
        }
        for(var q = 0; q < current["usersData"].length; q++) {
            if (current["usersData"][q].accessProfile == "Manager" && current["usersData"][q].orgUnit == "HRT") {
                var cc4 = current["usersData"][q].userEmail;
            }
        }
        for(var m = 0; m < current["usersData"].length; m++) {
            if (current["usersData"][m].accessProfile == "HRT") {
                var to = to + current["usersData"][m].userEmail + ', ';
                //var recipient = current["usersData"][m].userName;
            }
        }
        var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc3 + ', ' + cc4;
        var subject = "Promotion List Updated";
        var txt = 'Dear HRT Focal' + '\n\n' + currentRowCollection["persName"] + ' (' + currentRowCollection["refIndic"] + ') has been removed from the Promotion List by ' + titleCase(current["user"]) + '.\nReason: ' + gmReason + '.\n\nVisit the link below to review. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/criteriaNotMet.html ' + '\n\nRegards\nTalent Management';
        sendMail (to,subject,txt,cc)

        if ((1 + mCount) == nCount) {

            var myTable = "";
            var sNo = 0;
            var to = "";
            for(var i = 0; i < rowDB["data"].length; i++) {
                if (rowDB["data"][i].staffCat == "Mgr" && (rowDB["data"][i].promStatus == "Approved at Challenge Session under Spec. Cons." || rowDB["data"][i].promStatus == "Approved at Challenge Session with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session")) {
                    sNo = sNo + 1;
                    var newPers = sNo + '. ' + rowDB["data"][i].persName + ' (' + rowDB["data"][i].refIndic + ')\n';
                    myTable = myTable + newPers;
                }
            }

            /*for(var n = 0; n < current["usersData"].length; n++) {
                if (current["usersData"][n].accessProfile == "HRO Line") {
                    var cc2 = current["usersData"][n].userEmail;
                }
            }*/
            for(var p = 0; p < current["usersData"].length; p++) {
                if (current["usersData"][p].accessProfile == "Manager" && current["usersData"][p].orgUnit == "HRO") {
                    var cc3 = current["usersData"][p].userEmail;
                }
            }
            for(var q = 0; q < current["usersData"].length; q++) {
                if (current["usersData"][q].accessProfile == "Manager" && current["usersData"][q].orgUnit == "HRT") {
                    var cc4 = current["usersData"][q].userEmail;
                }
            }
            for(var m = 0; m < current["usersData"].length; m++) {
                if (current["usersData"][m].accessProfile == "HRT") {
                    var to = to + current["usersData"][m].userEmail + ', ';
                    //var recipient = current["usersData"][m].userName;
                }
            }
            var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc3 + ', ' + cc4;
            var subject = "Promotion List Approved";
            var txt = 'Dear HRT Focal' + '\n\nThe approved list for the underlisted managers has been processed by ' + titleCase(current["user"]) + '.\n\n' + myTable + '\n\nVisit the link below to review. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/approvedList.html \n\n' + 'Regards\nTalent Management';
            sendMail (to,subject,txt,cc)
        }

        updateDb (currentRowCollection["id"],dateRaised,promStatus,currentRowCollection["mgrComment"],gmReason,hrtReason,toPromote,"",trackStatus);
    	document.getElementById('id04').style.display='none';
    	alert("Staff has been removed from Promotion list");
		location.reload();
	}
}

function gmApprove() {
	var nCount = 0;
    var mCount = 0;
    for(var i = 0; i < rowDB["data"].length; i++) {
        if ((rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Declined at Challenge Session" || rowDB["data"][i].promStatus == "Approved at Challenge Session under Spec. Cons." || rowDB["data"][i].promStatus == "Approved at Challenge Session with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session") && rowDB["data"][i].staffCat == "Mgr") {
            nCount = nCount + 1;
        }
        else{}
    }
    for(var i = 0; i < rowDB["data"].length; i++) {
        if ((rowDB["data"][i].promStatus == "Approved at Challenge Session with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session" || rowDB["data"][i].promStatus == "Declined at Challenge Session") && rowDB["data"][i].staffCat == "Mgr") {
            mCount = mCount + 1;
        }
        else{}
    }
    if (confirm("Confirm Submission!")) {
        var count = 0;
        for(var i = 0; i < rowDB["data"].length; i++) {
            if ((rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification") && rowDB["data"][i].staffCat == "Mgr" && rowDB["data"][i].genCriteria == "YES") {
            count = count + 1;
            }
            else{}
        }
        if (count == 0) {
            alert("No records were sent")
        }
        else {
            //var promStatus = "Approved at Challenge Session";
            var toPromote = "YES";
            //var trackStatus = "JA";
            hrtApproveRow ("YES","Approved by GM","Approved at Challenge Session",toPromote,"JA");
            hrtApproveRow ("YES","Approved by GM with Justification","Approved at Challenge Session with Justification",toPromote,"J");
            hrtApproveRow ("YES","Approved by GM under Spec. Cons.","Approved at Challenge Session under Spec. Cons.",toPromote,"J");

            if ((count + mCount) == nCount) {
                var myTable = "";
                var sNo = 0;
                var to = "";
                for(var i = 0; i < rowDB["data"].length; i++) {
                    if ((rowDB["data"][i].staffCat == "Mgr" &&(rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons.") && rowDB["data"][i].genCriteria == "YES") || (rowDB["data"][i].staffCat == "Mgr" && (rowDB["data"][i].promStatus == "Approved at Challenge Session under Spec. Cons." || rowDB["data"][i].promStatus == "Approved at Challenge Session with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session"))) {
                        sNo = sNo + 1;
                        var newPers = sNo + '. ' + rowDB["data"][i].persName + ' (' + rowDB["data"][i].refIndic + ')\n';
                        myTable = myTable + newPers;
                    }
                }

                /*for(var n = 0; n < current["usersData"].length; n++) {
                    if (current["usersData"][n].accessProfile == "HRO Line") {
                        var cc2 = current["usersData"][n].userEmail;
                    }
                }*/
                for(var p = 0; p < current["usersData"].length; p++) {
                    if (current["usersData"][p].accessProfile == "Manager" && current["usersData"][p].orgUnit == "HRO") {
                        var cc3 = current["usersData"][p].userEmail;
                    }
                }
                for(var q = 0; q < current["usersData"].length; q++) {
                    if (current["usersData"][q].accessProfile == "Manager" && current["usersData"][q].orgUnit == "HRT") {
                        var cc4 = current["usersData"][q].userEmail;
                    }
                }
                for(var m = 0; m < current["usersData"].length; m++) {
                    if (current["usersData"][m].accessProfile == "HRT") {
                        var to = to + current["usersData"][m].userEmail + ', ';
                        //var recipient = current["usersData"][m].userName;
                    }
                }
                var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc3 + ', ' + cc4;
                var subject = "Promotion List Approved";
                var txt = 'Dear Focal' + '\n\nThe approved list for the underlisted managers has been processed by ' + titleCase(current["user"]) + '.\n\n' + myTable +  '\n\nVisit the link below to review. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/approvedList.html \n\n' + 'Regards\nTalent Management';
                sendMail (to,subject,txt,cc)
            }
            alert(count + " Records have been approved for promotion");
            location.reload();
        }
    }
    else {}
}

function gmApprove2() {
	var nCount = 0;
    var mCount = 0;
    for(var i = 0; i < rowDB["data"].length; i++) {
        if ((rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Declined at Challenge Session" || rowDB["data"][i].promStatus == "Approved at Challenge Session under Spec. Cons." || rowDB["data"][i].promStatus == "Approved at Challenge Session with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session") && rowDB["data"][i].staffCat == "Mgr") {
            nCount = nCount + 1;
        }
        else{}
    }
    for(var i = 0; i < rowDB["data"].length; i++) {
        if ((rowDB["data"][i].promStatus == "Approved at Challenge Session under Spec. Cons." || rowDB["data"][i].promStatus == "Approved at Challenge Session with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session" || rowDB["data"][i].promStatus == "Declined at Challenge Session") && rowDB["data"][i].staffCat == "Mgr") {
            mCount = mCount + 1;
        }
        else{}
    }
    if (confirm("Confirm Submission!")) {
        var count = 0;
        for(var i = 0; i < rowDB["data"].length; i++) {
            if ((rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Approved by GM") && rowDB["data"][i].staffCat == "Mgr") {
            count = count + 1;
            }
            else{}
        }
        if (count == 0) {
            alert("No records were sent")
        }
        else {
            //var promStatus = "Approved at Challenge Session";
            var toPromote = "YES";
            //var trackStatus = "JA";
            hrtApproveRow2 ("Approved by GM","Approved at Challenge Session",toPromote,"JA");
            hrtApproveRow2 ("Approved by GM with Justification","Approved at Challenge Session with Justification",toPromote,"J");
            hrtApproveRow2 ("Approved by GM under Spec. Cons.","Approved at Challenge Session under Spec. Cons.",toPromote,"J");

            if ((count + mCount) == nCount) {

                var myTable = "";
                var sNo = 0;
                var to = "";
                for(var i = 0; i < rowDB["data"].length; i++) {
                    if ((rowDB["data"][i].staffCat == "Mgr" && (rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Approved by GM")) || (rowDB["data"][i].staffCat == "Mgr" && (rowDB["data"][i].promStatus == "Approved at Challenge Session with Justification" || rowDB["data"][i].promStatus == "Approved at Challenge Session"))) {
                        sNo = sNo + 1;
                        var newPers = sNo + '. ' + rowDB["data"][i].persName + ' (' + rowDB["data"][i].refIndic + ')\n';
                        myTable = myTable + newPers;
                    }
                }

                /*for(var n = 0; n < current["usersData"].length; n++) {
                    if (current["usersData"][n].accessProfile == "HRO Line") {
                        var cc2 = current["usersData"][n].userEmail;
                    }
                }*/
                for(var p = 0; p < current["usersData"].length; p++) {
                    if (current["usersData"][p].accessProfile == "Manager" && current["usersData"][p].orgUnit == "HRO") {
                        var cc3 = current["usersData"][p].userEmail;
                    }
                }
                for(var q = 0; q < current["usersData"].length; q++) {
                    if (current["usersData"][q].accessProfile == "Manager" && current["usersData"][q].orgUnit == "HRT") {
                        var cc4 = current["usersData"][q].userEmail;
                    }
                }
                for(var m = 0; m < current["usersData"].length; m++) {
                    if (current["usersData"][m].accessProfile == "HRT") {
                        var to = to + current["usersData"][m].userEmail + ', ';
                        //var recipient = current["usersData"][m].userName;
                    }
                }
                var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc3 + ', ' + cc4;
                var subject = "Promotion List Approved";
                var txt = 'Dear HRT Focal' + '\n\nThe approved list for the underlisted managers has been processed by ' + titleCase(current["user"]) + '.\n\n' + myTable + '\n\nVisit the link below to review. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/approvedList.html \n\n' + 'Regards\nTalent Management';
                sendMail (to,subject,txt,cc)
            }
            alert(count + " Records have been approved for promotion");
            location.reload();
        }
    }
    else {}
}