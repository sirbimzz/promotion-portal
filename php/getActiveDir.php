<?php 
include 'config/conn.php';

$query = 'SELECT * FROM activeDir';   
$stmt = $conn->query( $query );   
$data = array();
while ( $row = $stmt->fetch( PDO::FETCH_ASSOC ) ){ 
  $row_array['id'] = $row['id'];
  $row_array['userName'] = $row['userName'];
  $row_array['firstName'] = $row['firstName'];
  $row_array['lastName'] = $row['lastName'];
  $row_array['fullName'] = $row['fullName'];
  $row_array['userDept'] = $row['userDept']; 
  $row_array['userEmail'] = $row['userEmail']; 
  
  array_push($data, $row_array);
}
echo json_encode($data);


?>