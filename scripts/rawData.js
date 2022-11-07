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
        }
    }
}

var rowDB = null;  
rowDB = {};

function processData(data){
    rowDB["data"] = data;
}

function processDept(data){
    rowDB["dept"] = data;
}

////// Load raw data

function processDataList(data){

    current["data"] = data;

    if (rowDB["data"].length != 0 && rowDB["data"].length < data.length) {

        document.getElementById('loadProgress').innerHTML = ((rowDB["data"].length) * 100/(data.length)).toFixed() + '%';

        $("#loading").hide();
        $("#loading2").show();

        var count = 0;
        for(var i = 0; i < data.length; i++) {
            for(var j = 0; j < rowDB["data"].length; j++) {
                if (parseFloat(data[i].persNo) == parseFloat(rowDB["data"][j].persNo)) {
                    var postDB = "NO";
                    break;
                }
                var postDB = "YES";
            }
            if ((postDB == "YES" && parseFloat(data[i].jobGroup) >= 22) || (postDB == "YES" && parseFloat(data[i].jobGroup) == 15 && data[i].empSubgroup == "NLNG XPostee Paid") || (postDB == "YES" && parseFloat(data[i].jobGroup) == 18 && data[i].empSubgroup == "NLNG XPostee Paid") || (postDB == "YES" && parseFloat(data[i].jobGroup) == 15 && data[i].empSubgroup == "NLNG XPostee Unpaid") || (postDB == "YES" && parseFloat(data[i].jobGroup) == 18 && data[i].empSubgroup == "NLNG XPostee Unpaid")) {
                var dateRaised = formatDatee (new Date());
                var promStatus = "Not Considered";
                var toPromote = "NA";
                var actionDate = "";
                var persArea = "";
                var empStatus = "";
                var annSalary = "";
                var geoZone = "";
                var salCurr = "";
                var gtsComm = "";
                var lgaText = "";
                var costCenter = "";
                var workRule = "";
                var gmReason = "";
                var mgrComment = "";
                var hrtReason = "";
                var mgrReason = "";
                var trackStatus = "A";
                var staffCat = "NA";
                for(var k = 0; k < rowDB["dept"].length; k++) {
                    if (data[i].dept == rowDB["dept"][k].dept) {
                        var sortHRO = rowDB["dept"][k].sortHRO;
                        break;
                    }
                    else {
                        var sortHRO = "";
                    }
                }
                postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                count=count+1;
            }
            else if (postDB == "YES" && (data[i].empSubgroup != "NLNG Permanent Staff" && data[i].empSubgroup != "NLNG Secondee-NSML" && data[i].empSubgroup != "NLNG XPostee Paid" && data[i].empSubgroup != "NLNG XPostee Unpaid")) {
                var dateRaised = formatDatee (new Date());
                var promStatus = "Not Considered";
                var toPromote = "NA";
                var actionDate = "";
                var persArea = "";
                var empStatus = "";
                var annSalary = "";
                var geoZone = "";
                var salCurr = "";
                var gtsComm = "";
                var lgaText = "";
                var costCenter = "";
                var workRule = "";
                var gmReason = "";
                var mgrComment = "";
                var hrtReason = "";
                var mgrReason = "";
                var trackStatus = "A";
                var staffCat = "NA";
                for(var k = 0; k < rowDB["dept"].length; k++) {
                    if (data[i].dept == rowDB["dept"][k].dept) {
                        var sortHRO = rowDB["dept"][k].sortHRO;
                        break;
                    }
                    else {
                        var sortHRO = "";
                    }
                }
                postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                count=count+1;
            }
            else if (postDB == "YES" && data[i].genCriteria == "YES" && parseFloat(data[i].jobGroup) < 19) {
                var dateRaised = formatDatee (new Date());
                var promStatus = "Criteria Met";
                var toPromote = "YES";
                var actionDate = "";
                var persArea = "";
                var empStatus = "";
                var annSalary = "";
                var geoZone = "";
                var salCurr = "";
                var gtsComm = "";
                var lgaText = "";
                var costCenter = "";
                var workRule = "";
                var gmReason = "";
                var mgrComment = "";
                var hrtReason = "";
                var mgrReason = "";
                var trackStatus = "C";
                var staffCat = "Staff";
                for(var k = 0; k < rowDB["dept"].length; k++) {
                    if (data[i].dept == rowDB["dept"][k].dept) {
                        var sortHRO = rowDB["dept"][k].sortHRO;
                        break;
                    }
                    else {
                        var sortHRO = "C";
                    }
                }
                postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                count=count+1;
            }
            else if (postDB == "YES" && data[i].genCriteria == "YES" && parseFloat(data[i].jobGroup) < 22) {
                var dateRaised = formatDatee (new Date());
                var promStatus = "Criteria Met";
                var toPromote = "YES";
                var actionDate = "";
                var persArea = "";
                var empStatus = "";
                var annSalary = "";
                var geoZone = "";
                var salCurr = "";
                var gtsComm = "";
                var lgaText = "";
                var costCenter = "";
                var workRule = "";
                var gmReason = "";
                var mgrComment = "";
                var hrtReason = "";
                var mgrReason = "";
                var trackStatus = "C";
                var staffCat = "Mgr";
                for(var k = 0; k < rowDB["dept"].length; k++) {
                    if (data[i].dept == rowDB["dept"][k].dept) {
                        var sortHRO = rowDB["dept"][k].sortHRO;
                        break;
                    }
                    else {
                        var sortHRO = "C";
                    }
                }
                postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                count=count+1;
            }
            else if (postDB == "YES" && data[i].genCriteria == "NO" && parseFloat(data[i].jobGroup) < 19) {
                var dateRaised = formatDatee (new Date());
                var promStatus = "Criteria Not Met";
                var toPromote = "NO";
                var actionDate = "";
                var persArea = "";
                var empStatus = "";
                var annSalary = "";
                var geoZone = "";
                var salCurr = "";
                var gtsComm = "";
                var lgaText = "";
                var costCenter = "";
                var workRule = "";
                var gmReason = "";
                var mgrComment = "";
                var hrtReason = "";
                var mgrReason = "";
                var sortHRO = "";
                var trackStatus = "B";
                var staffCat = "Staff";
                for(var k = 0; k < rowDB["dept"].length; k++) {
                    if (data[i].dept == rowDB["dept"][k].dept) {
                        var sortHRO = rowDB["dept"][k].sortHRO;
                        break;
                    }
                    else {
                        var sortHRO = "";
                    }
                }
                postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                count=count+1;
            }
            else if (postDB == "YES" && data[i].genCriteria == "NO" && parseFloat(data[i].jobGroup) < 22) {
                var dateRaised = formatDatee (new Date());
                var promStatus = "Criteria Not Met";
                var toPromote = "NO";
                var actionDate = "";
                var persArea = "";
                var empStatus = "";
                var annSalary = "";
                var geoZone = "";
                var salCurr = "";
                var gtsComm = "";
                var lgaText = "";
                var costCenter = "";
                var workRule = "";
                var gmReason = "";
                var mgrComment = "";
                var hrtReason = "";
                var mgrReason = "";
                var sortHRO = "";
                var trackStatus = "B";
                var staffCat = "Mgr";
                for(var k = 0; k < rowDB["dept"].length; k++) {
                    if (data[i].dept == rowDB["dept"][k].dept) {
                        var sortHRO = rowDB["dept"][k].sortHRO;
                        break;
                    }
                    else {
                        var sortHRO = "";
                    }
                }
                postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                count=count+1;
            }
            else if (postDB == "YES") {
                var dateRaised = formatDatee (new Date());
                var promStatus = "Not Considered";
                var toPromote = "NA";
                var actionDate = "";
                var persArea = "";
                var empStatus = "";
                var annSalary = "";
                var geoZone = "";
                var salCurr = "";
                var gtsComm = "";
                var lgaText = "";
                var costCenter = "";
                var workRule = "";
                var gmReason = "";
                var mgrComment = "";
                var hrtReason = "";
                var mgrReason = "";
                var trackStatus = "A";
                var staffCat = "NA";
                for(var k = 0; k < rowDB["dept"].length; k++) {
                    if (data[i].dept == rowDB["dept"][k].dept) {
                        var sortHRO = rowDB["dept"][k].sortHRO;
                        break;
                    }
                    else {
                        var sortHRO = "";
                    }
                }
                postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                count=count+1;
            }
        }
        location.reload();
    }
    else if (rowDB["data"].length != 0 && rowDB["data"].length > data.length) {
        delDuplicates(0);
        location.reload();
    }
    else {
        if (rowDB["data"].length == data.length) {
            var cc = "";
            for(var m = 0; m < current["usersData"].length; m++) {
                if (current["usersData"][m].accessProfile == "HRT") {
                    var cc = cc + current["usersData"][m].userEmail + ', ';
                }
            }
            var to = current["user"] + '@nlng.com';
            var recipient = current["user"];
            var cc = 'Cc: ' + cc;
            var subject = "Promotion Database Uploaded";
            var txt = 'Dear ' + titleCase(recipient) + '\n\nThe database has been uploaded successfully.\n\nVisit the link below to proceed. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/criteriaMet.html ' + '\n\nRegards\nTalent Management';
            sendMail (to,subject,txt,cc)
            alert("All records have been uploaded to the database");
        }
    
        $("#hrt").on('mousedown', "#selectbasic", function(e) {
            e.stopPropagation();
        });

        var table = $('#hrt').DataTable({
            //"fixedHeader": { header: true,},
            deferLoading:true,
            "bPaginate": false,
            dom: 'Bf<"top"i>rt<"bottom"lp><"clear">',
            autoWidth: false,
            buttons: [
            ],
            "data": data,
            select:"single",
            "columns": [
                { "data": "persNo", title:"Pers. No." },
                { "data": "persName", title:"Personnel Name", width:"20%" },
                { "data": "empSubgroup", title:"Employee Subgroup", width:"15%" },
                { "data": "div", title:"Div" },
                { "data": "dept", title:"Dept" },
                { "data": "persPosition", title:"Position", width:"20%" },
                { "data": "refIndic", title:"Ref. Indic." },
                { "data": "psGroup", title:"Curr. SG" },
                { "data": "jobGroup", title:"Job Group" },
                { "data": "yr1IPF", title:"Yr1 IPF", render: approx },
                { "data": "yr2IPF", title:"Yr2 IPF", render: approx },
                { "data": "yr3IPF", title:"Yr3 IPF", render: approx },
                { "data": "avgIPF", title:"Avg IPF", render: approx },
                { "data": "headRoom", title:"Head Room" },
                { "data": "sbCriteria", title:"Meet A&P?", render: showAP },
                { "data": "lastCEP", title:"CEP" },
                { "data": "promYr", title:"Last Prom. Year" },
                { "data": "genCriteria", title:"Meet Criteria?" },
                //{ "data": "promStatus", title:"Status", width:"10%"  },
            ],
            columnDefs: [ 
                //{ type: 'date', 'targets': [17] },
                //{ "targets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ], "visible": false },
                { "bSortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ] }
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
                ],
            "order": [[3, 'asc'],[4, 'asc']],
        }); 
        
        if (rowCollection["access"] == "HRT") {
            $("#loading").hide();
            $("#loading2").hide();
            $('#homepage').show();
            $('#error').hide();
        }
        else {
            $("#loading").hide();
            $("#loading2").hide();
            $('#homepage').hide();
            $('#error').show();
        }
        
        $('#updateDB').click(function(){
                
            var count = 0;
            for(var i = 0; i < data.length; i++) {
                if (rowDB["data"].length == 0) {
                    var postDB = "YES";
                }
                else {
                    for(var j = 0; j < rowDB["data"].length; j++) {
                        if (parseFloat(data[i].persNo) == parseFloat(rowDB["data"][j].persNo)) {
                            var postDB = "NO";
                            break;
                        }
                        var postDB = "YES";
                    }
                }

                //if (postDB == "YES" && parseFloat(data[i].jobGroup) >= 22) {
                if ((postDB == "YES" && parseFloat(data[i].jobGroup) >= 22) || (postDB == "YES" && parseFloat(data[i].jobGroup) == 15 && data[i].empSubgroup == "NLNG XPostee Paid") || (postDB == "YES" && parseFloat(data[i].jobGroup) == 18 && data[i].empSubgroup == "NLNG XPostee Paid")) {
                    var dateRaised = formatDatee (new Date());
                    var promStatus = "Not Considered";
                    var toPromote = "NA";
                    var actionDate = "";
                    var persArea = "";
                    var empStatus = "";
                    var annSalary = "";
                    var geoZone = "";
                    var salCurr = "";
                    var gtsComm = "";
                    var lgaText = "";
                    var costCenter = "";
                    var workRule = "";
                    var gmReason = "";
                    var mgrComment = "";
                    var hrtReason = "";
                    var mgrReason = "";
                    var trackStatus = "A";
                    var staffCat = "NA";
                    for(var k = 0; k < rowDB["dept"].length; k++) {
                        if (data[i].dept == rowDB["dept"][k].dept) {
                            var sortHRO = rowDB["dept"][k].sortHRO;
                            break;
                        }
                        else {
                            var sortHRO = "";
                        }
                    }
                    postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                    count=count+1;
                }
                else if (postDB == "YES" && (data[i].empSubgroup != "NLNG Permanent Staff" && data[i].empSubgroup != "NLNG Secondee-NSML" && data[i].empSubgroup != "NLNG XPostee Paid" && data[i].empSubgroup != "NLNG XPostee Unpaid")) {
                    var dateRaised = formatDatee (new Date());
                    var promStatus = "Not Considered";
                    var toPromote = "NA";
                    var actionDate = "";
                    var persArea = "";
                    var empStatus = "";
                    var annSalary = "";
                    var geoZone = "";
                    var salCurr = "";
                    var gtsComm = "";
                    var lgaText = "";
                    var costCenter = "";
                    var workRule = "";
                    var gmReason = "";
                    var mgrComment = "";
                    var hrtReason = "";
                    var mgrReason = "";
                    var trackStatus = "A";
                    var staffCat = "NA";
                    for(var k = 0; k < rowDB["dept"].length; k++) {
                        if (data[i].dept == rowDB["dept"][k].dept) {
                            var sortHRO = rowDB["dept"][k].sortHRO;
                            break;
                        }
                        else {
                            var sortHRO = "";
                        }
                    }
                    postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                    count=count+1;
                }
                else if (postDB == "YES" && data[i].genCriteria == "YES" && parseFloat(data[i].jobGroup) < 19) {
                    var dateRaised = formatDatee (new Date());
                    var promStatus = "Criteria Met";
                    var toPromote = "YES";
                    var actionDate = "";
                    var persArea = "";
                    var empStatus = "";
                    var annSalary = "";
                    var geoZone = "";
                    var salCurr = "";
                    var gtsComm = "";
                    var lgaText = "";
                    var costCenter = "";
                    var workRule = "";
                    var gmReason = "";
                    var mgrComment = "";
                    var hrtReason = "";
                    var mgrReason = "";
                    var trackStatus = "C";
                    var staffCat = "Staff";
                    for(var k = 0; k < rowDB["dept"].length; k++) {
                        if (data[i].dept == rowDB["dept"][k].dept) {
                            var sortHRO = rowDB["dept"][k].sortHRO;
                            break;
                        }
                        else {
                            var sortHRO = "C";
                        }
                    }
                    postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                    count=count+1;
                }
                else if (postDB == "YES" && data[i].genCriteria == "YES" && parseFloat(data[i].jobGroup) < 22) {
                    var dateRaised = formatDatee (new Date());
                    var promStatus = "Criteria Met";
                    var toPromote = "YES";
                    var actionDate = "";
                    var persArea = "";
                    var empStatus = "";
                    var annSalary = "";
                    var geoZone = "";
                    var salCurr = "";
                    var gtsComm = "";
                    var lgaText = "";
                    var costCenter = "";
                    var workRule = "";
                    var gmReason = "";
                    var mgrComment = "";
                    var hrtReason = "";
                    var mgrReason = "";
                    var trackStatus = "C";
                    var staffCat = "Mgr";
                    for(var k = 0; k < rowDB["dept"].length; k++) {
                        if (data[i].dept == rowDB["dept"][k].dept) {
                            var sortHRO = rowDB["dept"][k].sortHRO;
                            break;
                        }
                        else {
                            var sortHRO = "C";
                        }
                    }
                    postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                    count=count+1;
                }
                else if (postDB == "YES" && data[i].genCriteria == "NO" && parseFloat(data[i].jobGroup) < 19) {
                    var dateRaised = formatDatee (new Date());
                    var promStatus = "Criteria Not Met";
                    var toPromote = "NO";
                    var actionDate = "";
                    var persArea = "";
                    var empStatus = "";
                    var annSalary = "";
                    var geoZone = "";
                    var salCurr = "";
                    var gtsComm = "";
                    var lgaText = "";
                    var costCenter = "";
                    var workRule = "";
                    var gmReason = "";
                    var mgrComment = "";
                    var hrtReason = "";
                    var mgrReason = "";
                    var sortHRO = "";
                    var trackStatus = "B";
                    var staffCat = "Staff";
                    for(var k = 0; k < rowDB["dept"].length; k++) {
                        if (data[i].dept == rowDB["dept"][k].dept) {
                            var sortHRO = rowDB["dept"][k].sortHRO;
                            break;
                        }
                        else {
                            var sortHRO = "";
                        }
                    }
                    postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                    count=count+1;
                }
                else if (postDB == "YES" && data[i].genCriteria == "NO" && parseFloat(data[i].jobGroup) < 22) {
                    var dateRaised = formatDatee (new Date());
                    var promStatus = "Criteria Not Met";
                    var toPromote = "NO";
                    var actionDate = "";
                    var persArea = "";
                    var empStatus = "";
                    var annSalary = "";
                    var geoZone = "";
                    var salCurr = "";
                    var gtsComm = "";
                    var lgaText = "";
                    var costCenter = "";
                    var workRule = "";
                    var gmReason = "";
                    var mgrComment = "";
                    var hrtReason = "";
                    var mgrReason = "";
                    var sortHRO = "";
                    var trackStatus = "B";
                    var staffCat = "Mgr";
                    for(var k = 0; k < rowDB["dept"].length; k++) {
                        if (data[i].dept == rowDB["dept"][k].dept) {
                            var sortHRO = rowDB["dept"][k].sortHRO;
                            break;
                        }
                        else {
                            var sortHRO = "";
                        }
                    }
                    postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                    count=count+1;
                }
                else if (postDB == "YES" && parseFloat(data[i].jobGroup) < 19) {
                    var dateRaised = formatDatee (new Date());
                    var promStatus = "Not Considered";
                    var toPromote = "NA";
                    var actionDate = "";
                    var persArea = "";
                    var empStatus = "";
                    var annSalary = "";
                    var geoZone = "";
                    var salCurr = "";
                    var gtsComm = "";
                    var lgaText = "";
                    var costCenter = "";
                    var workRule = "";
                    var gmReason = "";
                    var mgrComment = "";
                    var hrtReason = "";
                    var mgrReason = "";
                    var trackStatus = "A";
                    var staffCat = "Staff";
                    for(var k = 0; k < rowDB["dept"].length; k++) {
                        if (data[i].dept == rowDB["dept"][k].dept) {
                            var sortHRO = rowDB["dept"][k].sortHRO;
                            break;
                        }
                        else {
                            var sortHRO = "";
                        }
                    }
                    postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                    count=count+1;
                }
                else if (postDB == "YES" && parseFloat(data[i].jobGroup) < 22) {
                    var dateRaised = formatDatee (new Date());
                    var promStatus = "Not Considered";
                    var toPromote = "NA";
                    var actionDate = "";
                    var persArea = "";
                    var empStatus = "";
                    var annSalary = "";
                    var geoZone = "";
                    var salCurr = "";
                    var gtsComm = "";
                    var lgaText = "";
                    var costCenter = "";
                    var workRule = "";
                    var gmReason = "";
                    var mgrComment = "";
                    var hrtReason = "";
                    var mgrReason = "";
                    var trackStatus = "A";
                    var staffCat = "Mgr";
                    for(var k = 0; k < rowDB["dept"].length; k++) {
                        if (data[i].dept == rowDB["dept"][k].dept) {
                            var sortHRO = rowDB["dept"][k].sortHRO;
                            break;
                        }
                        else {
                            var sortHRO = "";
                        }
                    }
                    postDb(actionDate,dateRaised,data[i].persName,data[i].empGroup,data[i].persNo,data[i].empSubgroup,persArea,data[i].dept,data[i].persPosition,data[i].div,data[i].psGroup,data[i].headRoom,data[i].refIndic,data[i].jobGroup,data[i].avgIPF,data[i].newSG,data[i].yr1IPF,data[i].lastCEP,data[i].yr2IPF,data[i].headrmCriteria,data[i].yr3IPF,data[i].genCriteria,data[i].promYr,data[i].ipfCriteria,data[i].yrsOnSG,promStatus,data[i].dateEmployed,data[i].promYrCriteria,data[i].genderKey,data[i].persNation,data[i].maritalStatus,data[i].persState,data[i].actionType,data[i].relDenom,data[i].empAge,data[i].actionReason,empStatus,annSalary,data[i].empYears,data[i].birthDate,geoZone,data[i].noCh,data[i].geoLoc,salCurr,gtsComm,lgaText,data[i].pArea,costCenter,workRule,data[i].costCtr,gmReason,mgrComment,toPromote,hrtReason,data[i].sbCriteria,mgrReason,sortHRO,data[i].sConsider,trackStatus,staffCat);
                    count=count+1;
                }
            }
            var cc = "";
            for(var m = 0; m < current["usersData"].length; m++) {
                if (current["usersData"][m].accessProfile == "HRT") {
                    var cc = cc + current["usersData"][m].userEmail + ', ';
                }
            }
            var to = current["user"] + '@nlng.com';
            var recipient = current["user"];
            var cc = 'Cc: ' + cc;
            var subject = "Promotion Database Uploaded";
            var txt = 'Dear ' + titleCase(recipient) + '\n\nThe database has been uploaded successfully.\n\nVisit the link  below to proceed. \n\n' + 'http://wapp-bny.nlng.net/datacentric/promotion/criteriaMet.html' + '\n\nRegards\nTalent Management';

            if (count == 0) {
                alert("No records were uploaded")
            }
            else {
                sendMail (to,subject,txt,cc)
                alert(count + " Records have been processed for upload to database");
                location.reload();
            }
        });
    }
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

function getHRO(dept){
    if (dept == "PO"||dept == "PC"||dept == "PDE"||dept == "PS"||dept == "PT") {
        return "HRO12";
    }
    else if (dept == "PG"||dept == "PI"||dept == "PM") {
        return "HRO13";
    }
    else if (dept == "CSS"||dept == "CAA"||dept == "CPL"||dept == "HSE") {
        return "HRO21";
    }
    else if (dept == 'BIM'||dept == 'ERC'||dept == 'ERG'||dept == 'ERG'||dept == 'ERN'||dept == 'ERP'||dept == 'FNB'||dept == 'FNC'||dept == 'FNL'||dept == 'FNL'||dept == 'FNR'||dept == 'FNS'||dept == 'FNT'||dept == 'HRE'||dept == 'HRL'||dept == 'HRL'||dept == 'HRO'||dept == 'HRO'||dept == 'HRT'||dept == 'LGS'||dept == 'LGT') {
        return "HRO22";
    }
    else if (dept == 'ESD'||dept == 'ESD'||dept == 'IMT'||dept == 'LSS'||dept == 'CPM') {
        return "HRO23";
    }
    else if (dept == 'ECO'||dept == 'TE'||dept == 'TF'||dept == 'TI'||dept == 'NTP') {
        return "HRO31";
    }
    else if (dept == 'CMA'||dept == 'CMB'||dept == 'CMM'||dept == 'CMP'||dept == 'CMP'||dept == 'CMS'||dept == 'SGA') {
        return "HRO32";
    }
    else if (dept == 'TP') {
        return "HRO33";
    }
    else {
        return "";
    }
}