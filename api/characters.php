<?php
	// code for get "api" based on http://blog.ijasoneverett.com/2013/02/rest-api-a-simple-php-tutorial/

	$host = "localhost";
	$username = "root";
	$password = "";
	$database = "ba_novels";

	$connection = mysql_connect($host,$username,$password);

	if (!$connection) {
		die("Could not connect: " . mysql_error());
	}

	$db_selected = mysql_select_db($database) or die( "Could not select database ".$database." ".mysql_error());

	$allowedURLs = array("addCharacter", "createNewCharacter", "addNewCharacter");

	$result_value = "An error has occurred";

	function addCharacter($novelID, $characterId)
	{
		$query = "INSERT INTO novel_person (novel_id, person_id) VAUES ('".$novelID."', '".$characterId."')";	
		mysql_query($query);
	}


	if (isset($_PUT["novelID"]) && isset($_PUT["characterID"]))
	{
		addCharacter($_PUT["novelID"]), $_PUT["characterID"])
	}
	mysql_close();
?>