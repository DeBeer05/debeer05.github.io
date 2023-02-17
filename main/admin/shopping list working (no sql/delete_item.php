
<?php
// Include the database configuration
include 'dbConfig.php';
include 'config.php';

// Get the item ID from the GET data
$itemId = $_GET['id'];

// Delete the item from the database
$sql = "DELETE FROM items WHERE id = ?";
$stmt = $db->prepare($sql);
$stmt->bind_param("i", $itemId);
if ($stmt->execute()) {
    // If the delete was successful, send a success response
    http_response_code(200);
    echo "Item deleted successfully";
} else {
    // If the delete failed, send an error response
    http_response_code(500);
    echo "Failed to delete item: " . $db->error;
}

// Close the prepared statement and database connection
$stmt->close();
$db->close();
