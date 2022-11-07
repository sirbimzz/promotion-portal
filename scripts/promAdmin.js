var currentRowCollection = null;
var rowCollection = null;
var current = null;
var currentRow = null;
var stockRow = null;
var cCount = null;

current = {};
rowCollection = {};

function processUser(data){
	current["user"] = lowCase(data);
}

function processDir(data){
	current["dir"] = data;
}

function processUsers(data){
    current["usersData"] = data;  
    for(var i = 0; i < data.length; i++) {
        if (current["user"] == lowCase(data[i].userName)) {
            rowCollection["access"] = data[i].accessProfile;
            rowCollection["admin"] = data[i].adminUser;
            rowCollection["dept"] = data[i].userDept;
            rowCollection["div"] = data[i].userDiv;
            rowCollection["HRO"] = data[i].sortHRO;
        }
    }
}

var rowDB = null;  
rowDB = {};

function processData(data){
    rowDB["data"] = data;	
    if (rowCollection["admin"] == "Yes") {
        $('#homepage').show();
        $('#error').hide();
    }
    else {
        $('#homepage').hide();
        $('#error').show();
    }
    
    var table1 = $('#adm').DataTable({
        deferLoading:true,
        "bPaginate": false,
        dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        buttons: [
            //{ extend: 'excel', text: 'Export  to Excel' }
        ],
        "data": current["usersData"],
        select:"single",
        "columns": [
        { "data": "fullName", title:"Full Name" },
        { "data": "userName", title:"UserName" },
        { "data": "userEmail", title:"Email" },
        { "data": "accessProfile", title:"Role" },
        { "data": "userDept", title:"Dept" },
        { "data": "userDiv", title:"Division" },
        { "data": "sortHRO", title:"HRO Class" },
        { "data": "adminUser", title:"Admin?" },
        { "data": "id", title:"ID" },
        { "mData": null,
            "bSortable": false,
        "mRender": function (o) { return '<i class="editRow"><button id="editRow">Edit</button></i>&nbsp;<i class="deleteRow" style="color:red;"><button id="deleteRow">Del</button></i>'; },
            width:"65px", title:"Action"
        },       
        ],
        columnDefs: [ 
        //{ type: 'date', 'targets': [1] },
        { "targets": [ 8 ], "visible": false },
        { "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7 ] }
        ],
        'searchCols': [
        null,
        null,
        null,        
        null,
        null
        ],
        "order": [[0, 'asc']],
    });

    $('#adm tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
        }
        else {
        table1.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        }
    } );

    //Edit Row
    $('#adm tbody').on('click', 'i.editRow', function () {

        document.getElementById('id05').style.display='block';
        document.getElementById("updateOld").style.display = "block";
        document.getElementById("updateUser").style.display = "block";
        document.getElementById("addNew").style.display = "none";
        document.getElementById("addUser").style.display = "none";
            
        currentRow = {};

        table1.column(8).visible(true);

        var $row = $(this).closest("tr");
        var $tds0 = $row.find("td:eq(0)");
        var $tds1 = $row.find("td:eq(1)");
        var $tds2 = $row.find("td:eq(2)");
        var $tds3 = $row.find("td:eq(3)");
        var $tds4 = $row.find("td:eq(4)");
        var $tds5 = $row.find("td:eq(5)");
        var $tds6 = $row.find("td:eq(6)");
        var $tds7 = $row.find("td:eq(7)");
        var $tds8 = $row.find("td:eq(8)");

        $.each($tds0, function(i, el) {
        var txt = $(this).text();
        currentRow["fullName"] = txt;
        });
        $.each($tds1, function(i, el) {
        var txt = $(this).text();
        currentRow["userName"] = txt;
        });    
        $.each($tds2, function(i, el) {
        var txt = $(this).text();
        currentRow["userEmail"] = txt;
        });
        $.each($tds3, function(i, el) {
        var txt = $(this).text();
        currentRow["accessProfile"] = txt;
        });
        $.each($tds4, function(i, el) {
        var txt = $(this).text();
        currentRow["userDept"] = txt;
        });
        $.each($tds5, function(i, el) {
        var txt = $(this).text();
        currentRow["userDiv"] = txt;
        });
        $.each($tds6, function(i, el) {
        var txt = $(this).text();
        currentRow["sortHRO"] = txt;
        });
        $.each($tds7, function(i, el) {
        var txt = $(this).text();
        currentRow["adminUser"] = txt;
        });
        $.each($tds8, function(i, el) {
        var txt = $(this).text();
        currentRow["id"] = txt;
        });
        
        console.log(currentRow["id"]);

        table1.column(8).visible(false);

        if (currentRow["accessProfile"] == "HRT" || currentRow["accessProfile"] == "HRT Manager" || currentRow["accessProfile"] == "HRO Manager"){
            var a = document.getElementById("userDiv");
            a.options[a.selectedIndex].text = "";
            document.getElementById('userDiv').disabled=true;
            $('#userDept').val('');
            document.getElementById('userDept').disabled=true;
            var b = document.getElementById("sortHRO");
            b.options[b.selectedIndex].text = "";
            var c = document.getElementById("sortHRO2");
            c.options[b.selectedIndex].text = "";
            document.getElementById('sortHRO').disabled=true;
            document.getElementById('sortHRO2').disabled=true;
        }
        if (currentRow["accessProfile"] == "GM"){
            $('#userDept').val('');
            document.getElementById('userDept').disabled=true;
            var b = document.getElementById("sortHRO");
            b.options[b.selectedIndex].text = "";
            var c = document.getElementById("sortHRO2");
            c.options[b.selectedIndex].text = "";
            document.getElementById('sortHRO').disabled=true;
            document.getElementById('userDiv').disabled=false;
            document.getElementById('sortHRO2').disabled=true;
        }
        if (currentRow["accessProfile"] == "Manager"){
            var a = document.getElementById("userDiv");
            a.options[a.selectedIndex].text = "";
            document.getElementById('userDiv').disabled=true;
            document.getElementById('userDept').disabled=false;
            var b = document.getElementById("sortHRO");
            b.options[b.selectedIndex].text = "";
            var c = document.getElementById("sortHRO2");
            c.options[b.selectedIndex].text = "";
            document.getElementById('sortHRO').disabled=true;
            document.getElementById('sortHRO2').disabled=true;
        }
        if (currentRow["accessProfile"] == "HRO"){
            var a = document.getElementById("userDiv");
            a.options[a.selectedIndex].text = "";
            document.getElementById('userDiv').disabled=true;
            $('#userDept').val('');
            document.getElementById('userDept').disabled=true;
            document.getElementById('sortHRO').style.display='block';
            document.getElementById('sortHRO2').style.display='none';
            document.getElementById('sortHRO').disabled=false;
            document.getElementById('sortHRO2').disabled=true;
            var b = document.getElementById("sortHRO");
            b.options[b.selectedIndex].text = currentRow["sortHRO"];
        }
        if (currentRow["accessProfile"] == "HRO Line"){
            var a = document.getElementById("userDiv");
            a.options[a.selectedIndex].text = "";
            document.getElementById('userDiv').disabled=true;
            $('#userDept').val('');
            document.getElementById('userDept').disabled=true;
            document.getElementById('sortHRO').style.display='none';
            document.getElementById('sortHRO2').style.display='block';
            document.getElementById('sortHRO2').disabled=false;
            document.getElementById('sortHRO').disabled=true;
            var b = document.getElementById("sortHRO2");
            b.options[b.selectedIndex].text = currentRow["sortHRO"];
        }

        //document.getElementById("fullName").innerHTML = currentRow["fullName"];
        document.getElementById("userName").innerHTML = currentRow["userName"];
        document.getElementById("userEmail").innerHTML = currentRow["userEmail"];
        var a = document.getElementById("accessProfile");
        a.options[a.selectedIndex].text = currentRow["accessProfile"];
        $('#userDept').val(currentRow["userDept"]);
        $('#fullName').val(currentRow["fullName"]);
        //var b = document.getElementById("userDept");
        //b.options[b.selectedIndex].text = currentRow["userDept"];
        var c = document.getElementById("userDiv");
        c.options[c.selectedIndex].text = currentRow["userDiv"];
        var d = document.getElementById("adminUser");
        d.options[d.selectedIndex].text = currentRow["adminUser"];
        var e = document.getElementById("sortHRO");
        e.options[e.selectedIndex].text = currentRow["sortHRO"];
    });

    //Delete Row
    $('#adm tbody').on('click', 'i.deleteRow', function () {

        currentRow = {};

        table1.column(8).visible(true);

        var $row = $(this).closest("tr");
        var $tds0 = $row.find("td:eq(0)");
        var $tds1 = $row.find("td:eq(1)");
        var $tds2 = $row.find("td:eq(2)");
        var $tds3 = $row.find("td:eq(3)");
        var $tds4 = $row.find("td:eq(4)");
        var $tds5 = $row.find("td:eq(5)");
        var $tds6 = $row.find("td:eq(6)");
        var $tds7 = $row.find("td:eq(7)");
        var $tds8 = $row.find("td:eq(8)");

        $.each($tds0, function(i, el) {
        var txt = $(this).text();
        currentRow["fullName"] = txt;
        });
        $.each($tds8, function(i, el) {
        var txt = $(this).text();
        currentRow["id"] = txt;
        });
        
        console.log(currentRow["id"]);

        table1.column(8).visible(false);

        if (confirm("Confirm delete of " + titleCase(currentRow["fullName"]))) {
            deleteUser(currentRow["id"]);
            location.reload();
        } else {}

    });

    $("#adm").on('mousedown', "select", function(e) {
        e.stopPropagation();
    });

    // Add event listener for opening and closing details
    $('#adm tbody').on('click', 'td.details-control', function () {
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

    table1.on("user-select", function (e, dt, type, cell, originalEvent) {
        if ($(cell.node()).hasClass("details-control")) {
        e.preventDefault();
        }
    });
    $("#loading").hide();

    $("#hrt").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
    });
    
    var table2 = $('#hrt').DataTable({
        //"fixedHeader": { header: true,},
        deferLoading:true,
        "bPaginate": false,
        dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
        autoWidth: false,
        buttons: [
            //{ extend: 'excel', text: 'Export  to Excel' }
            //'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "data": data,
        select:"single",
        "columns": [
            { "data": "genCriteria", render: showInfo },
            { "data": "persNo", title:"Pers. No." },
            { "data": "persName", title:"Personnel Name", width: "20%" },
            { "data": "empSubgroup", title:"Employee Subgroup", width: "15%"  },
            { "data": "persSubarea", title:"Div" },
            { "data": "orgUnit", title:"Dept" },
            { "data": "persPosition", title:"Position", width: "20%"  },
            { "data": "refIndic", title:"Ref. Indic." },
            { "data": "psGroup", title:"Curr. SG" },
            { "data": "jobGroup", title:"Job Group" },
            { "data": "avgIPF", title:"Avg IPF", render: approx },
            { "data": "headRoom", title:"Head Room" },
            { "data": "sbCriteria", title:"Meet A&P?" },
            { "data": "lastCep", title:"CEP" },
            { "data": "promYr", title:"Last Prom. Year" },
            { "data": "genCriteria", title:"Meet Criteria?" },
            { "data": "sConsider", title:"Special Consideration?" },
            { "data": "promStatus", title:"Status", width: "10%"  },
            { "data": "toPromote" },
            { "data": "sortHRO" },
            { "data": "trackStatus" },
            { "data": "mgrComment" },
            { "data": "mgrReason" },
            { "data": "hrtReason" },
            { "data": "gmReason" },
            { "data": "id" },
            { "mData": null,
                "bSortable": false,
                "mRender": function (o) { return '<i class="editRow1"><button id="editRow1" style="background:#70AD47; color:white; width:85%;">View</button></i>'; },
                width:"15px",
                title:"Action"
            },
        ],
        columnDefs: [ 
            { "targets": [ 0,18, 20,21,22,23,24,25 ], "visible": false },
            { "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,21,22,23,24,25 ] }
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
        ],
        "order": [[20, 'desc'],[17, 'asc'],[4, 'asc'],[5, 'asc']],
    });
    
    // Add event listener for opening and closing details
    $('#hrt tbody').on('click', 'i.rowInfo', function () {
        var tr = $(this).closest('tr');
        var tdi = tr.find("i.fa");
        var row = table2.row(tr);
    
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
    
    table2.on("user-select", function (e, dt, type, cell, originalEvent) {
        if ($(cell.node()).hasClass("details-control")) {
            e.preventDefault();
        }
    });

    //EDit
    $('#hrt tbody').on('click', 'i.editRow1', function () {
        
        document.getElementById('id01').style.display='block';
        
        currentRowCollection = {};
        
        table2.column(0).visible(true);
        table2.column(18).visible(true);
        table2.column(19).visible(true);
        table2.column(20).visible(true);
        table2.column(21).visible(true);
        table2.column(22).visible(true);
        table2.column(23).visible(true);
        table2.column(24).visible(true);
        table2.column(25).visible(true);
        
        var $row = $(this).closest("tr");
        var $tds1 = $row.find('td:eq(1)');
        var $tds2 = $row.find('td:eq(2)');
        var $tds3 = $row.find('td:eq(3)');
        var $tds4 = $row.find('td:eq(4)');
        var $tds5 = $row.find('td:eq(5)');
        var $tds6 = $row.find('td:eq(6)');
        var $tds7 = $row.find('td:eq(7)');
        var $tds8 = $row.find('td:eq(8)');
        var $tds9 = $row.find('td:eq(9)');
        var $tds10 = $row.find('td:eq(10)');
        var $tds11 = $row.find('td:eq(11)');
        var $tds12 = $row.find('td:eq(12)');
        var $tds13 = $row.find('td:eq(13)');
        var $tds14 = $row.find('td:eq(14)');
        var $tds15 = $row.find('td:eq(15)');
        var $tds16 = $row.find('td:eq(16)');
        var $tds17 = $row.find('td:eq(17)');
        var $tds18 = $row.find('td:eq(18)');
        var $tds19 = $row.find('td:eq(19)');
        var $tds20 = $row.find('td:eq(20)');
        var $tds21 = $row.find('td:eq(21)');
        var $tds22 = $row.find('td:eq(22)');
        var $tds23 = $row.find('td:eq(23)');
        var $tds24 = $row.find('td:eq(24)');
        var $tds25 = $row.find('td:eq(25)'); 
    
        
        $.each($tds1, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['persNo'] = txt;
        });
        $.each($tds2, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['persName'] = txt;
        });
        $.each($tds3, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['empSubgroup'] = txt;
        });
        $.each($tds4, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['persSubarea'] = txt;
        });
        $.each($tds5, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['orgUnit'] = txt;
        });
        $.each($tds6, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['persPosition'] = txt;
        });
        $.each($tds7, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['refIndic'] = txt;
        });
        $.each($tds8, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['psGroup'] = txt;
        });
        $.each($tds9, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['jobGroup'] = txt;
        });
        $.each($tds10, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['avgIPF'] = txt;
        });
        $.each($tds11, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['headRoom'] = txt;
        });
        $.each($tds12, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['sbCriteria'] = txt;
        });
        $.each($tds13, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['lastCep'] = txt;
        });
        $.each($tds14, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['promYr'] = txt;
        });
        $.each($tds15, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['genCriteria'] = txt;
        });
        $.each($tds16, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['sConsider'] = txt;
        });
        $.each($tds17, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['promStatus'] = txt;
        });
        $.each($tds18, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['toPromote'] = txt;
        });
        $.each($tds19, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['sortHRO'] = txt;
        });
        $.each($tds20, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['trackStatus'] = txt;
        });
        $.each($tds21, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['mgrComment'] = txt;
        });
        $.each($tds22, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['mgrReason'] = txt;
        });
        $.each($tds23, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['hrtReason'] = txt;
        });
        $.each($tds24, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['gmReason'] = txt;
        });
        $.each($tds25, function(i, el) {
            var txt = $(this).text();
            currentRowCollection['id'] = txt;
        });
                        
        console.log(currentRowCollection["id"]); 
        
        table2.column(0).visible(false);
        table2.column(18).visible(false);
        table2.column(19).visible(false);
        table2.column(20).visible(false);
        table2.column(21).visible(false);
        table2.column(22).visible(false);
        table2.column(23).visible(false);
        table2.column(24).visible(false);  
        table2.column(25).visible(false);    	

        document.getElementById('persNo').innerHTML = currentRowCollection['persNo'];
        document.getElementById('persName').innerHTML = currentRowCollection['persName'];
        document.getElementById('empSubgroup').innerHTML = currentRowCollection['empSubgroup'];
        document.getElementById('persSubarea').innerHTML = currentRowCollection['persSubarea'];
        document.getElementById('orgUnit').innerHTML = currentRowCollection['orgUnit'];
        document.getElementById('persPosition').innerHTML = currentRowCollection['persPosition'];
        document.getElementById('refIndic').innerHTML = currentRowCollection['refIndic'];
        document.getElementById('psGroup').innerHTML = currentRowCollection['psGroup'];
        document.getElementById('jobGroup').innerHTML = currentRowCollection['jobGroup'];
        document.getElementById('avgIPF').innerHTML = currentRowCollection['avgIPF'];
        document.getElementById('headRoom').innerHTML = currentRowCollection['headRoom'];
        document.getElementById('sbCriteria').innerHTML = currentRowCollection['sbCriteria'];
        document.getElementById('lastCep').innerHTML = currentRowCollection['lastCep'];
        document.getElementById('promYr').innerHTML = currentRowCollection['promYr'];
        document.getElementById('genCriteria').innerHTML = currentRowCollection['genCriteria'];
        document.getElementById('sConsider').innerHTML = currentRowCollection['sConsider'];
        //document.getElementById('promStatus').innerHTML = currentRowCollection['promStatus'];
        document.getElementById('toPromote').innerHTML = currentRowCollection['toPromote'];
        document.getElementById('sortHRO3').innerHTML = currentRowCollection['sortHRO'];
        document.getElementById('trackStatus').innerHTML = currentRowCollection['trackStatus'];
        document.getElementById('mgrComment').innerHTML = currentRowCollection['mgrComment'];
        document.getElementById('mgrReason').innerHTML = currentRowCollection['mgrReason'];
        document.getElementById('hrtReason').innerHTML = currentRowCollection['hrtReason'];
        document.getElementById('gmReason').innerHTML = currentRowCollection['gmReason'];

        var a = document.getElementById('promStatus');
        a.options[a.selectedIndex].text = currentRowCollection['promStatus'];
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
            $(this).append('<br /><select style="width: 55px;color:black; font-size:8pt;"><option value="" selected>Filter</option><option value="Criteria Met">Criteria Met</option><option value="Reviewed by HRT">Reviewed by HRT</option><option value="Approved by Manager">Approved by Manager</option><option value="Approved at Challenge Session">Approved at Challenge Session</option><option value="Criteria Not Met">Criteria Not Met</option><option value="Declined by Manager">Declined by Manager</option><option value="Declined at Challenge Session">Declined at Challenge Session</option></select>');			  
        }
    });
    
    table2.columns().every( function () {
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
}

function yyyymmdd(d, sep) {
    var mm = d.getMonth() + 1; // getMonth() is zero-based
    var dd = d.getDate();
    return [d.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
    ].join(sep || '/');
};

function yyyymmmdd(d, sep) {
    var dd = d.getDate();           
    return [(dd>9 ? '' : '0') + dd,
        months[d.getMonth()],
        d.getFullYear()
    ].join(sep || ' ');

};

function dateRenderer( data, type, row ) {
	if(data){
        var d=  new Date(data);
        return yyyymmmdd(d);
    }else{
        return "<Null>";
    }
}
function dateRendere( date ) {
	if(date){
		var dd = formatDatee (date);
        var d=  new Date(dd);
        return yyyymmmdd(d);
    }else{
        return "<Null>";
    }
}
function dateRender( date ) {
	if(date){
		var dd = formattDate (date);
        var d=  new Date(dd);
        return yyyymmmdd(d);
    }else{
        return "<Null>";
    }
}
    
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDate(data, type, row) {
    var d = new Date(data),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}
function formatDatee(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function formattDate(date) {
	if (date == "") {
		return "";
	}
	else {
		//var dateString = "23/10/2015"; // Oct 23
		var dateParts = date.split("/");
		// month is 0-based, that's why we need dataParts[1] - 1
		var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
		return dateObject.toString();
	}
}

function titleCase(str) {
   var splitStr = str.toLowerCase().split('.');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1).toLowerCase();     
   }
   // Directly return the joined string
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

function addRow(){  
	document.getElementById('id05').style.display="block";   
    document.getElementById("updateOld").style.display = "none";
	document.getElementById("updateUser").style.display = "none";
	document.getElementById("addNew").style.display = "block";
	document.getElementById("addUser").style.display = "block";
    //document.getElementById("fullName").innerHTML = "";
    document.getElementById("userName").innerHTML = "";
    document.getElementById("userEmail").innerHTML = "";
    $('#userDept').val('');
    $('#fullName').val('');
    var a = document.getElementById("accessProfile");
    a.options[a.selectedIndex].text = "";
    //var b = document.getElementById("userDept");
    //b.options[b.selectedIndex].text = "";
    var c = document.getElementById("userDiv");
    c.options[c.selectedIndex].text = "";
    var d = document.getElementById("adminUser");
    d.options[d.selectedIndex].text = "";
}

$('#addUser').click(function(){
    var dateRaised = formatDate(new Date());
    //var fullName = document.getElementById("fullName").value;
    var userName = document.getElementById("userName").value;
    var userEmail = document.getElementById("userEmail").value;
    var userDept = document.querySelector('#userDept').value;
    var fullName = document.querySelector('#fullName').value;
    var a = document.getElementById("accessProfile");
    var accessProfile = a.options[a.selectedIndex].text;
    //var b = document.getElementById("userDept");
    //var userDept = b.options[b.selectedIndex].text;
    var c = document.getElementById("adminUser");
    var adminUser = c.options[c.selectedIndex].text;
    var d = document.getElementById("userDiv");
    var userDiv = d.options[d.selectedIndex].text;

    if (accessProfile == "HRO"||accessProfile == "Manager") {
        var e = document.getElementById("sortHRO");
        var sortHRO = e.options[e.selectedIndex].text;
    }
    else if (accessProfile == "HRO Line") {
        var f = document.getElementById("sortHRO2");
        var sortHRO = f.options[f.selectedIndex].text;
    }
    else {
        var sortHRO = "";
    }

    postUser (dateRaised,fullName,userName,userEmail,userDept,userDiv,accessProfile,adminUser,sortHRO);
    alert ("User has been added")
    location.reload();
});

$('#updateUser').click(function(){
    var dateRaised = formatDate(new Date());
    var fullName = document.getElementById("fullName").value;
    var userName = document.getElementById("userName").value;
    var userEmail = document.getElementById("userEmail").value;
    var userDept = document.querySelector('#userDept').value;
    var a = document.getElementById("accessProfile");
    var accessProfile = a.options[a.selectedIndex].text;
    //var b = document.getElementById("userDept");
    //var userDept = b.options[b.selectedIndex].text;
    var c = document.getElementById("adminUser");
    var adminUser = c.options[c.selectedIndex].text;
    var d = document.getElementById("userDiv");
    var userDiv = d.options[d.selectedIndex].text;
    
    if (accessProfile == "HRO"||accessProfile == "Manager") {
        var e = document.getElementById("sortHRO");
        var sortHRO = e.options[e.selectedIndex].text;
    }
    else if (accessProfile == "HRO Line") {
        var f = document.getElementById("sortHRO2");
        var sortHRO = f.options[f.selectedIndex].text;
    }
    else {
        var sortHRO = "";
    }

    updateUser (currentRow["id"],dateRaised,fullName,userName,userEmail,userDept,userDiv,accessProfile,adminUser,sortHRO);
    alert ("User details has been updated")
    location.reload();
});

function viewList() {
	$('#PP1').show();
	$('#tab1').show();
    $('#PP2').hide();
	$('#tab2').hide();
}
function viewUsers() {
	$('#PP1').hide();
	$('#tab1').hide();
    $('#PP2').show();
	$('#tab2').show();
}

function approx(ipf) {
    if (ipf == "") {
        return "";
    }
    else {
        return (parseFloat(ipf)).toFixed(2);
    }
}

function showInfo(genCriteria) {
	return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';

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

$('#enable1').click(function(){
    document.getElementById('persNo').disabled=false;
    currentRowCollection['fUpdated'] = 'persNo';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable2').click(function(){
    document.getElementById('persName').disabled=false;
    currentRowCollection['fUpdated'] = 'persName';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable3').click(function(){
    document.getElementById('empSubgroup').disabled=false;
    currentRowCollection['fUpdated'] = 'empSubgroup';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable4').click(function(){
    document.getElementById('persSubarea').disabled=false;
    currentRowCollection['fUpdated'] = 'persSubarea';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable5').click(function(){
    document.getElementById('orgUnit').disabled=false;
    currentRowCollection['fUpdated'] = 'orgUnit';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable6').click(function(){
    document.getElementById('persPosition').disabled=false;
    currentRowCollection['fUpdated'] = 'persPosition';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable7').click(function(){
    document.getElementById('refIndic').disabled=false;
    currentRowCollection['fUpdated'] = 'refIndic';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable8').click(function(){
    document.getElementById('psGroup').disabled=false;
    currentRowCollection['fUpdated'] = 'psGroup';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable9').click(function(){
    document.getElementById('jobGroup').disabled=false;
    currentRowCollection['fUpdated'] = 'jobGroup';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable10').click(function(){
    document.getElementById('avgIPF').disabled=false;
    currentRowCollection['fUpdated'] = 'avgIPF';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable11').click(function(){
    document.getElementById('headRoom').disabled=false;
    currentRowCollection['fUpdated'] = 'headRoom';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable12').click(function(){
    document.getElementById('sbCriteria').disabled=false;
    currentRowCollection['fUpdated'] = 'sbCriteria';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable13').click(function(){
    document.getElementById('lastCep').disabled=false;
    currentRowCollection['fUpdated'] = 'lastCep';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable14').click(function(){
    document.getElementById('promYr').disabled=false;
    currentRowCollection['fUpdated'] = 'promYr';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable15').click(function(){
    document.getElementById('genCriteria').disabled=false;
    currentRowCollection['fUpdated'] = 'genCriteria';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable16').click(function(){
    document.getElementById('sConsider').disabled=false;
    currentRowCollection['fUpdated'] = 'sConsider';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable17').click(function(){
    document.getElementById('promStatus').disabled=false;
    currentRowCollection['fUpdated'] = 'promStatus';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable18').click(function(){
    document.getElementById('toPromote').disabled=false;
    currentRowCollection['fUpdated'] = 'toPromote';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable19').click(function(){
    document.getElementById('sortHRO3').disabled=false;
    currentRowCollection['fUpdated'] = 'sortHRO';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable20').click(function(){
    document.getElementById('trackStatus').disabled=false;
    currentRowCollection['fUpdated'] = 'trackStatus';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable21').click(function(){
    document.getElementById('mgrComment').disabled=false;
    currentRowCollection['fUpdated'] = 'mgrComment';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable22').click(function(){
    document.getElementById('mgrReason').disabled=false;
    currentRowCollection['fUpdated'] = 'mgrReason';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable23').click(function(){
    document.getElementById('hrtReason').disabled=false;
    currentRowCollection['fUpdated'] = 'hrtReason';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})
$('#enable24').click(function(){
    document.getElementById('gmReason').disabled=false;
    currentRowCollection['fUpdated'] = 'gmReason';
    document.getElementById('enable1').style.display='none';
    document.getElementById('enable2').style.display='none';
    document.getElementById('enable3').style.display='none';
    document.getElementById('enable4').style.display='none';
    document.getElementById('enable5').style.display='none';
    document.getElementById('enable6').style.display='none';
    document.getElementById('enable7').style.display='none';
    document.getElementById('enable8').style.display='none';
    document.getElementById('enable9').style.display='none';
    document.getElementById('enable10').style.display='none';
    document.getElementById('enable11').style.display='none';
    document.getElementById('enable12').style.display='none';
    document.getElementById('enable13').style.display='none';
    document.getElementById('enable14').style.display='none';
    document.getElementById('enable15').style.display='none';
    document.getElementById('enable16').style.display='none';
    document.getElementById('enable17').style.display='none';
    document.getElementById('enable18').style.display='none';
    document.getElementById('enable19').style.display='none';
    document.getElementById('enable20').style.display='none';
    document.getElementById('enable21').style.display='none';
    document.getElementById('enable22').style.display='none';
    document.getElementById('enable23').style.display='none';
    document.getElementById('enable24').style.display='none';
    document.getElementById('updateData').style.display='block';
})


$('#updateData').click(function(){
    var persNo = document.getElementById('persNo').value;
    var persName = document.getElementById('persName').value;
    var empSubgroup = document.getElementById('empSubgroup').value;
    var persSubarea = document.getElementById('persSubarea').value;
    var orgUnit = document.getElementById('orgUnit').value;
    var persPosition = document.getElementById('persPosition').value;
    var refIndic = document.getElementById('refIndic').value;
    var psGroup = document.getElementById('psGroup').value;
    var jobGroup = document.getElementById('jobGroup').value;
    var avgIPF = document.getElementById('avgIPF').value;
    var headRoom = document.getElementById('headRoom').value;
    var sbCriteria = document.getElementById('sbCriteria').value;
    var lastCep = document.getElementById('lastCep').value;
    var promYr = document.getElementById('promYr').value;
    var genCriteria = document.getElementById('genCriteria').value;
    var sConsider = document.getElementById('sConsider').value;
    var a = document.getElementById("promStatus");
    var promStatus = a.options[a.selectedIndex].text;
    var toPromote = document.getElementById('toPromote').value;
    var sortHRO = document.getElementById('sortHRO3').value;
    var trackStatus = document.getElementById('trackStatus').value;
    var mgrComment = (document.getElementById('mgrComment').value).replace(/[^a-zA-Z1234567890, ]/g, ".");
    var mgrReason = (document.getElementById('mgrReason').value).replace(/[^a-zA-Z1234567890, ]/g, ".");
    var hrtReason = (document.getElementById('hrtReason').value).replace(/[^a-zA-Z1234567890, ]/g, ".");
    var gmReason = (document.getElementById('gmReason').value).replace(/[^a-zA-Z1234567890, ]/g, ".");

    var dateRaised = new Date();
    var updatedBy = current["user"];
    var fUpdated = currentRowCollection["fUpdated"];
    var sUpdated =  persName + ' (' + refIndic + ') ';

    if (fUpdated == 'persNo') {
        var vUpdated = persNo;
    }
    else if (fUpdated == 'persName') {
        var vUpdated = persName;
    }
    else if (fUpdated == 'empSubgroup') {
        var vUpdated = empSubgroup;
    }
    else if (fUpdated == 'persSubarea') {
        var vUpdated = persSubarea;
    }
    else if (fUpdated == 'orgUnit') {
        var vUpdated = orgUnit;
    }
    else if (fUpdated == 'persPosition') {
        var vUpdated = persPosition;
    }
    else if (fUpdated == 'refIndic') {
        var vUpdated = refIndic;
    }
    else if (fUpdated == 'psGroup') {
        var vUpdated = psGroup;
    }
    else if (fUpdated == 'jobGroup') {
        var vUpdated = jobGroup;
    }
    else if (fUpdated == 'avgIPF') {
        var vUpdated = avgIPF;
    }
    else if (fUpdated == 'headRoom') {
        var vUpdated = headRoom;
    }
    else if (fUpdated == 'sbCriteria') {
        var vUpdated = sbCriteria;
    }
    else if (fUpdated == 'lastCep') {
        var vUpdated = lastCep;
    }
    else if (fUpdated == 'promYr') {
        var vUpdated = promYr;
    }
    else if (fUpdated == 'genCriteria') {
        var vUpdated = genCriteria;
    }
    else if (fUpdated == 'sConsider') {
        var vUpdated = sConsider;
    }
    else if (fUpdated == 'promStatus') {
        var vUpdated = promStatus;
    }
    else if (fUpdated == 'toPromote') {
        var vUpdated = toPromote;
    }
    else if (fUpdated == 'sortHRO') {
        var vUpdated = sortHRO;
    }
    else if (fUpdated == 'trackStatus') {
        var vUpdated = trackStatus;
    }
    else if (fUpdated == 'mgrComment') {
        var vUpdated = mgrComment;
    }
    else if (fUpdated == 'mgrReason') {
        var vUpdated = mgrReason;
    }
    else if (fUpdated == 'hrtReason') {
        var vUpdated = hrtReason;
    }
    else if (fUpdated == 'gmReason') {
        var vUpdated = gmReason;
    }    

    var to = 'omotayo.oluyemi@nlng.com, ifeanyi.onwuka@nlng.com';
   //var to = 'abimbola.salami@nlng.com';
    //var recipient = current["user"];
    var cc = 'Cc: ' + current["user"] + '@nlng.com';
    var subject = "Promotion Database Updated";
    var txt = 'Dear Admin(s)' + '\n\nThe database has been updated for ' + persName + ' (' + refIndic + ') ' + 'with details below. \n\nTime of Update: ' + dateRaised + '\n\nField Updated: ' + fUpdated+ '\n\nNew Value: ' + vUpdated+ '\n\nUpdated By: ' + titleCase(updatedBy) + '\n\nVisit ' + 'http://wapp-bny.nlng.net/datacentric/promotion/admin.html to review.' + '\n\nRegards\nTalent Management';

    updateDB (currentRowCollection["id"],persNo,persName,empSubgroup,persSubarea,orgUnit,persPosition,refIndic,psGroup,jobGroup,avgIPF,headRoom,sbCriteria,lastCep,promYr,genCriteria,sConsider,promStatus,toPromote,sortHRO,trackStatus,mgrComment,mgrReason,hrtReason,gmReason)
    postLog (dateRaised,fUpdated,vUpdated,updatedBy,sUpdated)
    sendMail (to,subject,txt,cc)
    location.reload();
})

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

 function changeClass() {
    var d = document.getElementById("promStatus");
	var promStatus = d.options[d.selectedIndex].text;

    if (promStatus == "Not Considered") {
        document.getElementById('trackStatus').innerHTML = "A";
    }
    else if (promStatus == "Criteria Not Met") {
        document.getElementById('trackStatus').innerHTML = "B";
    }
    else if (promStatus == "Criteria Met") {
        document.getElementById('trackStatus').innerHTML = "C";
    }
    else if (promStatus == "Reviewed by HRT") {
        document.getElementById('trackStatus').innerHTML = "D";
    }
    else if (promStatus == "Approved by Manager") {
        document.getElementById('trackStatus').innerHTML = "F";
    }
    else if (promStatus == "Approved at Challenge Session") {
        document.getElementById('trackStatus').innerHTML = "J";
    }
    else if (promStatus == "Declined at Challenge Session") {
        document.getElementById('trackStatus').innerHTML = "K";
    }
    else if (promStatus == "Declined by Manager") {
        document.getElementById('trackStatus').innerHTML = "L";
    }
 }

function popUser(){
    //var fullName = document.getElementById('fullName').value;
    var fullName = document.querySelector('#fullName').value;
    for(var i = 0; i < current["dir"].length; i++) {
        if(current["dir"][i].fullName == fullName){
            document.getElementById('userName').innerHTML = (current["dir"][i].userName).toLowerCase();
            document.getElementById('userEmail').innerHTML = (current["dir"][i].userEmail).toLowerCase();
        }
    }

}

function roleSel(){
    var d = document.getElementById("accessProfile");
    var accessProfile = d.options[d.selectedIndex].text;

    if (accessProfile == "HRT" || accessProfile == "HRT Manager" || accessProfile == "HRO Manager"){
        var a = document.getElementById("userDiv");
        a.options[a.selectedIndex].text = "";
        document.getElementById('userDiv').disabled=true;
        $('#userDept').val('');
        document.getElementById('userDept').disabled=true;
        var b = document.getElementById("sortHRO");
        b.options[b.selectedIndex].text = "";
        var c = document.getElementById("sortHRO2");
        c.options[c.selectedIndex].text = "";
        document.getElementById('sortHRO').disabled=true;
        document.getElementById('sortHRO2').disabled=true;
    }
    if (accessProfile == "GM"){
        $('#userDept').val('');
        document.getElementById('userDept').disabled=true;
        var b = document.getElementById("sortHRO");
        b.options[b.selectedIndex].text = "";
        var c = document.getElementById("sortHRO2");
        c.options[c.selectedIndex].text = "";
        document.getElementById('sortHRO').disabled=true;
        document.getElementById('userDiv').disabled=false;
        document.getElementById('sortHRO2').disabled=true;
    }
    if (accessProfile == "Manager"){
        var a = document.getElementById("userDiv");
        a.options[a.selectedIndex].text = "";
        document.getElementById('userDiv').disabled=true;
        document.getElementById('userDept').disabled=false;
        var c = document.getElementById("sortHRO2");
        c.options[c.selectedIndex].text = "";
        document.getElementById('sortHRO').disabled=true;
        document.getElementById('sortHRO2').disabled=true;
        document.getElementById('sortHRO').style.display='block';
        document.getElementById('sortHRO2').style.display='none';
    }
    if (accessProfile == "HRO"){
        var a = document.getElementById("userDiv");
        a.options[a.selectedIndex].text = "";
        document.getElementById('userDiv').disabled=true;
        $('#userDept').val('');
        document.getElementById('userDept').disabled=true;
        document.getElementById('sortHRO').style.display='block';
        document.getElementById('sortHRO2').style.display='none';
        document.getElementById('sortHRO').disabled=false;
        document.getElementById('sortHRO2').disabled=true;
        var b = document.getElementById("sortHRO");
        b.options[b.selectedIndex].text = "";
    }
    if (accessProfile == "HRO Line"){
        var a = document.getElementById("userDiv");
        a.options[a.selectedIndex].text = "";
        document.getElementById('userDiv').disabled=true;
        $('#userDept').val('');
        document.getElementById('userDept').disabled=true;
        document.getElementById('sortHRO').style.display='none';
        document.getElementById('sortHRO2').style.display='block';
        document.getElementById('sortHRO2').disabled=false;
        document.getElementById('sortHRO').disabled=true;
        var b = document.getElementById("sortHRO2");
        b.options[b.selectedIndex].text = "";
    }
    if (accessProfile == "None"){
        var a = document.getElementById("userDiv");
        a.options[a.selectedIndex].text = "";
        document.getElementById('userDiv').disabled=true;
        $('#userDept').val('');
        document.getElementById('userDept').disabled=true;
        document.getElementById('sortHRO').style.display='block';
        document.getElementById('sortHRO2').style.display='none';
        document.getElementById('sortHRO2').disabled=true;
        document.getElementById('sortHRO').disabled=true;
        var b = document.getElementById("sortHRO");
        b.options[b.selectedIndex].text = "";
        var c = document.getElementById("sortHRO2");
        c.options[c.selectedIndex].text = "";
    }
}

function popHRO(){
    var userDept = document.querySelector('#userDept').value;
    var b = document.getElementById("sortHRO");
    var c = document.getElementById("userDiv");

    if (userDept == "PO") {
        b.options[b.selectedIndex].text = "HRO11";
    }
    else if (userDept == "PC"||userDept == "PDE"||userDept == "PS"||userDept == "PT") {
        b.options[b.selectedIndex].text = "HRO12";
    }
    else if (userDept == "PG"||userDept == "PI"||userDept == "PM") {
        b.options[b.selectedIndex].text = "HRO13";
    }
    else if (userDept == "CSS"||userDept == "CAA"||userDept == "CPL"||userDept == "HSE") {
        b.options[b.selectedIndex].text = "HRO21";
    }
    else if (userDept == 'BIM'||userDept == 'ERC'||userDept == 'ERG'||userDept == 'ERG'||userDept == 'ERN'||userDept == 'ERP'||userDept == 'FNB'||userDept == 'FNC'||userDept == 'FNL'||userDept == 'FNL'||userDept == 'FNR'||userDept == 'FNS'||userDept == 'FNT'||userDept == 'HRE'||userDept == 'HRL'||userDept == 'HRL'||userDept == 'HRO'||userDept == 'HRO'||userDept == 'HRT'||userDept == 'LGS'||userDept == 'LGT') {
        b.options[b.selectedIndex].text = "HRO22";
    }
    else if (userDept == 'ESD'||userDept == 'ESD'||userDept == 'IMT'||userDept == 'LSS'||userDept == 'CPM') {
        b.options[b.selectedIndex].text = "HRO23";
    }
    else if (userDept == 'ECO'||userDept == 'TE'||userDept == 'TF'||userDept == 'TI'||userDept == 'NTP') {
        b.options[b.selectedIndex].text = "HRO31";
    }
    else if (userDept == 'CMA'||userDept == 'CMB'||userDept == 'CMM'||userDept == 'CMP'||userDept == 'CMP'||userDept == 'CMS'||userDept == 'SGA') {
        b.options[b.selectedIndex].text = "HRO32";
    }
    else if (userDept == 'TP') {
        b.options[b.selectedIndex].text = "HRO33";
    }
    else if (userDept == 'NLNG/NSML') {
        b.options[b.selectedIndex].text = "HRO32";
    }
    else {
        b.options[b.selectedIndex].text = "";
        document.getElementById('sortHRO').disabled=false;
    }

    if (userDept == "PD"||userDept == "PO"||userDept == "PC"||userDept == "PDE"||userDept == "PS"||userDept == "PT" || userDept == "PG"||userDept == "PI"||userDept == "PM") {
        c.options[c.selectedIndex].text = "PD";
    }
    else if (userDept == "CM"||userDept == "CMA"||userDept == "CMB"||userDept == "CMM"||userDept == "CMO"||userDept == "CMP"||userDept == "CMS") {
        c.options[c.selectedIndex].text = "CM";
    }
    else if (userDept == "CS"||userDept == "CSS"||userDept == "ESD"||userDept == "IMT"||userDept == "LSS") {
        c.options[c.selectedIndex].text = "CS";
    }
    else if (userDept == "DD"||userDept == "BIM"||userDept == "SGA") {
        c.options[c.selectedIndex].text = "DD";
    }
    else if (userDept == "ER"||userDept == "ERG"||userDept == "ERN"||userDept == "ERP") {
        c.options[c.selectedIndex].text = "ER";
    }
    else if (userDept == "FN"||userDept == "FNB"||userDept == "FNC"||userDept == "FNL"||userDept == "FNR"||userDept == "FNS"||userDept == "FNT") {
        c.options[c.selectedIndex].text = "FN";
    }
    else if (userDept == "HR"||userDept == "HRE"||userDept == "HRL"||userDept == "HRO"||userDept == "HRT") {
        c.options[c.selectedIndex].text = "HR";
    }
    else if (userDept == "MD"||userDept == "HSE"||userDept == "CAA"||userDept == "CPL"||userDept == "CPM") {
        c.options[c.selectedIndex].text = "MD";
    }
    else if (userDept == "NTP") {
        c.options[c.selectedIndex].text = "NT";
    }
    else if (userDept == "LG"||userDept == "LGC"||userDept == "LGT"||userDept == "LGS") {
        c.options[c.selectedIndex].text = "LG";
    }
    else if (userDept == "TD"||userDept == "TE"||userDept == "TF"||userDept == "TI"||userDept == "TP") {
        c.options[c.selectedIndex].text = "TD";
    }
    else if (userDept == "NTP") {
        c.options[c.selectedIndex].text = "NTP";
    }
    else if (userDept == "NLNG/NSML") {
        c.options[c.selectedIndex].text = "DD";
    }
    else {
        c.options[c.selectedIndex].text = "";
        document.getElementById('userDiv').disabled=false;
    }
}