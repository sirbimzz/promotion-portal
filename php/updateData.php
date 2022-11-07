<?php 

include 'config/conn.php';

$id=$_POST['id'];
$dateRaised=$_POST['dateRaised'];
$promStatus=$_POST['promStatus'];
$mgrComment=$_POST['mgrComment'];
$gmReason=$_POST['gmReason'];
$hrtReason=$_POST['hrtReason'];
$toPromote=$_POST['toPromote'];
$mgrReason=$_POST['mgrReason'];
$trackStatus=$_POST['trackStatus'];

$sql = "UPDATE promData

SET dateRaised ='$dateRaised',
promStatus='$promStatus',
mgrComment='$mgrComment',
gmReason='$gmReason',
hrtReason='$hrtReason',
toPromote='$toPromote',
mgrReason='$mgrReason',
trackStatus='$trackStatus' WHERE id=$id";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>