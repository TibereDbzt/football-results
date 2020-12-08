<?php

$leagueID = 0;
$curl = curl_init();

if (isset($_GET['leagueID'])) {
  $leagueID = $_GET['leagueID'];
} else {
  echo "erreur : variable globale nulle";
}

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://api.football-data.org/v2/competitions/" . $leagueID . "/standings?standingType=TOTAL",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_POSTFIELDS => "",
  CURLOPT_HTTPHEADER => array(
    "x-auth-token: 37cbc5c7e39c41038be8d2749625992a"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}

?>
