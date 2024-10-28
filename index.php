 <?php 
require_once '../dbconfig.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Mark your attendance</title>
  <script defer src="face-api.min.js"></script>
  <script defer src="script.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


  <style>
    body {
      margin: 0;
      padding: 0;
      width: 100%;  
      height: 100%;  
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative; 
    } 

    canvas {
      position: absolute;
    }

    body.loading {
      background-color: black; 
      color: white; 
      z-index: 10000;
    }

    #loader {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: Arial, sans-serif;
      font-size: 18px;
      color: #ffffff; 
      text-align: center;
      z-index: 9999; 
    }

    .spinner {
      border: 8px solid #f3f3f3;
      border-top: 8px solid #3498db; 
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 20px auto; 
    }

    /* Spin animation */
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    #loader.hidden {
      display: none;
    }

    #video.loading {
      color: black; 
    }
  </style>
</head>
<body>
  <div id="loader" class="hidden">
    <div class="spinner"></div>
    <p>Loading, please wait...</p>
  </div>

  <video id="video" width="720" height="560" autoplay muted class="loading"></video> 
</body>
</html>
