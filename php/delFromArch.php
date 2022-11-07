<?php 

include 'config/conn.php';

$currYr=$_POST['currYr'];
$sql = "DELETE FROM promArchive WHERE currYr='$currYr'";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>