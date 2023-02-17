function signOut() {
    // Destroy the current session
    sessionStorage.clear();
    // Redirect to the login page
    window.location.replace("/index.html");
  }
  