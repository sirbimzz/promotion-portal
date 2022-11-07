<?php 

include 'config/conn.php';

$id=$_POST['id'];
$dateRaised=$_POST['dateRaised'];
$fullName=$_POST['fullName'];
$userName=$_POST['userName'];
$userEmail=$_POST['userEmail'];
$userDept=$_POST['userDept'];
$userDiv=$_POST['userDiv'];
$accessProfile=$_POST['accessProfile'];
$adminUser=$_POST['adminUser'];
$sortHRO=$_POST['sortHRO'];

$sql = "UPDATE promUsers

SET dateRaised ='$dateRaised',
fullName='$fullName',
userName='$userName',
userEmail='$userEmail',
userDept='$userDept',
userDiv='$userDiv',
accessProfile='$accessProfile',
adminUser='$adminUser',
sortHRO='$sortHRO' WHERE id=$id";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>