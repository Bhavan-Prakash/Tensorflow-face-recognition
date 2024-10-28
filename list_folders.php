<?php
$dir = './Labels'; 
$emp_code= $_REQUEST["emp_code"];

if (!is_dir($dir)) {
    die('Directory not found: ' . $dir);
}


$folders = array_filter(glob($dir . '/*'), 'is_dir');
$folderNames = array_map('basename', $folders);


echo json_encode($folderNames);
?>
