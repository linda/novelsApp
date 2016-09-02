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

	$allowedURLs = array("getAllNovels", "getNovelsByAuthor", "getNovelDetails", 'getAllPersons', 'getNovelCharacters','getAllPersonsNotAddedToNovel');

	$result_value = "An error has occurred";
	
	function getAllNovels()
	{
		$query = "SELECT Title, Author, Published_end, Setting_year_start, Setting_year_end, ID FROM Novel";
		$allNovels = mysql_query($query);
		$rows = array();
		$counter = 0;
		while($r = mysql_fetch_assoc($allNovels)) {
			$rows[] = $r;
			$rows[$counter]['chars'] = getCharsByNovelId($rows[$counter]['ID']);
			$counter++;
		}
		return $rows;
	}
    function getCharsByNovelId($id){
        $query =
            "SELECT name_en FROM `person` INNER JOIN novel_person ON person.id = novel_person.person_id WHERE novel_person.novel_id = $id";
        $allChars = mysql_query($query);
        $characterRow = array();
        $characterArray = array();
        $counter = 0;
        while($r1 = mysql_fetch_assoc($allChars)){
            $characterRow[] = $r1;
            array_push($characterArray, $characterRow[$counter]['name_en']);
            $counter++;
        }
        return $characterArray;
    }


	function getNovelsByAuthor($author)
	{
		$query = "SELECT * FROM Novel WHERE author = '".$author."'";	
		$novelyByAuthor = mysql_query($query);
		$rows = array();
		while($r = mysql_fetch_assoc($novelyByAuthor)) {
			$rows[] = $r;
		}
		return $rows;
	}

	function getNovelDetails($id)
	{
		$query = "SELECT * FROM Novel WHERE ID = '".$id."'";	
		$novelDetails = mysql_query($query);
		$rows = array();
		while($r = mysql_fetch_assoc($novelDetails)) {
			$rows[] = $r;
			$rows[0]['chars'] = getCharsByNovelId($rows[0]['ID']);
		}
		return $rows;
	}

	function getAllPersons()
	{
		$query = "SELECT name_en, id FROM Person";	
		$allPersons = mysql_query($query);
		$rows = array();
		while($r = mysql_fetch_assoc($allPersons)) {
			$rows[] = $r;
		}
		return $rows;
	}
	function getAllPersonsNotAddedToNovel($novelId)
	{
		$query = "SELECT name_en, id FROM Person WHERE id NOT IN 
			( SELECT novel_person.person_id FROM novel_person WHERE novel_id = '".$novelId."')";	
		$allPersons = mysql_query($query);
		$rows = array();
		while($r = mysql_fetch_assoc($allPersons)) {
			$rows[] = $r;
		}
		return $rows;
	}

	function saveNovel($angular_http_params){
		$result = 'Could not save';
        if($angular_http_params["title"] && $angular_http_params["author"] && $angular_http_params["published"]){
            $query = "INSERT INTO Novel (
            	Title, 
            	Author, 
            	Published_end, 
            	Setting_year_start, 
            	Setting_year_end,
            	download_link, 
            	language, 
            	Completed) VALUES("
                ."'".$angular_http_params["title"]."', "
                ."'".$angular_http_params["author"]."',"
                ."'".$angular_http_params["published"]."',"
                ."'".$angular_http_params["settingStart"]."',"
                ."'".$angular_http_params["settingEnd"]."',"
                ."'".$angular_http_params["link"]."',"
                ."'".$angular_http_params["language"]."',"
                ."'".$angular_http_params["completed"]."'"
            .")";
            $result = mysql_query($query);
        }
        return $result;
	}
	function addExistingCharacter($angular_http_params){
		$result = 'Could not save';
        if($angular_http_params["novelId"] && $angular_http_params["personId"]){
            $query = "INSERT INTO novel_person (novel_id, person_id) VALUES("
                ."'".$angular_http_params["novelId"]."', "
                ."'".$angular_http_params["personId"]."'"
            .")";
            $result = mysql_query($query);
        }
        return $result;
	}

    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $db_selected = mysql_select_db($database) or die( "Could not select database ".$database." ".mysql_error());

        // code for using JSON sent as POST from :
        // http://stackoverflow.com/questions/15485354/angular-http-post-to-php-and-undefined/38368714#38368714
        $angular_http_params = (array)json_decode(trim(file_get_contents('php://input')));

		$url = $_SERVER['REQUEST_URI'];

        $function = substr($url, strrpos($url, '/') + 1);

        switch($function)
        {
        	case 'saveNovel':
        		$result = saveNovel($angular_http_params);
        		break;
        	case 'addExistingCharacter':
        		$result = addExistingCharacter($angular_http_params);
        		break;
        	default: $result = 'Not an allowd URL';
       
        }

        exit($result);

    }

    if($_SERVER['REQUEST_METHOD'] == 'GET'){

		if (isset($_GET["action"]) && in_array($_GET["action"], $allowedURLs))
		{
		  switch ($_GET["action"])
			{
				case "getAllNovels":
					$result_value = getAllNovels();
					break;
				case "getAllPersons":
					$result_value = getAllPersons();
					break;
				case "getAllPersonsNotAddedToNovel":
					$result_value = getAllPersonsNotAddedToNovel($_GET["ID"]);
					break;
				case "getNovelsByAuthor":
					if (isset($_GET["author"]))
						$result_value = getNovelsByAuthor($_GET["author"]);
					else
						$result_value = "No author set";
					break;
				case "getNovelDetails":
					if (isset($_GET["ID"])){
						$singleNovelAsArray = getNovelDetails($_GET["ID"]);
						if(count($singleNovelAsArray==1)){
							$result_value = $singleNovelAsArray[0];
						} 
					} else {
						$result_value = "No id given";
					}
					break;
				case "getNovelCharacters":
					if (isset($_GET["ID"])){
						$result_value = getCharsByNovelId($_GET['ID']);
					} else {
						$result_value = "No id given";
					}
					break;
			}
		}
		exit(json_encode($result_value));
	}


//	print json_encode($rows);


	mysql_close();
?>