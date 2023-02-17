<?php
// Connect to the MySQL database
include_once 'config.php';
include 'dbConfig.php';

// Get the ID of the row to remove from the POST data
$id = $_POST['id'];

// Create a prepared statement to remove the row from the database
$stmt = $db->prepare("DELETE FROM extra WHERE id = ?");
$stmt->bind_param("i", $id);

// Execute the prepared statement
if ($stmt->execute()) {
  // Return a success message
  http_response_code(200);
} else {
  // Return an error message
  http_response_code(500);
}

// Close the prepared statement and the database connection
$stmt->close();
$db->close();
?>
