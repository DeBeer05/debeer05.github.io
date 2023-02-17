 




<style>
    /* Form styling */
    .form {
        max-width: 500px;
        margin: 22px auto;
        padding: 30px;
        background-color: #f2f2f2;
        border-radius: 10px;
        box-shadow: 0px 0px 20px #bbbbbb;
        position: relative;
        top:140px;
        
    }
    .form-group {
    text-align: center;
  }

    /* Form title styling */
    .form-group label {
        font-weight: bold;
        margin-bottom: 10px;
        display: block;
    }
    
    /* Input field styling */
    .form-control {
        padding: 10px;
        width: 100%;
        border-radius: 5px;
        border: 1px solid #dddddd;
        box-sizing: border-box;
        margin-bottom: 20px;
    }
    .form-control.btn-primary {
    display: inline-block;
    width: 100%;
    margin-top: -15px;
  }
    
    /* Submit button styling */
    .form-group input[type="submit"] {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        float: right;
    }
    
    /* Time range styling */



    .alert {
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
        text-align: center;
        font-family: Arial;
    }
    .alert-success {
        background-color: #dff0d8;
        color: #3c763d;
        border: 1px solid #d6e9c6;
        
    }
    .alert-danger {
        background-color: #f2dede;
        color: #a94442;
        border: 1px solid #ebcccc;
    }
    .form-group.time {
    display: flex;
    align-items: center;
}

.form-group.time input[type="time"] {
    width: calc(50% - 5px); /* 50% width for each input and subtract 5px for the "TO" text */
}

.form-group.time span {
    margin: 0 10px;
}


.time {
    display: flex;
    flex-direction: column;
}

.time label {
    margin-bottom: 10px;
}

.time-inputs {
    display: flex;
    align-items: center;
}

.time-inputs input {
    margin-right: 10px;
}
.time_label {
    position: relative;
    bottom: 10px;
    right: 5px;
}
.status-response{
    position: relative;
    bottom: 635px;
    width:100%;
    right: 20px;
    
}
.btn.btn-primary {
   width: 100%;
   background-color: blue;
   color: white;
   padding: 10px;
   border-radius: 5px;
   border: none;
   font-size: 18px;
   cursor: pointer;
   position: relative;
   bottom: 20px;
}

.btn.btn-primary:hover {
   background-color: darkblue;
}
#table1{
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 30%;
    position: absolute;
    top: 700px;
    
  }


  #table1 td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

 #table1 tr:nth-child(even) {
    background-color: #dddddd;
  }
  #table2{
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 30%;
    position: absolute;
    top:700px;
    left: 1320px;
    
  }


  #table2 td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

 #table2 tr:nth-child(even) {
    background-color: #dddddd;
  }
  .del_all{
    position: absolute;
    left:900px;
    bottom: 120px;
  }
  .btn.btn-danger {
  background-color: #dc3545;
  color: #fff;
  border-color: #dc3545;
  font-size: 1rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease-in-out;
}

.btn.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.btn.btn-danger:active,
.btn.btn-danger:focus {
  background-color: #bd2130;
  border-color: #b21f2d;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
}
.total_work{
  position: absolute;
  top: 70%;
  right: 10%;
  transform: translate(0,-50%);
  background-color: rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  
}
.total_hours{
  position: absolute;
  top: 70%;
  left: 10%;
  transform: translate(0,-50%);
  background-color: rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  
}
#events {
  position: absolute;
  bottom: 40%;
  left: 78%;
}

.events {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.event-card {
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  text-align: center;
  width: calc(50% - 10px);
  max-width: 500px;
}

.event-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}
#events_VR {
  position: absolute;
  bottom: 40%;
  right: 78%;
}

.events_VR {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.event-card_VR {
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  text-align: center;
  width: calc(50% - 10px);
  max-width: 500px;
}

.event-title_VR {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}
input[type="button"] {
  background-color: #4CAF50;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:hover {
  background-color: #3e8e41;
  transform: scale(1.1);
}





  
</style>


<?php 
// Include configuration file 
include_once 'config.php'; 
include 'dbConfig.php';
 
$postData = ''; 
if(!empty($_SESSION['postData'])){ 
    $postData = $_SESSION['postData']; 
    unset($_SESSION['postData']); 
} 
 
$status = $statusMsg = ''; 
if(!empty($_SESSION['status_response'])){ 
    $status_response = $_SESSION['status_response']; 
    $status = $status_response['status']; 
    $statusMsg = $status_response['status_msg']; 
} 

$location = "";
if (!empty($postData['title'])) {
    if ($postData['title'] === "werk vuurlinie") {
        $location = "Noorderweg 13, 1948 PJ Beverwijk, Netherlands";
    } elseif ($postData['title'] === "werk VR-cafe") {
        $location = "VRcafe Haarlem, Stationsplein 68, 2011 LM Haarlem, Netherlands";
    }
}

           
?>


<!-- Status message -->
<?php if(!empty($statusMsg)){ ?>
    <div class="alert alert-<?php echo $status; ?>"><?php echo $statusMsg; ?></div>
<?php } ?>
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script>
    $(document).ready(function() {
      // Replace YOUR_API_KEY with your actual API key
      var API_KEY = "AIzaSyBGbQjVOJ-2gj5-OopuiOpyYqN80BCT4qc";

      // Replace CALENDAR_ID with the actual calendar ID
      var CALENDAR_ID = "he2cnbmqjtku6paaqokqa765u4@group.calendar.google.com";

      // API endpoint for the Google Calendar API
      var API_ENDPOINT = "https://www.googleapis.com/calendar/v3/calendars/" + CALENDAR_ID + "/events";

      // Function to get the upcoming events from Google Calendar API
      function getUpcomingEvents() {
        // Make a GET request to the API endpoint
        $.get(API_ENDPOINT, {
          key: API_KEY,
          timeMin: (new Date()).toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: "startTime"
        }, function(response) {
          // Handle the response from the API
          if (response && response.items) {
            var events = response.items;
            var html = "";

            // Loop through each event
            for (var i = 0; i < events.length; i++) {
              var event = events[i];
              
              // Only show events with the word "vuurlinie", "Vuurlinie", "VR-cafe", "Vr-cafe" or "vr_cafe" in it
              if (event.summary.toLowerCase().indexOf("vuurlinie") > -1 ) {
                var start = event.start.dateTime || event.start.date;
                var date = new Date(start);

                // Add the event to the HTML
                html += "<div class='test' style='background-color: white; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); border: 1px solid black; border-radius: 10px; padding: 5px; margin: 20px; text-align: center; width: 100%; max-width: 500px; margin: 0 auto;  '>" +
                    "<p class='event-title'>" + event.summary + "</p>" +
                    "<p class='event-date'>" + date.toLocaleString() + "</p>" +
                    "</div>";
              }
            }

            // Update the HTML on the page
            $("#events").html(html);
          }
        });
      }

      // Call the getUpcomingEvents function
      getUpcomingEvents();
    });
     $(document).ready(function() {
      // Replace YOUR_API_KEY with your actual API key
      var API_KEY = "AIzaSyBGbQjVOJ-2gj5-OopuiOpyYqN80BCT4qc";

      // Replace CALENDAR_ID with the actual calendar ID
      var CALENDAR_ID = "he2cnbmqjtku6paaqokqa765u4@group.calendar.google.com";

      // API endpoint for the Google Calendar API
      var API_ENDPOINT = "https://www.googleapis.com/calendar/v3/calendars/" + CALENDAR_ID + "/events";

      // Function to get the upcoming events from Google Calendar API
      function getUpcomingEvents_VR() {
        // Make a GET request to the API endpoint
        $.get(API_ENDPOINT, {
          key: API_KEY,
          timeMin: (new Date()).toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: "startTime"
        }, function(response) {
          // Handle the response from the API
          if (response && response.items) {
            var events = response.items;
            var html = "";

            // Loop through each event
            for (var i = 0; i < events.length; i++) {
              var event = events[i];
              
              // Only show events with the word "vuurlinie", "Vuurlinie", "VR-cafe", "Vr-cafe" or "vr_cafe" in it
              if ( event.summary.toLowerCase().indexOf("vr-cafe") > -1 || event.summary.toLowerCase().indexOf("vr_cafe") > -1) {
                var start = event.start.dateTime || event.start.date;
                var date = new Date(start);

                // Add the event to the HTML
                html += "<div class='test_VR' style='background-color: white; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); border: 1px solid black; border-radius: 10px; padding: 5px; margin: 20px; text-align: center; width: 100%; max-width: 500px; margin: 0 auto;  '>" +
                    "<p class='event-title_VR'>" + event.summary + "</p>" +
                    "<p class='event-date_VR'>" + date.toLocaleString() + "</p>" +
                    "</div>";
              }
            }

            // Update the HTML on the page
            $("#events_VR").html(html);
          }
        });
      }

      // Call the getUpcomingEvents function
      getUpcomingEvents_VR();
    });
  </script>
</head>
<script src="login.js"></script>
<input type="button" value="Sign Out" onclick="signOut()">
<table id="table1">
    <thead>
        <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>Hours Worked</th>
        </tr>
    </thead>
    <tbody>
        <!-- PHP code to fetch data from database and display in table -->
        <?php
        $sql = "SELECT title, date, time_from, time_to  FROM events WHERE title='werk VR-cafe' ORDER BY id DESC LIMIT 5  ";
        $result = mysqli_query($db, $sql);
        $total_hours = 0;
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $workingHours = (strtotime($row['time_to']) - strtotime($row['time_from'])) / 3600;
                $total_hours += $workingHours;
        ?>
        <tr>
            <td><?php echo $row['title']; ?></td>
            <td><?php echo date("d/m/Y", strtotime($row['date'])); ?></td>
            <td><?php echo $row['time_from']; ?></td>
            <td><?php echo round($workingHours,2); ?></td>
            
        </tr>
        <?php } 
        }?>
    </tbody>
</table>
<div class="total_hours">
  Total Hours Worked: <?php echo round($total_hours, 2); ?>
</div>
<table id="table2">
    <thead>
        <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>Hours Worked</th>
        </tr>
    </thead>
    <tbody>
        <!-- PHP code to fetch data from database and display in table -->
        <?php
        $sql1 = "SELECT title, date, time_from, time_to  FROM events WHERE title='werk vuurlinie' ORDER BY id DESC LIMIT 5  ";
        
        $result1 = mysqli_query($db, $sql1);
        $totalWorkingHours = 0;
        
        if (mysqli_num_rows($result1) > 0) {
            while ($row1 = mysqli_fetch_assoc($result1)) {
                $workingHours1 = round((strtotime($row1['time_to']) - strtotime($row1['time_from'])),2) / 3600;
                $totalWorkingHours += $workingHours1;
                
                ?>
        <tr>
            <td><?php echo $row1['title']; ?></td>
            <td><?php echo date("d/m/Y", strtotime($row1['date'])); ?></td>
            <td><?php echo $row1['time_from']; ?></td>
            <td><?php echo round($workingHours1,2); ?></td>
            
        </tr>
        <?php } 
        }
        ?>
    </tbody>
</table>
<div class="total_work">
<p>Total Hours Worked: <?php echo round($totalWorkingHours,2); ?></p>
</div>

<div class="col-md-12">
    <form method="post" action="addEvent.php" class="form">
        <div class="form-group">
            <label>titel</label>
            <select class="form-control" style="background-color: #f0f0f0; border-radius: 5px; padding: 10px; font-size: 18px;" name="title" required onchange="document.getElementById('location').value = this.options[this.selectedIndex].dataset.location">
                <option value="">Kies titel</option>
                <option value="werk vuurlinie" data-location="Noorderweg 13, 1948 PJ Beverwijk, Netherlands" <?php echo (!empty($postData['title']) && $postData['title'] == "werk vuurlinie") ? 'selected' : ''; ?>>Werk Vuurlinie</option>
                <option value="werk VR-cafe" data-location="VRcafe Haarlem, Stationsplein 68, 2011 LM Haarlem, Netherlands" <?php echo (!empty($postData['title']) && $postData['title'] == "werk VR-cafe") ? 'selected' : ''; ?>>Werk VR-cafe</option>
            </select>
        </div>
        <div class="form-group">
            <label>Locatie</label>
            <input type="text" name="location" id="location" class="form-control location-input" style="background-color: #f0f0f0; border-radius: 5px; padding: 10px; font-size: 18px;" readonly value="<?php echo $location; ?>">
        </div>
        <div class="form-group">
            <label>Datum</label>
            <input type="date" name="date" class="form-control" style="background-color: #f0f0f0; border-radius: 5px; padding: 10px; font-size: 18px;" value="<?php echo !empty($postData['date']) ? date('Y-m-d', strtotime($postData['date'])) : ''; ?>" required="">
</div>
<div class="form-group time">
            <label>tijd</label>
            <input type="time" name="time_from" class="form-control" value="<?php echo !empty($postData['time_from'])?$postData['time_from']:''; ?>">
            <span>tot</span>
            <input type="time" name="time_to" class="form-control" value="<?php echo !empty($postData['time_to'])?$postData['time_to']:''; ?>">
        </div>


<div class="">
    <input type="submit" name="submit" class="btn btn-primary" style="width: 100%" value="Submit">
</div>
</form>
</div>
<form action="" method="post" class="del_all">
  <input type="submit" name="delete_all" value="Delete All" class="btn btn-danger">
</form>
<body>
  <div id="events">
    <div class="events">
      <!-- individual event divs go here -->
    </div>
  </div>
   <div id="events_VR">
    <div class="events_VR">
      <!-- individual event divs go here -->
    </div>
  </div>
</body>
</html>

<?php
if (isset($_POST['delete_all'])) {
  
  if (!$db) {
    die("Connection failed: " . mysqli_connect_error());
  }
  
  $sql = "DELETE FROM events";
  if (mysqli_query($db, $sql)) {
    
    echo("<meta http-equiv='refresh' content='1'>");
    
  } else {
    echo "Error deleting items: " . mysqli_error($conn);
  }
  mysqli_close($db);
}

?>
<script>
    window.onload = function() {
        setTimeout(function() {
            document.querySelector(".status-response").style.display = "none";
        }, 3000);
    }
</script>
<div class="alert alert-">
<div class="status-response alert alert-">
<?php if(!empty($statusMsg)){ ?>
    <div class="alert alert-<?php echo $status; ?>"><?php echo $statusMsg; ?></div>
<?php } ?> 
</div>
</div>
<?php
$delete_date = 1;
if (date("j") == $delete_date) {
  $sql = "TRUNCATE TABLE events ";

  if ($db->query($sql) === TRUE) { ?>
      <script>console.log("Data deleted successfully")</script> <?php
  } else { ?>
      <script>
console.log("Error deleting data: <?php echo $db->error; ?>");
</script>
<?php 
  }
 
  
}



  if(date("j") !== $delete_date){
    echo "<script>console.log(\"today isn't the 1st\")</script>";
    } 
  
?>




    

    

    

