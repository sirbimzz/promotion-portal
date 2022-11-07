<?php 

include 'config/conn.php';

//$id=$_POST['id'];
$dateRaised=$_POST['dateRaised'];
$fullName=$_POST['fullName'];
$userName=$_POST['userName'];
$userEmail=$_POST['userEmail'];
$userDept=$_POST['userDept'];
$userDiv=$_POST['userDiv'];
$accessProfile=$_POST['accessProfile'];
$adminUser=$_POST['adminUser'];
$sortHRO=$_POST['sortHRO'];

$sql = "INSERT INTO promUsers 
VALUES ('$dateRaised','$fullName','$userName','$userEmail','$userDept','$userDiv','$accessProfile','$adminUser','$sortHRO')";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>