<?php

$fname = $_POST['author']; 		// Grab the user first name from input field
$email = $_POST['email']; 		// Grab the user email address from input field
$message = $_POST['message']; 	// Grab the user message from input field
$body = '
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
		</head>
		<body style="font-family: Arial; color: #2c3e50; box-shadow: 0px 0px 40px 1px #f5f5f5; margin: 50px;">
			<h1 style="text-transform: uppercase; text-align: center; padding-top: 60px;">You have a new response!</h1>
			<div class="box" style="padding: 50px; box-sizing: border-box; background: #fff; margin: 0 auto;">
				<h2 style="text-transform: uppercase; margin-top: 0;">'. $fname . '</h2>
				<p style="margin-bottom: 25px; line-height: 2">' . $message . '</p>
			</div>
		</body>
		</html>';


$to      = 'youremailaddress@email.com'; // Here need to input desire email address where the email will be send
$subject = 'New Message'; // Email Subject
$headers = 'From: ' . $email . "\r\n" .
    'Reply-To: ' . $email . "\r\n" .
    'Content-type: text/html; charset=iso-8859-1' .
    'X-Mailer: PHP/' . phpversion();

if( !empty(  $fname ) || !empty( $email ) || !empty( $message ) ) {
	mail($to, $subject, $body, $headers);
} else {
	header('Location: /'); // Replace slash(/) with your domain name ex: example.com
}
