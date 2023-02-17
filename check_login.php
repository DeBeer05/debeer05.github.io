<?php

include_once 'config.php';
include 'dbConfig.php';

$username = $_POST["username"];
$password = $_POST["password"];

// Connect to the MariaDB database

// Check if the user is already logged in


// Check if the username and password match the ones stored in the database
$result = mysqli_query($db, "SELECT * FROM users WHERE username='$username' AND password='$password'");
if (mysqli_num_rows($result) > 0) {
  $_SESSION['logged_in'] = true;
  echo "1";
} else {
  echo "0";
}

// Close the connection
mysqli_close($db);
?>
