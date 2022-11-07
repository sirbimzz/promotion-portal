<?php 

include 'config/conn.php';

$id=$_POST['id'];

$sql = "WITH cte AS (
	SELECT[persName], [persNo], 
	row_number() OVER(PARTITION BY persName, persNo ORDER BY persNo) AS [rn]
  	FROM promData
	)
	DELETE cte WHERE [rn] > 1";

if ($conn->query( $sql )) {
	echo json_encode(array("statusCode"=>200));
} 
else {
	echo json_encode(array("statusCode"=>201));
}

?>