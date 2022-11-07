<?php 

include 'config/conn.php';

$currYr=$_POST['currYr'];

$sql = "UPDATE promData

SET currYr='$currYr'";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>