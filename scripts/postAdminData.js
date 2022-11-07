function postUser (dateRaised,fullName,userName,userEmail,userDept,userDiv,accessProfile,adminUser,sortHRO) {
    $.ajax({
        url: "php/postUser.php",
        type: "POST",
        cache: false,
        data: {
            dateRaised: dateRaised,
            userName: userName,
            fullName: fullName,
            userEmail: userEmail,
            userDept: userDept,
            userDiv: userDiv,
            accessProfile: accessProfile,
            adminUser: adminUser,
            sortHRO: sortHRO                           
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

function updateUser (id,dateRaised,fullName,userName,userEmail,userDept,userDiv,accessProfile,adminUser,sortHRO) {
    $.ajax({
        url: "php/updateUser.php",
        type: "POST",
        cache: false,
        data: {
            id: id,
            dateRaised: dateRaised,
            userName: userName,
            fullName: fullName,
            userEmail: userEmail,
            userDept: userDept,
            userDiv: userDiv,
            accessProfile: accessProfile,
            adminUser: adminUser,
            sortHRO: sortHRO                          
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

function updateDB (id,persNo,persName,empSubgroup,persSubarea,orgUnit,persPosition,refIndic,psGroup,jobGroup,avgIPF,headRoom,sbCriteria,lastCep,promYr,genCriteria,sConsider,promStatus,toPromote,sortHRO,trackStatus,mgrComment,mgrReason,hrtReason,gmReason) {
    $.ajax({
        url: "php/updateAdminData.php",
        type: "POST",
        cache: false,
        data: {
            id: id,
            persNo: persNo,
            persName: persName,
            empSubgroup: empSubgroup,
            persSubarea: persSubarea,
            orgUnit: orgUnit,
            persPosition: persPosition,
            refIndic: refIndic,
            psGroup: psGroup,
            jobGroup: jobGroup,
            avgIPF: avgIPF,
            headRoom: headRoom,
            sbCriteria: sbCriteria,
            lastCep: lastCep,
            promYr: promYr,
            genCriteria: genCriteria,
            sConsider: sConsider,
            promStatus: promStatus,
            toPromote: toPromote,
            sortHRO: sortHRO,
            trackStatus: trackStatus,
            mgrComment: mgrComment,
            mgrReason: mgrReason,
            hrtReason: hrtReason,
            gmReason: gmReason                          
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

function postLog (dateRaised,fUpdated,vUpdated,updatedBy,sUpdated) {
    $.ajax({
        url: "php/postLog.php",
        type: "POST",
        cache: false,
        data: {
            dateRaised: dateRaised,
            fUpdated: fUpdated,
            vUpdated: vUpdated,
            updatedBy: updatedBy,
            sUpdated: sUpdated                           
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

function deleteUser(id) {
    $.ajax({
        url: "php/deleteUser.php",
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