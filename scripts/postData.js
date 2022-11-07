function postDb (actionDate,dateRaised,persName,empGroup,persNo,empSubgroup,persArea,orgUnit,persPosition,persSubarea,psGroup,headRoom,refIndic,jobGroup,avgIPF,newSG,yr1IPF,lastCep,yr2IPF,headrmCriteria,yr3IPF,genCriteria,promYr,ipfCriteria,yrsOnSG,promStatus,dateEmployed,promYrCriteria,genderKey,persNation,maritalStatus,persState,actionType,relDenom,empAge,actionReason,empStatus,annSalary,empYears,birthDate,geoZone,noCh,geoLoc,salCurr,gtsComm,lgaText,pArea,costCenter,workRule,costCtr,gmReason,mgrComment,toPromote,hrtReason,sbCriteria,mgrReason,sortHRO,sConsider,trackStatus,staffCat,currYr) {
    $.ajax({
        url: "php/postData.php",
        type: "POST",
        data: {
            //id: id,
            actionDate: actionDate,
            dateRaised: dateRaised,
            persName: persName,
            empGroup: empGroup,
            persNo: persNo,
            empSubgroup: empSubgroup,
            persArea: persArea,
            orgUnit: orgUnit,
            persPosition: persPosition,
            persSubarea: persSubarea,
            psGroup: psGroup,
            headRoom: headRoom,
            refIndic: refIndic,
            jobGroup: jobGroup,
            avgIPF: avgIPF,
            newSG: newSG,
            yr1IPF: yr1IPF,
            lastCep: lastCep,
            yr2IPF: yr2IPF,
            headrmCriteria: headrmCriteria,
            yr3IPF: yr3IPF,
            genCriteria: genCriteria,
            promYr: promYr,
            ipfCriteria: ipfCriteria,
            yrsOnSG: yrsOnSG,
            promStatus: promStatus,
            dateEmployed: dateEmployed,
            promYrCriteria: promYrCriteria,
            genderKey: genderKey,
            persNation: persNation,
            maritalStatus: maritalStatus,
            persState: persState,
            actionType: actionType,
            relDenom: relDenom,
            empAge: empAge,
            actionReason: actionReason,
            empStatus: empStatus,
            annSalary: annSalary,
            empYears: empYears,
            birthDate: birthDate,
            geoZone: geoZone,
            noCh: noCh,
            geoLoc: geoLoc,
            salCurr: salCurr,
            gtsComm: gtsComm,
            lgaText: lgaText,
            pArea: pArea,
            costCenter: costCenter,
            workRule: workRule,
            costCtr: costCtr,
            gmReason: gmReason,
            mgrComment: mgrComment,
            toPromote: toPromote,
            hrtReason: hrtReason,
            sbCriteria: sbCriteria,
            mgrReason: mgrReason,
            sortHRO: sortHRO,
            sConsider: sConsider,
            trackStatus: trackStatus,
            staffCat: staffCat,  
            currYr: currYr                            
        },
        cache: false,
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record submitted successfully!"); 					
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not submitted.");
            }
            
        }
    });
}

function updateDb (id,dateRaised,promStatus,mgrComment,gmReason,hrtReason,toPromote,mgrReason,trackStatus) {
    $.ajax({
        url: "php/updateData.php",
        type: "POST",
        cache: false,
        data: {
            id: id,
            dateRaised: dateRaised,
            promStatus: promStatus,
            mgrComment: mgrComment,
            gmReason: gmReason,
            hrtReason: hrtReason,
            toPromote: toPromote,
            mgrReason: mgrReason,
            trackStatus: trackStatus                            
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record updated successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not updated.");
            }
            
        }
    });
}

function updateStatus (promStatus1,promStatus,toPromote,trackStatus) {
    $.ajax({
        url: "php/updateStatus.php",
        type: "POST",
        cache: false,
        data: {
            promStatus1: promStatus1,
            promStatus: promStatus,
            toPromote: toPromote,
            trackStatus: trackStatus                            
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record updated successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not updated.");
            }
            
        }
    });
}

function mgrApproveRow (orgUnit,staffCat,genCriteria,promStatus1,promStatus,toPromote,trackStatus) {
    $.ajax({
        url: "php/mgrApprove.php",
        type: "POST",
        cache: false,
        data: {
            orgUnit: orgUnit,
            staffCat: staffCat,
            genCriteria: genCriteria,
            promStatus1: promStatus1,
            promStatus: promStatus,
            toPromote: toPromote,
            trackStatus: trackStatus                            
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record updated successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not updated.");
            }
            
        }
    });
}

function gmApproveRow (persSubarea,staffCat,genCriteria,promStatus1,promStatus,toPromote,trackStatus) {
    $.ajax({
        url: "php/gmApprove.php",
        type: "POST",
        cache: false,
        data: {
            persSubarea: persSubarea,
            staffCat: staffCat,
            genCriteria: genCriteria,
            promStatus1: promStatus1,
            promStatus: promStatus,
            toPromote: toPromote,
            trackStatus: trackStatus                            
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record updated successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not updated.");
            }
            
        }
    });
}

function hroApproveRow (sortHRO,genCriteria,promStatus1,promStatus,toPromote,trackStatus) {
    $.ajax({
        url: "php/hroApprove.php",
        type: "POST",
        cache: false,
        data: {
            sortHRO: sortHRO,
            genCriteria: genCriteria,
            promStatus1: promStatus1,
            promStatus: promStatus,
            toPromote: toPromote,
            trackStatus: trackStatus                            
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record updated successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not updated.");
            }
            
        }
    });
}

function hroApproveRow2 (sortHRO,promStatus1,promStatus,toPromote,trackStatus) {
    $.ajax({
        url: "php/hroApprove2.php",
        type: "POST",
        cache: false,
        data: {
            sortHRO: sortHRO,
            promStatus1: promStatus1,
            promStatus: promStatus,
            toPromote: toPromote,
            trackStatus: trackStatus                            
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record updated successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not updated.");
            }
            
        }
    });
}

function hrtApproveRow (genCriteria,promStatus1,promStatus,toPromote,trackStatus) {
    $.ajax({
        url: "php/hrtApprove.php",
        type: "POST",
        cache: false,
        data: {
            genCriteria: genCriteria,
            promStatus1: promStatus1,
            promStatus: promStatus,
            toPromote: toPromote,
            trackStatus: trackStatus                            
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record updated successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not updated.");
            }
            
        }
    });
}

function hrtApproveRow2 (promStatus1,promStatus,toPromote,trackStatus) {
    $.ajax({
        url: "php/hrtApprove2.php",
        type: "POST",
        cache: false,
        data: {
            promStatus1: promStatus1,
            promStatus: promStatus,
            toPromote: toPromote,
            trackStatus: trackStatus                            
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record updated successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not updated.");
            }
            
        }
    });
}

function updateCurrYr(currYr) {
    $.ajax({
        url: "php/updateCurrYr.php",
        type: "POST",
        cache: false,
        data:{
            currYr: currYr
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Year updated successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Year was not updated.");
            }
            
        }
    });
}

function postArch(id) {
    $.ajax({
        url: "php/postArch.php",
        type: "POST",
        cache: false,
        data:{
            id: id
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record submitted to Archive successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not submited to Archive.");
            }
            
        }
    });
}

function deleteData(id) {
    $.ajax({
        url: "php/deleteData.php",
        type: "POST",
        cache: false,
        data:{
            id: id
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record deleted successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not deleted.");
            }
            
        }
    });
}

function delDuplicates(id) {
    $.ajax({
        url: "php/delDuplicates.php",
        type: "POST",
        cache: false,
        data:{
            id: id
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Record deleted successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not deleted.");
            }
            
        }
    });
}

function delFromArch(currYr) {
    $.ajax({
        url: "php/delFromArch.php",
        type: "POST",
        cache: false,
        data:{
            currYr: currYr
        },
        success: function(dataResult){
            var dataResult = JSON.parse(dataResult);
            if(dataResult.statusCode==200){
                console.log("Records deleted from Archive successfully!"); 						
            }
            else if(dataResult.statusCode==201){
               console.log("Error occured! Record was not deleted from Archive.");
            }
            
        }
    });
}
