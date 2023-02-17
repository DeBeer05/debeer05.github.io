<?php 
 
// Database configuration    
define('DB_HOST', 'sql.freedb.tech'); 
define('DB_USERNAME', 'freedb_chatgpt'); 
define('DB_PASSWORD', 'uZ6W$evJFQ2XXt6'); 
define('DB_NAME', 'freedb_chatgpt_test'); 
 
// Google API configuration 
define('GOOGLE_CLIENT_ID', '875163929025-30af1oejvkrjicskbdikm8kkep56s153.apps.googleusercontent.com'); 
define('GOOGLE_CLIENT_SECRET', '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'); 
define('GOOGLE_OAUTH_SCOPE', 'https://www.googleapis.com/auth/calendar'); 
define('REDIRECT_URI', 'https://debeer05.webredirect.org/google_calendar_event_sync.php'); 
 
// Start session 
if(!session_id()) session_start(); 
 
// Google OAuth URL 
$googleOauthURL = 'https://accounts.google.com/o/oauth2/auth?scope=' . urlencode(GOOGLE_OAUTH_SCOPE) . '&redirect_uri=' . REDIRECT_URI . '&response_type=code&client_id=' . GOOGLE_CLIENT_ID . '&access_type=online'; 
 
?>