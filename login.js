function login() {
  var username = document.getElementById("username").value.toLowerCase();
  var password = document.getElementById("password").value.toLowerCase();

  // Make an AJAX request to a PHP script to check if the username and password match the ones stored in the database
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText == "1") {
        if (username === "debeer05") {
          // Redirect to main/index.php if username is "debeer05"
          window.location.replace("main/index.php");
        } else if (username === "guest") {
          // Redirect to main/guest/guest.php if username is "guest"
          window.location.replace("main/guest/guest.php");
        } else {
          // Redirect to main/loser/no_debeer05.php if username is neither "debeer05" nor "guest"
          window.location.replace("/main/admin/admin_week.php");
        }
      } else {
        // Display an alert to indicate incorrect username or password
        alert("Incorrect username or password. Please try again.");
      }
    }
  };
  xhttp.open("POST", "check_login.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("username=" + username + "&password=" + password);
}
