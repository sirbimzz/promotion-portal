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
    ///////////Track HRT
    
    $("#hrt").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
    });

    var table15 = $('#hrt').DataTable({
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
            { 
                "data": null, 
                title: "&#9432;",
                "render": function(data, type, row, meta) {
                    if(row.promStatus == "Declined at Challenge Session" || row.promStatus == "Declined by Manager" || row.promStatus == "Declined by GM"){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else if (row.genCriteria == "NO" && row.promStatus != "Not Considered" && row.sConsider == "YES"){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else if (row.genCriteria == "NO" && (row.promStatus == "Approved by GM" || row.promStatus == "Approved by GM with Justification" || row.promStatus == "Approved by GM under Spec. Cons.")){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else if (row.genCriteria == "NO" && (row.promStatus == "Approved by Manager" || row.promStatus == "Approved by Manager with Justification" || row.promStatus == "Approved by Manager under Spec. Cons.")){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else if (row.genCriteria == "NO" && (row.promStatus == "Approved at Challenge Session" || row.promStatus == "Approved at Challenge Session with Justification" || row.promStatus == "Approved at Challenge Session under Spec. Cons.")){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else {
                        return "";
                    }
                }
            },
            { "data": "persNo", title:"Pers. No." },
            { "data": "persName", title:"Personnel Name", width: "20%" },
            { "data": "empSubgroup", title:"Employee Subgroup", width: "15%"  },
            { "data": "persSubarea", title:"Div" },
            { "data": "orgUnit", title:"Dept" },
            { "data": "persPosition", title:"Position", width: "20%"  },
            { "data": "refIndic", title:"Ref. Indic." },
            { "data": "psGroup", title:"Curr. SG" },
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
            { "data": "promStatus", title:"Status", width: "15%"  },
            { "data": "toPromote" },
            { "data": "sortHRO" },
            { "data": "trackStatus" },
        ],
        columnDefs: [ 
            { "targets": [ 19,21,22,23 ], "visible": false },
            { "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ] }
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
        null,
        null,
        ],
        "order": [[23, 'desc'],[20, 'asc'],[4, 'asc'],[5, 'asc']],
    });

    // Add event listener for opening and closing details
    $('#hrt tbody').on('click', 'i.rowInfo', function () {
        var tr = $(this).closest('tr');
        var tdi = tr.find("i.fa");
        var row = table15.row(tr);

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

    table15.on("user-select", function (e, dt, type, cell, originalEvent) {
        if ($(cell.node()).hasClass("details-control")) {
            e.preventDefault();
        }
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

    table15.columns().every( function () {
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
    
    ///////////Track HRO
    
    $("#hro").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
    });

    var table14 = $('#hro').DataTable({
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
            { 
                "data": null, 
                "render": function(data, type, row, meta) {
                    if(row.promStatus == "Declined at Challenge Session" || row.promStatus == "Declined by Manager"){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else if (row.genCriteria == "NO" && row.sConsider == "YES"){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else if (row.genCriteria == "NO" && (row.promStatus == "Approved by Manager" || row.promStatus == "Approved by Manager with Justification" || row.promStatus == "Approved by Manager under Spec. Cons.")){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else if (row.genCriteria == "NO" && (row.promStatus == "Approved at Challenge Session" || row.promStatus == "Approved at Challenge Session with Justification" || row.promStatus == "Approved at Challenge Session under Spec. Cons.")){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else {
                        return "";
                    }
                }
            },
            { "data": "persNo", title:"Pers. No." },
            { "data": "persName", title:"Personnel Name", width: "20%" },
            { "data": "empSubgroup", title:"Employee Subgroup", width: "15%"  },
            { "data": "persSubarea", title:"Div" },
            { "data": "orgUnit", title:"Dept" },
            { "data": "persPosition", title:"Position", width: "20%"  },
            { "data": "refIndic", title:"Ref. Indic." },
            { "data": "psGroup", title:"Curr. SG" },
            { "data": "jobGroup", title:"Job Group" },
            { "data": "yr1IPF", title:"Yr1 IPF", render: approx },
            { "data": "yr2IPF", title:"Yr2 IPF", render: approx },
            { "data": "yr3IPF", title:"Yr3 IPF", render: approx },
            { "data": "avgIPF", title:"Avg IPF", render: approx },
            { "data": "headRoom", title:"Head Room" },
            { "data": "sbCriteria", title:"Meet A&P?", render: showAP  },
            { "data": "lastCep", title:"CEP" },
            { "data": "promYr", title:"Last Prom. Year" },
            { "data": "genCriteria", title:"Meet Criteria?" },
            { "data": "sConsider", title:"Special Consideration?" },
            { "data": "promStatus", title:"Status", width: "15%"  },
            { "data": "toPromote" },
            { "data": "sortHRO" },
            { "data": "trackStatus" },
            { "data": "staffCat" },
        ],
        columnDefs: [ 
            { "targets": [ 19,21,22,23,24 ], "visible": false },
            { "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ] }
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
        null,
        { 'sSearch': rowCollection["HRODept"] },
        null,
        null,
        ],
        "order": [[23, 'desc'],[20, 'asc'],[4, 'asc'],[5, 'asc']],
    });

    document.getElementById("hroCount").innerHTML = table14.rows( {search:'applied'} ).count();

    // Add event listener for opening and closing details
    $('#hro tbody').on('click', 'i.rowInfo', function () {
        var tr = $(this).closest('tr');
        var tdi = tr.find("i.fa");
        var row = table14.row(tr);

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

    table14.on("user-select", function (e, dt, type, cell, originalEvent) {
        if ($(cell.node()).hasClass("details-control")) {
            e.preventDefault();
        }
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
            $(this).append('<br /><select style="width: 55px;color:black; font-size:8pt;"><option value="" selected>Filter</option><option value="Criteria Met">Criteria Met</option><option value="Reviewed by HRT">Reviewed by HRT</option><option value="Approved by Manager">Approved by Manager</option><option value="Approved at Challenge Session">Approved at Challenge Session</option><option value="Criteria Not Met">Criteria Not Met</option><option value="Declined by Manager">Declined by Manager</option><option value="Declined at Challenge Session">Declined at Challenge Session</option></select>');			  
        }
    });

    table14.columns().every( function () {
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

    ///////////Track Manager
    
    $("#mgr").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
    });

    var table16 = $('#mgr').DataTable({
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
            { 
                "data": null, 
                "render": function(data, type, row, meta) {
                    if(row.promStatus == "Declined at Challenge Session" || row.promStatus == "Declined by Manager"){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else if (row.genCriteria == "NO" && row.sConsider == "YES"){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else if (row.genCriteria == "NO" && (row.promStatus == "Approved by Manager" || row.promStatus == "Approved by Manager with Justification" || row.promStatus == "Approved by Manager under Spec. Cons.")){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else if (row.genCriteria == "NO" && (row.promStatus == "Approved at Challenge Session" || row.promStatus == "Approved at Challenge Session with Justification" || row.promStatus == "Approved at Challenge Session under Spec. Cons.")){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else {
                        return "";
                    }
                }
            },
            { "data": "persNo", title:"Pers. No." },
            { "data": "persName", title:"Personnel Name", width: "20%" },
            { "data": "empSubgroup", title:"Employee Subgroup", width: "15%"  },
            { "data": "persSubarea", title:"Div" },
            { "data": "orgUnit", title:"Dept" },
            { "data": "persPosition", title:"Position", width: "20%"  },
            { "data": "refIndic", title:"Ref. Indic." },
            { "data": "psGroup", title:"Curr. SG" },
            { "data": "jobGroup", title:"Job Group" },
            { "data": "yr1IPF", title:"Yr1 IPF", render: approx },
            { "data": "yr2IPF", title:"Yr2 IPF", render: approx },
            { "data": "yr3IPF", title:"Yr3 IPF", render: approx },
            { "data": "avgIPF", title:"Avg IPF", render: approx },
            { "data": "headRoom", title:"Head Room" },
            { "data": "sbCriteria", title:"Meet A&P?", render: showAP  },
            { "data": "lastCep", title:"CEP" },
            { "data": "promYr", title:"Last Prom. Year" },
            { "data": "genCriteria", title:"Meet Criteria?" },
            { "data": "sConsider", title:"Special Consideration?" },
            { "data": "promStatus", title:"Status", width: "15%"  },
            { "data": "toPromote" },
            { "data": "sortHRO" },
            { "data": "trackStatus" },
            { "data": "staffCat" },
        ],
        columnDefs: [ 
            { "targets": [ 19,21,22,23,24 ], "visible": false },
            { "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ] }
        ],
        'searchCols': [
        null,
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
        null,
        null,
        null,
        { 'sSearch': 'Staff' },
        ],
        "order": [[23, 'desc'],[20, 'asc'],[4, 'asc'],[5, 'asc']],
    });

    document.getElementById("mgrCount").innerHTML = table16.rows( {search:'applied'} ).count();

    // Add event listener for opening and closing details
    $('#mgr tbody').on('click', 'i.rowInfo', function () {
        var tr = $(this).closest('tr');
        var tdi = tr.find("i.fa");
        var row = table16.row(tr);

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

    table16.on("user-select", function (e, dt, type, cell, originalEvent) {
        if ($(cell.node()).hasClass("details-control")) {
            e.preventDefault();
        }
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
            $(this).append('<br /><select style="width: 55px;color:black; font-size:8pt;"><option value="" selected>Filter</option><option value="Criteria Met">Criteria Met</option><option value="Reviewed by HRT">Reviewed by HRT</option><option value="Approved by Manager">Approved by Manager</option><option value="Approved at Challenge Session">Approved at Challenge Session</option><option value="Criteria Not Met">Criteria Not Met</option><option value="Declined by Manager">Declined by Manager</option><option value="Declined at Challenge Session">Declined at Challenge Session</option></select>');			  
        }
    });

    table16.columns().every( function () {
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

    ///////////Track GM
    
    $("#gm").on('mousedown', "#selectbasic", function(e) {
        e.stopPropagation();
    });

    var table17 = $('#gm').DataTable({
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
            { 
                "data": null, 
                "render": function(data, type, row, meta) {
                    if(row.promStatus == "Declined at Challenge Session" || row.promStatus == "Declined by Manager" || row.promStatus == "Declined by GM"){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else if (row.genCriteria == "NO" && row.sConsider == "YES"){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else if (row.genCriteria == "NO" && (row.promStatus == "Approved by GM" || row.promStatus == "Approved by GM with Justification" || row.promStatus == "Approved by GM under Spec. Cons.")){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else if (row.genCriteria == "NO" && (row.promStatus == "Approved at Challenge Session" || row.promStatus == "Approved at Challenge Session with Justification" || row.promStatus == "Approved at Challenge Session under Spec. Cons.")){
                        return '<i class="rowInfo"><img src="http://intranet.nlng.com/pe/pei/datacentric/promotion/resources/details_open.png" style="cursor: pointer;"></i>';
                    }
                    else {
                        return "";
                    }
                }
            },
            { "data": "persNo", title:"Pers. No." },
            { "data": "persName", title:"Personnel Name", width: "20%" },
            { "data": "empSubgroup", title:"Employee Subgroup", width: "15%"  },
            { "data": "persSubarea", title:"Div" },
            { "data": "orgUnit", title:"Dept" },
            { "data": "persPosition", title:"Position", width: "20%"  },
            { "data": "refIndic", title:"Ref. Indic." },
            { "data": "psGroup", title:"Curr. SG" },
            { "data": "jobGroup", title:"Job Group" },
            { "data": "yr1IPF", title:"Yr1 IPF", render: approx },
            { "data": "yr2IPF", title:"Yr2 IPF", render: approx },
            { "data": "yr3IPF", title:"Yr3 IPF", render: approx },
            { "data": "avgIPF", title:"Avg IPF", render: approx },
            { "data": "headRoom", title:"Head Room" },
            { "data": "sbCriteria", title:"Meet A&P?", render: showAP  },
            { "data": "lastCep", title:"CEP" },
            { "data": "promYr", title:"Last Prom. Year" },
            { "data": "genCriteria", title:"Meet Criteria?" },
            { "data": "sConsider", title:"Special Consideration?" },
            { "data": "promStatus", title:"Status", width: "15%"  },
            { "data": "toPromote" },
            { "data": "sortHRO" },
            { "data": "trackStatus" },
            { "data": "staffCat" },
        ],
        columnDefs: [ 
            { "targets": [ 19,21,22,23,24 ], "visible": false },
            { "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ] }
        ],
        'searchCols': [
        null,
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
        null,
        null,
        null,
        { 'sSearch': 'Mgr' },
        ],
        "order": [[23, 'desc'],[20, 'asc'],[4, 'asc'],[5, 'asc']],
    });

    document.getElementById("gmCount").innerHTML = table17.rows( {search:'applied'} ).count();

    // Add event listener for opening and closing details
    $('#gm tbody').on('click', 'i.rowInfo', function () {
        var tr = $(this).closest('tr');
        var tdi = tr.find("i.fa");
        var row = table17.row(tr);

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

    table17.on("user-select", function (e, dt, type, cell, originalEvent) {
        if ($(cell.node()).hasClass("details-control")) {
            e.preventDefault();
        }
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
        if(title == 'Status'){
            $(this).append('<br /><select style="width: 55px;color:black; font-size:8pt;"><option value="" selected>Filter</option><option value="Criteria Met">Criteria Met</option><option value="Reviewed by HRT">Reviewed by HRT</option><option value="Approved by Manager">Approved by Manager</option><option value="Approved at Challenge Session">Approved at Challenge Session</option><option value="Criteria Not Met">Criteria Not Met</option><option value="Declined by Manager">Declined by Manager</option><option value="Declined at Challenge Session">Declined at Challenge Session</option></select>');			  
        }
    });

    table17.columns().every( function () {
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

///////////// Load page based on Role
      
    if (rowCollection["access"] == "HRT") {
        $('#homepage').show();
        $('#error').hide();
        $('#PP16').show();	
        $('#tab17').show();
        $('#PP15').hide();
        $('#tab16').hide();
        $('#PP17').hide();
        $('#tab7').hide();
        $('#PP18').hide();
        $('#tab18').hide();
    }
    else if (rowCollection["access"] == "HRO" || rowCollection["access"] == "HRO Line") {
    	$('#homepage').show();
        $('#error').hide();
        $('#PP16').hide();	
        $('#tab17').hide();
        $('#PP15').show();
        $('#tab16').show();
        $('#PP17').hide();
        $('#tab7').hide();
        $('#PP18').hide();
        $('#tab18').hide();
    }
    else if (rowCollection["access"] == "Manager") {
    	$('#homepage').show();
        $('#error').hide();
        $('#PP16').hide();	
        $('#tab17').hide();
        $('#PP15').hide();
        $('#tab16').hide();
        $('#PP17').show();
        $('#tab7').show();
        $('#PP18').hide();
        $('#tab18').hide();
    }
    else if (rowCollection["access"] == "GM") {
    	$('#homepage').show();
        $('#error').hide();
        $('#PP16').hide();	
        $('#tab17').hide();
        $('#PP15').hide();
        $('#tab16').hide();
        $('#PP17').hide();
        $('#tab7').hide();
        $('#PP18').show();
        $('#tab18').show();
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

function showAP(meetAP){
    if (meetAP == "YES" || meetAP == "NO") {
        return meetAP;
    }
    else {
        return "NA"
    }
}

function showInfo(promStatus) {
	if (promStatus == "Declined at Challenge Session" || promStatus == "Declined by Manager") {
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
