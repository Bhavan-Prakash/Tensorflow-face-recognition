
<?php
// Get the POST data from the Ajax request
$to = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];
date_default_timezone_set("Asia/Calcutta"); 
$message.=" on ".date('Y/m/d H:i:s')." Thanks";

$curl = curl_init();

curl_setopt_array($curl, [
	CURLOPT_URL => "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "POST",
	CURLOPT_POSTFIELDS => json_encode([
		'personalizations' => [
				[
								'to' => [
																[
																																'email' => $to
																]
								],
								'subject' => $subject
				]
		],
		'from' => [
				'email' => 'info@bhavan.net'
		],
		'content' => [
				[
								'type' => 'text/plain',
								'value' => $message
				]
		]
	]),
	CURLOPT_HTTPHEADER => [
		"X-RapidAPI-Host: bhavan1.p.rapidapi.com",
		"X-RapidAPI-Key: your key",
		"content-type: application/json"
	],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {
	echo $response;
}

?>
