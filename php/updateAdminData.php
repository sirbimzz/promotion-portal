<?php 

include 'config/conn.php';

$id=$_POST['id'];
$persNo=$_POST['persNo'];
$persName=$_POST['persName'];
$empSubgroup=$_POST['empSubgroup'];
$persSubarea=$_POST['persSubarea'];
$orgUnit=$_POST['orgUnit'];
$persPosition=$_POST['persPosition'];
$refIndic=$_POST['refIndic'];
$psGroup=$_POST['psGroup'];
$jobGroup=$_POST['jobGroup'];
$avgIPF=$_POST['avgIPF'];
$headRoom=$_POST['headRoom'];
$sbCriteria=$_POST['sbCriteria'];
$lastCep=$_POST['lastCep'];
$promYr=$_POST['promYr'];
$genCriteria=$_POST['genCriteria'];
$sConsider=$_POST['sConsider'];
$promStatus=$_POST['promStatus'];
$toPromote=$_POST['toPromote'];
$sortHRO=$_POST['sortHRO'];
$trackStatus=$_POST['trackStatus'];
$mgrComment=$_POST['mgrComment'];
$mgrReason=$_POST['mgrReason'];
$hrtReason=$_POST['hrtReason'];
$gmReason=$_POST['gmReason'];

$sql = "UPDATE promData

SET persNo='$persNo',
persName='$persName',
empSubgroup='$empSubgroup',
persSubarea='$persSubarea',
orgUnit='$orgUnit',
persPosition='$persPosition',
refIndic='$refIndic',
psGroup='$psGroup',
jobGroup='$jobGroup',
avgIPF='$avgIPF',
headRoom='$headRoom',
sbCriteria='$sbCriteria',
lastCep='$lastCep',
promYr='$promYr',
genCriteria='$genCriteria',
sConsider='$sConsider',
promStatus='$promStatus',
toPromote='$toPromote',
sortHRO='$sortHRO',
trackStatus='$trackStatus',
mgrComment='$mgrComment',
mgrReason='$mgrReason',
hrtReason='$hrtReason',
gmReason='$gmReason' WHERE id=$id";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>