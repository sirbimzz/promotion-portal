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
   //////////// HRT Special Consideration
    
   $("#hrt").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
    });

    var table1 = $('#hrt').DataTable({
        //"fixedHeader": { header: true,},
        deferLoading:true,
        "bPaginate": false,
        dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        autoWidth: false,
        "bInfo" : false,
        buttons: [
            //{ extend: 'excel', text: 'Export  to Excel' }
            //'copy', 'csv', 'excel', 'pdf', 'print'
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
            { "data": "promStatus", title:"Status", width:"10%" },
            { "data": "toPromote" },
        ],
        columnDefs: [ 
            //{ type: 'date', 'targets': [17] },
            { "targets": [ 21 ], "visible": false },
            { "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,18,19,20 ] }
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
        { 'sSearch': 'YES' },
        { 'sSearch': "Criteria Not Met" },
        null,
        ],
        "order": [[20, 'asc'],[18, 'desc'],[3, 'asc'],[4, 'asc']],
    });

    $('#hrt thead th').each(function() {
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

    table1.columns().every( function () {
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

    document.getElementById("hrtCount").innerHTML = table1.rows( {search:'applied'} ).count();

    //////////// Manager Special Consideration
    
   $("#mgr").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
    });

    var table = $('#mgr').DataTable({
        //"fixedHeader": { header: true,},
        deferLoading:true,
        "bPaginate": false,
        dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        autoWidth: false,
        "bInfo" : false,
        buttons: [
            //{ extend: 'excel', text: 'Export  to Excel' }
            //'copy', 'csv', 'excel', 'pdf', 'print'
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
            { "data": "promStatus", title:"Status", width:"10%" },
            { "data": "toPromote" },
            { "data": "id" },
            { "data": "staffCat" },
            { "mData": null,
                "bSortable": false,
               "mRender": function (o) { return '<i class="editRow" title="Approve"><button id="editRow" style="background:#70AD47; color:white; width:85%;">&#10004;</button></i>'; },
                width:"10px",
                title:"Action"
            },
        ],
        columnDefs: [ 
            //{ type: 'date', 'targets': [17] },
            { "targets": [ 18,21,22,23 ], "visible": false },
            { "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,18,19,20 ] }
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
        { 'sSearch': 'YES' },
        { 'sSearch': "Criteria Not Met" },
        null,
        null,
        { 'sSearch': 'Staff' },
        ],
        "order": [[20, 'asc'],[18, 'desc'],[3, 'asc'],[4, 'asc']],
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
        if(title == 'Status'){
            $(this).append('<br /><select style="width: 55px;color:black; font-size:8pt;"><option value="" selected>Filter</option><option value="Criteria Met">Criteria Met</option><option value="Reviewed by HRT">Reviewed by HRT</option><option value="Approved by Manager">Approved by Manager</option><option value="Approved at Challenge Session">Approved at Challenge Session</option></select>');			  
        }
    });

    table.columns().every( function () {
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

    document.getElementById("mgrCount").innerHTML = table.rows( {search:'applied'} ).count();

    //Approve Special Consider
    $('#mgr tbody').on('click', 'i.editRow', function () {
    	
    	currentRowCollection = {};
    	    
    	table.column(17).visible(true);
        table.column(21).visible(true);  
    	table.column(22).visible(true);
    	
        var $row = $(this).closest("tr");
        var $tds1 = $row.find("td:eq(1)"); 
        var $tds6 = $row.find("td:eq(6)");
        var $tds19 = $row.find("td:eq(19)"); 
        var $tds21 = $row.find("td:eq(21)"); 
 
        $.each($tds1, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["persName"] = txt;
        });
        $.each($tds6, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["refIndic"] = txt;
        });
        $.each($tds19, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["promStatus"] = txt;
        });
        $.each($tds21, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["id"] = txt;
        });                
        //console.log(currentRowCollection["id"]);            
    	table.column(17).visible(false);
        table.column(21).visible(false);
        table.column(22).visible(false);

        if (confirm("Confirm approval of selected staff under special consideration")) {
        var dateRaised = formatDatee (new Date());
        var promStatus = "Approved by Manager under Spec. Cons.";
        var trackStatus = "F";
        var mgrComment = "";
        var toPromote = "YES";
        var gmReason = "";
        var hrtReason = "";
        var myTable = "";
        var sNo = 0;
        var cc3 = "";
        for(var i = 0; i < rowDB["data"].length; i++) {
            if (rowDB["data"][i].orgUnit == rowCollection["dept"] && (rowDB["data"][i].promStatus == "Approved by Manager" || rowDB["data"][i].promStatus == "Approved by Manager with Justification" || rowDB["data"][i].promStatus == "Approved by Manager under Spec. Cons.")) {
                sNo = sNo + 1;
                var newPers = sNo + '. ' + rowDB["data"][i].persName + ' (' + rowDB["data"][i].refIndic + ')\n';
                myTable = myTable + newPers;
            }
        }
        var newPers2 = sNo+1 + '. ' + currentRowCollection["persName"] + ' (' + currentRowCollection["refIndic"] + ')\n';
        myTable = myTable + newPers2;

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
                var txt = 'Dear ' + titleCase(recipient) + '\n\n' + titleCase(current["user"]) + ' has approved ' + currentRowCollection["persName"] + ' (' + currentRowCollection["refIndic"] + ') to ' + rowCollection["dept"] + ' department under special consideration'  + '.\n\nBelow is the updated approved list:\n\n' + myTable + '\n\nVisit the link below to review. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/mgrApproved.html ' + '\n\nRegards\nTalent Management';
                sendMail (to,subject,txt,cc)
            }
        }
        updateDb (currentRowCollection["id"],dateRaised,promStatus,mgrComment,gmReason,hrtReason,toPromote,"",trackStatus);
        alert("Staff has been approved for promotion");
        location.reload();
        }
        else{}
    });

    $("#mgr").on('mousedown', "select", function(e) {
    e.stopPropagation();
    });

     //////////// GM Special Consideration
    
   $("#gm").on('mousedown', "#selectbasic", function(e) {
    e.stopPropagation();
    });

    var table4 = $('#gm').DataTable({
        //"fixedHeader": { header: true,},
        deferLoading:true,
        "bPaginate": false,
        dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        autoWidth: false,
        "bInfo" : false,
        buttons: [
            //{ extend: 'excel', text: 'Export  to Excel' }
            //'copy', 'csv', 'excel', 'pdf', 'print'
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
            { "data": "promStatus", title:"Status", width:"10%" },
            { "data": "toPromote" },
            { "data": "id" },
            { "data": "staffCat" },
            { "mData": null,
                "bSortable": false,
            "mRender": function (o) { return '<i class="editRow" title="Approve"><button id="editRow" style="background:#70AD47; color:white; width:85%;">&#10004;</button></i>'; },
                width:"10px",
                title:"Action"
            },
        ],
        columnDefs: [ 
            //{ type: 'date', 'targets': [17] },
            { "targets": [ 18,21,22,23 ], "visible": false },
            { "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,18,19,20 ] }
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
        { 'sSearch': 'YES' },
        { 'sSearch': "Criteria Not Met" },
        null,
        null,
        { 'sSearch': 'Mgr' },
        ],
        "order": [[20, 'asc'],[18, 'desc'],[3, 'asc'],[4, 'asc']],
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
        if(title == 'Status'){
            $(this).append('<br /><select style="width: 55px;color:black; font-size:8pt;"><option value="" selected>Filter</option><option value="Criteria Met">Criteria Met</option><option value="Reviewed by HRT">Reviewed by HRT</option><option value="Approved by Manager">Approved by Manager</option><option value="Approved at Challenge Session">Approved at Challenge Session</option></select>');			  
        }
    });

    table4.columns().every( function () {
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

    document.getElementById("gmCount").innerHTML = table4.rows( {search:'applied'} ).count();

    //Approve Special Consider
    $('#gm tbody').on('click', 'i.editRow', function () {
        
        currentRowCollection = {};
            
        table4.column(17).visible(true);
        table4.column(21).visible(true);  
        table4.column(22).visible(true);
        
        var $row = $(this).closest("tr");
        var $tds1 = $row.find("td:eq(1)"); 
        var $tds6 = $row.find("td:eq(6)");
        var $tds19 = $row.find("td:eq(19)"); 
        var $tds21 = $row.find("td:eq(21)"); 

        $.each($tds1, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["persName"] = txt;
        });
        $.each($tds6, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["refIndic"] = txt;
        });
        $.each($tds19, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["promStatus"] = txt;
        });
        $.each($tds21, function(i, el) {
            var txt = $(this).text();
            currentRowCollection["id"] = txt;
        });                
        //console.log(currentRowCollection["id"]);            
        table4.column(17).visible(false);
        table4.column(21).visible(false);
        table4.column(22).visible(false);

        if (confirm("Confirm approval of selected staff under special consideration")) {
        var dateRaised = formatDatee (new Date());
        var promStatus = "Approved by GM under Spec. Cons.";
        var trackStatus = "FA";
        var mgrComment = "";
        var toPromote = "YES";
        var gmReason = "";
        var hrtReason = "";
        var myTable = "";
        var sNo = 0;
        var to = "";
        for(var i = 0; i < rowDB["data"].length; i++) {
            if (rowDB["data"][i].orgUnit == rowCollection["dept"] && (rowDB["data"][i].promStatus == "Approved by GM" || rowDB["data"][i].promStatus == "Approved by GM with Justification" || rowDB["data"][i].promStatus == "Approved by GM under Spec. Cons.")) {
                sNo = sNo + 1;
                var newPers = sNo + '. ' + rowDB["data"][i].persName + ' (' + rowDB["data"][i].refIndic + ')\n';
                myTable = myTable + newPers;
            }
        }
        var newPers2 = sNo+1 + '. ' + currentRowCollection["persName"] + ' (' + currentRowCollection["refIndic"] + ')\n';
        myTable = myTable + newPers2;

        for(var n = 0; n < current["usersData"].length; n++) {
            if (current["usersData"][n].accessProfile == "HRO Line" && current["usersData"][n].sortHRO == rowCollection["HRO"].slice(0, -1)) {
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
        var txt = 'Dear HRT Focal' + '\n\n' + titleCase(current["user"]) + ' has approved ' + currentRowCollection["persName"] + ' (' + currentRowCollection["refIndic"] + ') to ' + rowCollection["div"] + ' division under special consideration'  + '.\n\nBelow is the updated approved list:\n\n' + myTable + '\n\nVisit the link below to review. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/gmApproved.html ' + '\n\nRegards\nTalent Management';
        sendMail (to,subject,txt,cc)
        updateDb (currentRowCollection["id"],dateRaised,promStatus,mgrComment,gmReason,hrtReason,toPromote,"",trackStatus);
        alert("Staff has been approved for promotion");
        location.reload();
        }
        else{}
    });

    $("#gm").on('mousedown', "select", function(e) {
    e.stopPropagation();
    });

    //////////// HRO Special Consideration

    $("#hro").on('mousedown', "#selectbasic", function(e) {
    e.stopPropagation();
    });

    var table3 = $('#hro').DataTable({
        //"fixedHeader": { header: true,},
        deferLoading:true,
        "bPaginate": false,
        dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        autoWidth: false,
        "bInfo" : false,
        buttons: [
            //{ extend: 'excel', text: 'Export  to Excel' }
            //'copy', 'csv', 'excel', 'pdf', 'print'
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
            { "data": "promStatus", title:"Status", width:"10%" },
            { "data": "toPromote" },
            { "data": "sortHRO" },
        ],
        columnDefs: [ 
            //{ type: 'date', 'targets': [17] },
            { "targets": [ 21,22 ], "visible": false },
            { "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,18,19,20 ] }
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
        { 'sSearch': 'YES' },
        { 'sSearch': "Criteria Not Met" },
        null,
        { 'sSearch': rowCollection["HRODept"] },
        ],
        "order": [[20, 'asc'],[18, 'desc'],[3, 'asc'],[4, 'asc']],
    });

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

    table3.columns().every( function () {
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

    document.getElementById("hroCount").innerHTML = table3.rows( {search:'applied'} ).count();

    ///////////// Load page based on Role
      
    if (rowCollection["access"] == "HRT") {
        $('#homepage').show();
        $('#error').hide();
        $('#PP1').show();	
        $('#tab1').show();
        $('#PP2').hide();	
        $('#tab2').hide();
        $('#PP3').hide();
        $('#tab3').hide();
        $('#PP4').hide();
        $('#tab4').hide();
    }
    else if (rowCollection["access"] == "Manager") {
    	$('#homepage').show();
        $('#error').hide();
        $('#PP1').hide();	
        $('#tab1').hide();
        $('#PP2').show();
        $('#tab2').show();
        $('#PP3').hide();
        $('#tab3').hide();
        $('#PP4').hide();
        $('#tab4').hide();
    }
    else if (rowCollection["access"] == "GM") {
    	$('#homepage').show();
        $('#error').hide();
        $('#PP1').hide();	
        $('#tab1').hide();
        $('#PP2').hide();
        $('#tab2').hide();
        $('#PP3').hide();
        $('#tab3').hide();
        $('#PP4').show();
        $('#tab4').show();
    }
    else if (rowCollection["access"] == "HRO") {
    	$('#homepage').show();
        $('#error').hide();
        $('#PP1').hide();	
        $('#tab1').hide();
        $('#PP2').hide();
        $('#tab2').hide();
        $('#PP3').show();
        $('#tab3').show();
        $('#PP4').hide();
        $('#tab4').hide();
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
	var mgrComment = '<b>' + "Manager's Justification for Nomination: " + '</b>' + d.mgrComment + '<br>' + '<br>';
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
	var mgrReason = '<b>' + "Manager's Justification for Decline: " + '</b>' + d.mgrReason + '<br>' + '<br>';
}
if (d.sbCriteria == "") {
	var sbCriteria = ""
}
else if (d.mgrComment != "") {
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

function showAP(meetAP){
    if (meetAP == "YES" || meetAP == "NO") {
        return meetAP;
    }
    else {
        return "NA"
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