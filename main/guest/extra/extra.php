<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MySQL Table Example</title>
    <link rel="stylesheet" href="style.css">
</head>
<button class="button-primary" name="extra" onclick="window.location.href='../guest.php'">Terug naar daglijsten</button> <input class="button-secondary" name = "sign-out" type="button" value="Uitloggen" onclick="signOut()">


<body>

<?php
include_once 'config.php';
include 'dbConfig.php';

// Query database for data
$sql = "SELECT * FROM extra ";
$result = $db->query($sql);
?>
<div class="table-container">

<table>
  
    <tr>
        <th>Naam</th>
        <th>Hoeveelheid</th>
       
        
        
    </tr>

    <?php while($row = $result->fetch_assoc()): ?>
  <tr>
    <td class="data-item-name">
    <div class='item' data-id='<?php echo $row["id"]; ?>' data-name='<?php echo $row["item_name"]; ?>' data-quantity='<?php echo $row["quantity"]; ?>' data-day-name='<?php echo $row["day_name"]; ?>'><?php echo $row['item_name']; ?></div>
    </td>
    <td class="data-quantity"><?php echo $row['quantity']; ?></td>
    
   
  </tr>
<?php endwhile; ?>
  
</table>


 
     
    </div>
  
<script>
function signOut() {
    // Destroy the current session
    sessionStorage.clear();
    // Redirect to the login page
    window.location.replace("/index.html");
  }
  












</script>

<?php
// Close MySQL connection
 $db->close();
?>

</script>


</body>
</html>
