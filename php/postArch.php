<?php 

include 'config/conn.php';

//$id=$_POST['id'];
$id=$_POST['id'];

$sql = "INSERT INTO promArchive (actionDate,dateRaised,persName,empGroup,persNo,empSubgroup,persArea,orgUnit,persPosition,persSubarea,psGroup,headRoom,refIndic,jobGroup,avgIPF,newSG,yr1IPF,lastCep,yr2IPF,headrmCriteria,yr3IPF,genCriteria,promYr,ipfCriteria,yrsOnSG,promStatus,dateEmployed,promYrCriteria,genderKey,persNation,maritalStatus,persState,actionType,relDenom,empAge,actionReason,empStatus,annSalary,empYears,birthDate,geoZone,noCh,geoLoc,salCurr,gtsComm,lgaText,pArea,costCenter,workRule,costCtr,gmReason,mgrComment,toPromote,hrtReason,sbCriteria,mgrReason,sortHRO,sConsider,trackStatus,staffCat,currYr)
SELECT actionDate,dateRaised,persName,empGroup,persNo,empSubgroup,persArea,orgUnit,persPosition,persSubarea,psGroup,headRoom,refIndic,jobGroup,avgIPF,newSG,yr1IPF,lastCep,yr2IPF,headrmCriteria,yr3IPF,genCriteria,promYr,ipfCriteria,yrsOnSG,promStatus,dateEmployed,promYrCriteria,genderKey,persNation,maritalStatus,persState,actionType,relDenom,empAge,actionReason,empStatus,annSalary,empYears,birthDate,geoZone,noCh,geoLoc,salCurr,gtsComm,lgaText,pArea,costCenter,workRule,costCtr,gmReason,mgrComment,toPromote,hrtReason,sbCriteria,mgrReason,sortHRO,sConsider,trackStatus,staffCat,currYr
FROM promData";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>