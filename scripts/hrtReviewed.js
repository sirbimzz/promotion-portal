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
    //////////////// Managers Role
       ///////////Reviewed by HRT
    
       $("#mgr").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
      });

	var table8 = $('#mgr').DataTable({
					deferLoading:true,
                    "bPaginate": false,
					dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        			autoWidth: false,
                    "bInfo" : false,
        			buttons: [
        				//{ extend: 'excel', text: 'Export  to Excel' }
        			],
                    "data": data,
                    select:"single",
        "columns": [
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
            { "data": "promStatus", title:"Status", width:"6%"  },
            { "data": "id" },
            { "data": "staffCat" },
            { "mData": null,
                "bSortable": false,
               "mRender": function (o) { return '<i class="editRow" title="Approve"><button id="editRow" style="background:#70AD47; color:white; width:45%;">&#10004;</button></i>&nbsp;<i class="delRow" title="Decline"><button id="editRow" style="background:red; color:white; width:45%;">&#10006;</button></i>'; },
                width:"10%",
                title:"Action"
            },
        ],
        columnDefs: [ 
        	{ "targets": [ 19,21,22 ], "visible": false },
        	{ "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,20,21,22,23 ] }
        ],
        'searchCols': [
        null,
        null,
        null,
        null,
        { 'sSearch': rowCollection["dept"] },
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
        { 'sSearch': 'Reviewed by HRT' },
        null,
        { 'sSearch': 'Staff' },
      	],
        "order": [[3, 'asc'],[4, 'asc'],[18, 'desc']],
    });

    $('#mgr thead th').each(function() {
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
    });
    
    table8.columns().every( function () {
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

    document.getElementById("mgrCount").innerHTML = table8.rows( {search:'applied'} ).count();
    
    //Approve Row
    $('#mgr tbody').on('click', 'i.editRow', function () {
		    	
    	currentRowCollection = {};
    	    
    	table8.column(19).visible(true);  
    	table8.column(21).visible(true);
    	
        var $row = $(this).closest("tr");
        var $tds20 = $row.find("td:eq(20)"); 
        var $tds21 = $row.find("td:eq(21)"); 
 
        
        $.each($tds20, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["promStatus"] = txt;
        });
        $.each($tds21, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["id"] = txt;
        });                
        console.log(currentRowCollection["id"]);            
    	table8.column(19).visible(false);
    	table8.column(21).visible(false);

        var nCount = 0;
        var mCount = 0;
        for(var i = 0; i < data.length; i++) {
            if (rowDB["data"][i].orgUnit == rowCollection["dept"]  && rowDB["data"][i].staffCat == "Staff" && (rowDB["data"][i].promStatus == "Reviewed by HRT" || rowDB["data"][i].promStatus == "Approved by Manager under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by Manager with Justification" || rowDB["data"][i].promStatus == "Approved by Manager" || rowDB["data"][i].promStatus == "Declined by Manager")) {
                nCount = nCount + 1;
            }
            else{}
        }
        for(var i = 0; i < rowDB["data"].length; i++) {
            if (rowDB["data"][i].orgUnit == rowCollection["dept"]  && rowDB["data"][i].staffCat == "Staff" && (rowDB["data"][i].promStatus == "Approved by Manager" || rowDB["data"][i].promStatus == "Approved by Manager under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by Manager with Justification" || rowDB["data"][i].promStatus == "Declined by Manager")) {
                mCount = mCount + 1;
            }
            else{}
        }
    	
    	var dateRaised = formatDatee (new Date());
    	if (currentRowCollection["promStatus"] == "Reviewed by HRT"){
    		var promStatus = "Approved by Manager";
            var trackStatus = "F";
    		var toPromote = "YES";
            updateDb (currentRowCollection["id"],dateRaised,promStatus,"","","",toPromote,"",trackStatus);

            if (1 + mCount == nCount) {

                var myTable = "";
                var sNo = 0;
                var cc3 = "";
                for(var i = 0; i < rowDB["data"].length; i++) {
                    if ((rowDB["data"][i].orgUnit == rowCollection["dept"] && rowDB["data"][i].staffCat == "Staff" && rowDB["data"][i].promStatus == "Reviewed by HRT") || (rowDB["data"][i].orgUnit == rowCollection["dept"] && rowDB["data"][i].staffCat == "Staff" && (rowDB["data"][i].promStatus == "Approved by Manager" || rowDB["data"][i].promStatus == "Approved by Manager under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by Manager with Justification"))) {
                        sNo = sNo + 1;
                        var newPers = sNo + '. ' + rowDB["data"][i].persName + ' (' + rowDB["data"][i].refIndic + ')\n';
                        myTable = myTable + newPers;
                    }
                }

                for(var n = 0; n < current["usersData"].length; n++) {
                    if (current["usersData"][n].accessProfile == "HRO Line" && current["usersData"][n].sortHRO == rowCollection["HRO"].slice(0, -1)) {
                        var cc2 = current["usersData"][n].userEmail;
                    }
                }
                for(var m = 0; m < current["usersData"].length; m++) {
                    if (current["usersData"][m].accessProfile == "HRT") {
                        var cc3 = cc3 + current["usersData"][m].userEmail + ', ';
                    }
                }
                for(var p = 0; p < current["usersData"].length; p++) {
                    if (current["usersData"][p].sortHRO == rowCollection["HRO"] && current["usersData"][p].accessProfile == "HRO") {
                        var to = current["usersData"][p].userEmail;
                        var recipient = current["usersData"][p].userName;
                        var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc2 + ', ' + cc3;
                        var subject = "Promotion List Approved";
                        var txt = 'Dear ' + titleCase(recipient) + '\n\nThe promotion eligibility list for ' + rowCollection["dept"] + ' department with the underlisted staff has been approved by ' + titleCase(current["user"]) + '.\n\n' + myTable + '.\n\nVisit the link below to progress. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/mgrApproved.html \n\n' + 'Regards\nTalent Management';
                        sendMail (to,subject,txt,cc)
                    }
                }
            }
    		alert("Staff has been approved for promotion");
			location.reload();
    	}
    	else {}

   });

   //Decline Row
    $('#mgr tbody').on('click', 'i.delRow', function () {
    	
    	document.getElementById('id07').style.display='block';
    	
    	currentRowCollection = {};
    	     
    	table8.column(19).visible(true);
        table8.column(21).visible(true);
    	
        var $row = $(this).closest("tr");
        var $tds1 = $row.find("td:eq(1)"); 
        var $tds20 = $row.find("td:eq(20)");
        var $tds21 = $row.find("td:eq(21)"); 
        
        $.each($tds1, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["persName"] = txt;
        });
        $.each($tds20, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["promStatus"] = txt;
        });
        $.each($tds21, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["id"] = txt;
        });

        //console.log(currentRowCollection["id"]);            
    	table8.column(19).visible(false);
        table8.column(21).visible(false);   	
   });
      
    $("#mgr").on('mousedown', "select", function(e) {
        e.stopPropagation();
    });

    //////////////// GMs Role
       ///////////Reviewed by HRT
    
       $("#gm").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
      });

	var table9 = $('#gm').DataTable({
        deferLoading:true,
        "bPaginate": false,
        dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        autoWidth: false,
        "bInfo" : false,
        buttons: [
            //{ extend: 'excel', text: 'Export  to Excel' }
        ],
        "data": data,
        select:"single",
        "columns": [
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
            { "data": "promStatus", title:"Status", width:"7%"  },
            { "data": "id" },
            { "data": "staffCat" },
            { "data": "sortHRO" },
            { "mData": null,
                "bSortable": false,
               "mRender": function (o) { return '<i class="editRow" title="Approve"><button id="editRow" style="background:#70AD47; color:white; width:45%;">&#10004;</button></i>&nbsp;<i class="delRow" title="Decline"><button id="editRow" style="background:red; color:white; width:45%;">&#10006;</button></i>'; },
                width:"10%",
                title:"Action"
            },
        ],
        columnDefs: [ 
        	{ "targets": [ 19,21,22,23 ], "visible": false },
        	{ "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,20,21,22,23 ] }
        ],
        'searchCols': [
        null,
        null,
        null,
        { 'sSearch': rowCollection["div"] },
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
        { 'sSearch': 'Reviewed by HRT' },
        null,
        { 'sSearch': 'Mgr' },
      	],
        "order": [[3, 'asc'],[4, 'asc'],[18, 'desc']],
    });

    $('#gm thead th').each(function() {
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
    });
    
    table9.columns().every( function () {
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

    document.getElementById("gmCount").innerHTML = table9.rows( {search:'applied'} ).count();
    
    //Approve Row
    $('#gm tbody').on('click', 'i.editRow', function () {
		    	
    	currentRowCollection = {};
    	    
    	table9.column(19).visible(true);  
    	table9.column(21).visible(true);
        table9.column(22).visible(true);
        table9.column(23).visible(true);
    	
        var $row = $(this).closest("tr");
        var $tds20 = $row.find("td:eq(20)"); 
        var $tds21 = $row.find("td:eq(21)");
        var $tds23 = $row.find("td:eq(23)"); 
 
        
        $.each($tds20, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["promStatus"] = txt;
        });
        $.each($tds21, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["id"] = txt;
        }); 
        $.each($tds23, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["sortHRO"] = txt;
        });                
        console.log(currentRowCollection["id"]);            
    	table9.column(19).visible(false);
    	table9.column(21).visible(false);
        table9.column(22).visible(false);
        table9.column(23).visible(false);

        var nCount = 0;
        var mCount = 0;
        for(var i = 0; i < data.length; i++) {
            if (rowDB["data"][i].persSubarea == rowCollection["div"] && rowDB["data"][i].staffCat == "Mgr" && (rowDB["data"][i].promStatus == "Reviewed by HRT" || rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Declined by GM")) {
                nCount = nCount + 1;
            }
            else{}
        }
        for(var i = 0; i < rowDB["data"].length; i++) {
            if (rowDB["data"][i].persSubarea == rowCollection["div"] && rowDB["data"][i].staffCat == "Mgr" && (rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Declined by GM")) {
                mCount = mCount + 1;
            }
            else{}
        }
    	
    	var dateRaised = formatDatee (new Date());
    	if (currentRowCollection["promStatus"] == "Reviewed by HRT"){
    		var promStatus = "Approved by GM";
            var trackStatus = "FA";
    		var toPromote = "YES";
            updateDb (currentRowCollection["id"],dateRaised,promStatus,"","","",toPromote,"",trackStatus);

            if (1 + mCount == nCount) {

                var myTable = "";
                var sNo = 0;
                var to = "";
                for(var i = 0; i < rowDB["data"].length; i++) {
                    if ((rowDB["data"][i].persSubarea == rowCollection["div"] && rowDB["data"][i].staffCat == "Mgr" && rowDB["data"][i].promStatus == "Reviewed by HRT") || (rowDB["data"][i].persSubarea == rowCollection["div"] && (rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification"))) {
                        sNo = sNo + 1;
                        var newPers = sNo + '. ' + rowDB["data"][i].persName + ' (' + rowDB["data"][i].refIndic + ')\n';
                        myTable = myTable + newPers;
                    }
                }

                for(var n = 0; n < current["usersData"].length; n++) {
                    if (current["usersData"][n].accessProfile == "HRO Line" && current["usersData"][n].sortHRO == currentRowCollection["sortHRO"].slice(0, -1)) {
                        var cc2 = current["usersData"][n].userEmail;
                    }
                }
                for(var p = 0; p < current["usersData"].length; p++) {
                    if (current["usersData"][p].accessProfile == "HRT") {
                        var to = to + current["usersData"][p].userEmail + ', ';
                        //var recipient = current["usersData"][p].userName;
                    }
                }
                var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc2;
                var subject = "Promotion List Approved";
                var txt = 'Dear HRT Focal' + '\n\nThe promotion eligibility list for ' + rowCollection["div"] + ' division with the underlisted managers has been approved by ' + titleCase(current["user"]) + '.\n\n' + myTable + '\n\nVisit the link below to progress. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/gmApproved.html \n\n' + 'Regards\nTalent Management';
                sendMail (to,subject,txt,cc)
            }
    		alert("Staff has been approved for promotion");
			location.reload();
    	}
    	else {}

   });

   //Decline Row
    $('#gm tbody').on('click', 'i.delRow', function () {
    	
    	document.getElementById('id08').style.display='block';
    	
    	currentRowCollection = {};
    	     
    	table9.column(19).visible(true);
        table9.column(21).visible(true);
        table9.column(22).visible(true);
        table9.column(23).visible(true);
    	
        var $row = $(this).closest("tr");
        var $tds1 = $row.find("td:eq(1)"); 
        var $tds20 = $row.find("td:eq(20)");
        var $tds21 = $row.find("td:eq(21)");
        var $tds23 = $row.find("td:eq(23)"); 
        
        $.each($tds1, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["persName"] = txt;
        });
        $.each($tds20, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["promStatus"] = txt;
        });
        $.each($tds21, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["id"] = txt;
        });
        $.each($tds23, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["sortHRO"] = txt;
        });

        //console.log(currentRowCollection["id"]);            
    	table9.column(19).visible(false);
        table9.column(21).visible(false); 
        table9.column(22).visible(false);
        table9.column(23).visible(false);  	
   });
      
      $("#gm").on('mousedown', "select", function(e) {
        e.stopPropagation();
      });

///////////// Load page based on Role
      
    if (rowCollection["access"] == "Manager") {
    	$('#homepage').show();
        $('#error').hide();
        $('#PP1').show();
        $('#tab1').show();
        $('#PP2').hide();
        $('#tab2').hide();
    }
    else if (rowCollection["access"] == "GM") {
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
	var mgrReason = '<b>' + "GM's/ Manager's Justification for Decline: " + '</b>' + d.mgrReason + '<br>' + '<br>';
}
if (d.sbCriteria == "") {
	var sbCriteria = ""
}
else {
	var sbCriteria = '<b>' + "Special Consideration: " + '</b>' + d.sbCriteria + '<br>' + '<br>';
}
// `d` is the original data object for the row
return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px; width:84%; margin-left:8.9%;">' +
        //'<th>' + '' + '</th>' + '<th>' + '' + '</th>' + 
        '<tr>' +
            '<td style="width:80%;">' + sbCriteria + mgrComment + mgrReason + hrtReason + gmReason + '</td>' +
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

function addReason3() {
	var dateRaised = formatDatee (new Date());
    var promStatus = "Declined by Manager";
    var mgrReason = (document.getElementById("mgrReason").value).replace(/[^a-zA-Z1234567890, ]/g, ".");
    var toPromote = "NO";
    var gmReason = "";
    var trackStatus = "L";

    var nCount = 0;
    var mCount = 0;
    var cc3 = "";
    for(var i = 0; i < rowDB["data"].length; i++) {
        if (rowDB["data"][i].orgUnit == rowCollection["dept"] && rowDB["data"][i].staffCat == "Staff" && (rowDB["data"][i].promStatus == "Reviewed by HRT" || rowDB["data"][i].promStatus == "Approved by Manager" || rowDB["data"][i].promStatus == "Approved by Manager under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by Manager with Justification" || rowDB["data"][i].promStatus == "Declined by Manager")) {
            nCount = nCount + 1;
        }
        else{}
    }
    for(var i = 0; i < rowDB["data"].length; i++) {
        if (rowDB["data"][i].orgUnit == rowCollection["dept"] && rowDB["data"][i].staffCat == "Staff" && (rowDB["data"][i].promStatus == "Approved by Manager" || rowDB["data"][i].promStatus == "Approved by Manager under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by Manager with Justification" || rowDB["data"][i].promStatus == "Declined by Manager")) {
            mCount = mCount + 1;
        }
        else{}
    }

    if (document.getElementById("mgrReason").value == ""){
    	alert("Please enter a reason for decline");
    }
    else if (document.getElementById("mgrReason").value.length > 4999){
        alert("Number of characters for reason exceeds limit of 8,000!")
    }
    else {
        for(var n = 0; n < current["usersData"].length; n++) {
            if (current["usersData"][n].accessProfile == "HRO Line" && current["usersData"][n].sortHRO == rowCollection["HRO"].slice(0, -1)) {
                var cc2 = current["usersData"][n].userEmail;
            }
        }
        for(var m = 0; m < current["usersData"].length; m++) {
            if (current["usersData"][m].accessProfile == "HRT") {
                var cc3 = cc3 + current["usersData"][m].userEmail + ', ';
            }
        }
        for(var p = 0; p < current["usersData"].length; p++) {
            if (current["usersData"][p].sortHRO == rowCollection["HRO"] && current["usersData"][p].accessProfile == "HRO") {
                var to = current["usersData"][p].userEmail;
                var recipient = current["usersData"][p].userName;
                var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc2 + ', ' + cc3;
                var subject = "Promotion List Updated";
                var txt = 'Dear ' + titleCase(recipient) + '\n\n' + currentRowCollection["persName"] + ' has been removed from the Promotion List by ' + titleCase(current["user"]) + '.\nReason: ' + mgrReason + '.\n\nVisit the link below to review. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/index.html ' + '\n\nRegards\nTalent Management';
                sendMail (to,subject,txt,cc)
            }
        }

        if (1 + mCount == nCount) {

            var myTable = "";
            var sNo = 0;
            var cc3 = "";
            for(var i = 0; i < rowDB["data"].length; i++) {
                if (rowDB["data"][i].orgUnit == rowCollection["dept"] && rowDB["data"][i].staffCat == "Staff" && (rowDB["data"][i].promStatus == "Approved by Manager" || rowDB["data"][i].promStatus == "Approved by Manager under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by Manager with Justification")) {
                    sNo = sNo + 1;
                    var newPers = sNo + '. ' + rowDB["data"][i].persName + ' (' + rowDB["data"][i].refIndic + ')\n';
                    myTable = myTable + newPers;
                }
            }

            for(var n = 0; n < current["usersData"].length; n++) {
                if (current["usersData"][n].accessProfile == "HRO Line" && current["usersData"][n].sortHRO == rowCollection["HRO"].slice(0, -1)) {
                    var cc2 = current["usersData"][n].userEmail;
                }
            }
            for(var m = 0; m < current["usersData"].length; m++) {
                if (current["usersData"][m].accessProfile == "HRT") {
                    var cc3 = cc3 + current["usersData"][m].userEmail + ', ';
                }
            }
            for(var p = 0; p < current["usersData"].length; p++) {
                if (current["usersData"][p].sortHRO == rowCollection["HRO"] && current["usersData"][p].accessProfile == "HRO") {
                    var to = current["usersData"][p].userEmail;
                    var recipient = current["usersData"][p].userName;
                    var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc2 + ', ' + cc3;
                    var subject = "Promotion List Approved";
                    var txt = 'Dear ' + titleCase(recipient) + '\n\nThe promotion eligibility list for ' + rowCollection["dept"] + ' department with the underlisted staff has been approved by ' + titleCase(current["user"]) + '.\n\n' + myTable + '\n\nVisit the link below to progress. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/mgrApproved.html \n\n' + 'Regards\nTalent Management';
                    sendMail (to,subject,txt,cc)
                }
            }
        }

        updateDb (currentRowCollection["id"],dateRaised,promStatus,currentRowCollection["mgrComment"],gmReason,"",toPromote,mgrReason,trackStatus);
    	document.getElementById('id07').style.display='none';
    	alert("Staff has been removed from Promotion list");
		location.reload();
	}
}

function mgrApprove() {
    var nCount = 0;
    var mCount = 0;
    for(var i = 0; i < rowDB["data"].length; i++) {
        if (rowDB["data"][i].orgUnit == rowCollection["dept"] && rowDB["data"][i].staffCat == "Staff" && (rowDB["data"][i].promStatus == "Reviewed by HRT" || rowDB["data"][i].promStatus == "Approved by Manager" || rowDB["data"][i].promStatus == "Approved by Manager under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by Manager with Justification" || rowDB["data"][i].promStatus == "Declined by Manager")) {
            nCount = nCount + 1;
        }
        else{}
    }
    for(var i = 0; i < rowDB["data"].length; i++) {
        if (rowDB["data"][i].orgUnit == rowCollection["dept"] && rowDB["data"][i].staffCat == "Staff" && (rowDB["data"][i].promStatus == "Approved by Manager" || rowDB["data"][i].promStatus == "Approved by Manager under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by Manager with Justification" || rowDB["data"][i].promStatus == "Declined by Manager")) {
            mCount = mCount + 1;
        }
        else{}
    }

    if (confirm("Confirm Submission!")) {
        var count = 0;
        for(var i = 0; i < rowDB["data"].length; i++) {
            if (rowDB["data"][i].promStatus == "Reviewed by HRT" && rowDB["data"][i].staffCat == "Staff" && rowDB["data"][i].orgUnit == rowCollection["dept"] && rowDB["data"][i].genCriteria == "YES") {
            count = count + 1;
            }
            else{}
        }
        if (count == 0) {
            alert("No records were sent")
        }
        else {
            var orgUnit = rowCollection["dept"];
            var staffCat = "Staff";
            var genCriteria = "YES";
            var promStatus1 = "Reviewed by HRT";
            var promStatus = "Approved by Manager";
            var trackStatus = "F";
            var toPromote = "YES";
            mgrApproveRow (orgUnit,staffCat,genCriteria,promStatus1,promStatus,toPromote,trackStatus); 

            if (count + mCount == nCount) {
                var myTable = "";
                var sNo = 0;
                var cc3 = "";
                for(var i = 0; i < rowDB["data"].length; i++) {
                    if ((rowDB["data"][i].orgUnit == rowCollection["dept"] && rowDB["data"][i].staffCat == "Staff" && rowDB["data"][i].promStatus == "Reviewed by HRT" && rowDB["data"][i].genCriteria == "YES") || (rowDB["data"][i].orgUnit == rowCollection["dept"] && (rowDB["data"][i].promStatus == "Approved by Manager" || rowDB["data"][i].promStatus == "Approved by Manager under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by Manager with Justification"))) {
                        sNo = sNo + 1;
                        var newPers = sNo + '. ' + rowDB["data"][i].persName + ' (' + rowDB["data"][i].refIndic + ')\n';
                        myTable = myTable + newPers;
                    }
                }

                for(var n = 0; n < current["usersData"].length; n++) {
                    if (current["usersData"][n].accessProfile == "HRO Line" && current["usersData"][n].sortHRO == rowCollection["HRO"].slice(0, -1)) {
                        var cc2 = current["usersData"][n].userEmail;
                    }
                }
                for(var m = 0; m < current["usersData"].length; m++) {
                    if (current["usersData"][m].accessProfile == "HRT") {
                        var cc3 = cc3 + current["usersData"][m].userEmail + ', ';
                    }
                }
                for(var p = 0; p < current["usersData"].length; p++) {
                    if (current["usersData"][p].sortHRO == rowCollection["HRO"] && current["usersData"][p].accessProfile == "HRO") {
                        var to = current["usersData"][p].userEmail;
                        var recipient = current["usersData"][p].userName;
                        var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc2 + ', ' + cc3;
                        var subject = "Promotion List Approved";
                        var txt = 'Dear ' + titleCase(recipient) + '\n\nThe promotion eligibility list for ' + rowCollection["dept"] + ' department with the underlisted staff has been approved by ' + titleCase(current["user"]) + '.\n\n' + myTable + '\n\nVisit the link below to progress. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/mgrApproved.html \n\n' + 'Regards\nTalent Management';
                        sendMail (to,subject,txt,cc)
                    }
                }
            }
            alert(count + " Records have been approved for promotion");
            location.reload();
        }
    }
    else {}
}


function addReason4() {
	var dateRaised = formatDatee (new Date());
    var promStatus = "Declined by GM";
    var mgrReason = (document.getElementById("gmReason").value).replace(/[^a-zA-Z1234567890, ]/g, ".");
    var toPromote = "NO";
    var gmReason = "";
    var trackStatus = "LA";

    var nCount = 0;
    var mCount = 0;
    var to = "";
    for(var i = 0; i < rowDB["data"].length; i++) {
        if (rowDB["data"][i].persSubarea == rowCollection["div"] && rowDB["data"][i].staffCat == "Mgr" && (rowDB["data"][i].promStatus == "Reviewed by HRT" || rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Declined by GM")) {
            nCount = nCount + 1;
        }
        else{}
    }
    for(var i = 0; i < rowDB["data"].length; i++) {
        if (rowDB["data"][i].persSubarea == rowCollection["div"] && rowDB["data"][i].staffCat == "Mgr" && (rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Declined by GM")) {
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
        for(var n = 0; n < current["usersData"].length; n++) {
            if (current["usersData"][n].accessProfile == "HRO Line" && current["usersData"][n].sortHRO == currentRowCollection["sortHRO"].slice(0, -1)) {
                var cc2 = current["usersData"][n].userEmail;
            }
        }
        for(var p = 0; p < current["usersData"].length; p++) {
            if (current["usersData"][p].accessProfile == "HRT") {
                var to = to + current["usersData"][p].userEmail + ', ';
                //var recipient = current["usersData"][p].userName;
            }
        }
        var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc2;
        var subject = "Promotion List Updated";
        var txt = 'Dear HRT Focal' + '\n\n' + currentRowCollection["persName"] + ' has been removed from the Promotion List by ' + titleCase(current["user"]) + '.\nReason: ' + mgrReason + '.\n\nVisit the link below to review. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/index.html ' + '\n\nRegards\nTalent Management';
        sendMail (to,subject,txt,cc)

        if (1 + mCount == nCount) {

            var myTable = "";
            var sNo = 0;
            var to = "";
            for(var i = 0; i < rowDB["data"].length; i++) {
                if (rowDB["data"][i].persSubarea == rowCollection["div"] && (rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification")) {
                    sNo = sNo + 1;
                    var newPers = sNo + '. ' + rowDB["data"][i].persName + ' (' + rowDB["data"][i].refIndic + ')\n';
                    myTable = myTable + newPers;
                }
            }

            for(var n = 0; n < current["usersData"].length; n++) {
                if (current["usersData"][n].accessProfile == "HRO Line" && current["usersData"][n].sortHRO == currentRowCollection["sortHRO"].slice(0, -1)) {
                    var cc2 = current["usersData"][n].userEmail;
                }
            }
            for(var p = 0; p < current["usersData"].length; p++) {
                if (current["usersData"][p].accessProfile == "HRT") {
                    var to = to + current["usersData"][p].userEmail + ', ';
                    //var recipient = current["usersData"][p].userName;
                }
                var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc2;
                var subject = "Promotion List Approved";
                var txt = 'Dear HRT Focal'+ '\n\nThe promotion eligibility list for ' + rowCollection["div"] + ' division with the underlisted managers has been approved by ' + titleCase(current["user"]) + '.\n\n' + myTable + '\n\nVisit the link below to progress. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/gmApproved.html \n\n' + '\nRegards\nTalent Management';
                sendMail (to,subject,txt,cc)
            }
        }

        updateDb (currentRowCollection["id"],dateRaised,promStatus,currentRowCollection["mgrComment"],gmReason,"",toPromote,mgrReason,trackStatus);
    	document.getElementById('id08').style.display='none';
    	alert("Staff has been removed from Promotion list");
		location.reload();
	}
}

function gmApprove() {
    var nCount = 0;
    var mCount = 0;
    for(var i = 0; i < rowDB["data"].length; i++) {
        if (rowDB["data"][i].persSubarea == rowCollection["div"] && rowDB["data"][i].staffCat == "Mgr" && (rowDB["data"][i].promStatus == "Reviewed by HRT" || rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Declined by GM")) {
            nCount = nCount + 1;
        }
        else{}
    }
    for(var i = 0; i < rowDB["data"].length; i++) {
        if (rowDB["data"][i].persSubarea == rowCollection["div"] && (rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Declined by GM")) {
            mCount = mCount + 1;
        }
        else{}
    }

    if (confirm("Confirm Submission!")) {
        var count = 0;
        for(var i = 0; i < rowDB["data"].length; i++) {
            if (rowDB["data"][i].promStatus == "Reviewed by HRT" && rowDB["data"][i].staffCat == "Mgr" && rowDB["data"][i].persSubarea == rowCollection["div"] && rowDB["data"][i].genCriteria == "YES") {
            count = count + 1;
            }
            else{}
        }
        if (count == 0) {
            alert("No records were sent")
        }
        else {
            var persSubarea = rowCollection["div"];
            var staffCat = "Mgr";
            var genCriteria = "YES";
            var promStatus1 = "Reviewed by HRT";
            var promStatus = "Approved by GM";
            var trackStatus = "FA";
            var toPromote = "YES";
            gmApproveRow (persSubarea,staffCat,genCriteria,promStatus1,promStatus,toPromote,trackStatus); 

            if (count + mCount == nCount) {
                var myTable = "";
                var sNo = 0;
                var to = "";
                for(var i = 0; i < rowDB["data"].length; i++) {
                    if ((rowDB["data"][i].persSubarea == rowCollection["div"] && rowDB["data"][i].staffCat == "Mgr" && rowDB["data"][i].promStatus == "Reviewed by HRT" && rowDB["data"][i].genCriteria == "YES") || (rowDB["data"][i].persSubarea == rowCollection["div"] && (rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons." || rowDB["data"][i].promStatus == "Approved by GM with Justification"))) {
                        sNo = sNo + 1;
                        var newPers = sNo + '. ' + rowDB["data"][i].persName + ' (' + rowDB["data"][i].refIndic + ')\n';
                        myTable = myTable + newPers;
                    }
                }

                for(var n = 0; n < current["usersData"].length; n++) {
                    if (current["usersData"][n].accessProfile == "HRO Line") {
                        var cc2 = cc2 + current["usersData"][n].userEmail + ', ';
                    }
                }
                for(var p = 0; p < current["usersData"].length; p++) {
                    if (current["usersData"][p].accessProfile == "HRT") {
                        var to = to + current["usersData"][p].userEmail + ', ';
                        //var recipient = current["usersData"][p].userName;
                    }
                }
                var cc = 'Cc: ' + current["user"] + '@nlng.com, ' + cc2;
                var subject = "Promotion List Approved";
                var txt = 'Dear HRT Focal' + '\n\nThe promotion eligibility list for ' + rowCollection["div"] + ' division with the underlisted managers has been approved by ' + titleCase(current["user"]) + '.\n\n' + myTable + '\n\nVisit the link below to progress. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/gmApproved.html \n\n' + 'Regards\nTalent Management';
                sendMail (to,subject,txt,cc)
            }
            alert(count + " Records have been approved for promotion");
            location.reload();
        }
    }
    else {}
}