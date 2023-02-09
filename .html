<?php

require_once __DIR__ . '/vendor/autoload.php';

// Create a client object and set the API key
$client = new Google_Client();
$client->setDeveloperKey("YOUR_API_KEY");

// Create a service object for the Calendar API
$service = new Google_Service_Calendar($client);

// Get the calendar you want to add the event to
$calendar = $service->calendars->get("primary");

// Define the event details
$event = new Google_Service_Calendar_Event(array(
  'summary' => 'Test Event',
  'location' => 'Test Location',
  'description' => 'A test event created via the Calendar API',
  'start' => array(
    'dateTime' => '2023-02-10T10:00:00.000-07:00',
    'timeZone' => 'America/Los_Angeles',
  ),
  'end' => array(
    'dateTime' => '2023-02-10T12:00:00.000-07:00',
    'timeZone' => 'America/Los_Angeles',
  ),
  'recurrence' => array(
    'RRULE:FREQ=DAILY;COUNT=2'
  ),
  'attendees' => array(
    array('email' => 'attendee1@example.com'),
    array('email' => 'attendee2@example.com'),
  ),
  'reminders' => array(
    'useDefault' => FALSE,
    'overrides' => array(
      array('method' => 'email', 'minutes' => 24 * 60),
      array('method' => 'popup', 'minutes' => 10),
    ),
  ),
));

// Insert the event into the calendar
$event = $service->events->insert($calendar->id, $event);

// Print the event details
printf('Event created: %s\n', $event->htmlLink);

?>
