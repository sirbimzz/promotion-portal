<?php 

include 'config/conn.php';

//$id=$_POST['id'];
$actionDate=$_POST['actionDate'];
$dateRaised=$_POST['dateRaised'];
$persName=$_POST['persName'];
$empGroup=$_POST['empGroup'];
$persNo=$_POST['persNo'];
$empSubgroup=$_POST['empSubgroup'];
$persArea=$_POST['persArea'];
$orgUnit=$_POST['orgUnit'];
$persPosition=$_POST['persPosition'];
$persSubarea=$_POST['persSubarea'];
$psGroup=$_POST['psGroup'];
$headRoom=$_POST['headRoom'];
$refIndic=$_POST['refIndic'];
$jobGroup=$_POST['jobGroup'];
$avgIPF=$_POST['avgIPF'];
$newSG=$_POST['newSG'];
$yr1IPF=$_POST['yr1IPF'];
$lastCep=$_POST['lastCep'];
$yr2IPF=$_POST['yr2IPF'];
$headrmCriteria=$_POST['headrmCriteria'];
$yr3IPF=$_POST['yr3IPF'];
$genCriteria=$_POST['genCriteria'];
$promYr=$_POST['promYr'];
$ipfCriteria=$_POST['ipfCriteria'];
$yrsOnSG=$_POST['yrsOnSG'];
$promStatus=$_POST['promStatus'];
$dateEmployed=$_POST['dateEmployed'];
$promYrCriteria=$_POST['promYrCriteria'];
$genderKey=$_POST['genderKey'];
$persNation=$_POST['persNation'];
$maritalStatus=$_POST['maritalStatus'];
$persState=$_POST['persState'];
$actionType=$_POST['actionType'];
$relDenom=$_POST['relDenom'];
$empAge=$_POST['empAge'];
$actionReason=$_POST['actionReason'];
$empStatus=$_POST['empStatus'];
$annSalary=$_POST['annSalary'];
$empYears=$_POST['empYears'];
$birthDate=$_POST['birthDate'];
$geoZone=$_POST['geoZone'];
$noCh=$_POST['noCh'];
$geoLoc=$_POST['geoLoc'];
$salCurr=$_POST['salCurr'];
$gtsComm=$_POST['gtsComm'];
$lgaText=$_POST['lgaText'];
$pArea=$_POST['pArea'];
$costCenter=$_POST['costCenter'];
$workRule=$_POST['workRule'];
$costCtr=$_POST['costCtr'];
$gmReason=$_POST['gmReason'];
$mgrComment=$_POST['mgrComment'];
$toPromote=$_POST['toPromote'];
$hrtReason=$_POST['hrtReason'];
$sbCriteria=$_POST['sbCriteria'];
$mgrReason=$_POST['mgrReason'];
$sortHRO=$_POST['sortHRO'];
$sConsider=$_POST['sConsider'];
$trackStatus=$_POST['trackStatus'];
$staffCat=$_POST['staffCat'];

$sql = "INSERT INTO promData 
VALUES ('$actionDate','$dateRaised','$persName','$empGroup','$persNo','$empSubgroup','$persArea','$orgUnit','$persPosition','$persSubarea','$psGroup','$headRoom','$refIndic','$jobGroup','$avgIPF','$newSG','$yr1IPF','$lastCep','$yr2IPF','$headrmCriteria','$yr3IPF','$genCriteria','$promYr','$ipfCriteria','$yrsOnSG','$promStatus','$dateEmployed','$promYrCriteria','$genderKey','$persNation','$maritalStatus','$persState','$actionType','$relDenom','$empAge','$actionReason','$empStatus','$annSalary','$empYears','$birthDate','$geoZone','$noCh','$geoLoc','$salCurr','$gtsComm','$lgaText','$pArea','$costCenter','$workRule','$costCtr','$gmReason','$mgrComment','$toPromote','$hrtReason','$sbCriteria','$mgrReason','$sortHRO','$sConsider','$trackStatus','$staffCat','$currYr')";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>