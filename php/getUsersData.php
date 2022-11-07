<?php 
include 'config/conn.php';

$query = 'SELECT * FROM promUsers';   
$stmt = $conn->query( $query );   
$data = array();
while ( $row = $stmt->fetch( PDO::FETCH_ASSOC ) ){ 
  $row_array['id'] = $row['id'];
  $row_array['dateRaised'] = $row['dateRaised'];
  $row_array['fullName'] = $row['fullName'];
  $row_array['userName'] = $row['userName'];
  $row_array['userEmail'] = $row['userEmail'];
  $row_array['userDept'] = $row['userDept'];  
  $row_array['userDiv'] = $row['userDiv'];  
  $row_array['accessProfile'] = $row['accessProfile'];
  $row_array['adminUser'] = $row['adminUser'];
  $row_array['sortHRO'] = $row['sortHRO'];  
  
  array_push($data, $row_array);
}
echo json_encode($data);


?>