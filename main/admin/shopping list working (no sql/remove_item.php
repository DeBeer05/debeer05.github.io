<?php
include_once 'config.php';
include 'dbConfig.php';

$itemId = $_POST['itemId'];
    
// Build the query to delete the item from the database
$sql = "DELETE FROM items WHERE id=$itemId";

// Execute the query and check for errors
if ($db->query($sql) === TRUE) {
    echo "Item deleted successfully";
} else {
    echo "Error deleting item: " . $db->error;
}

// Close the database connection
$db->close();
?>
?>