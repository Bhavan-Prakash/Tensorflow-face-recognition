// const video = document.getElementById("video");
// let emailSent = {};

// Promise.all([
//   faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//   faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//   faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//   navigator.mediaDevices
//     .getUserMedia({
//       video: true,
//       audio: false,
//     })
//     .then((stream) => {
//       video.srcObject = stream;
//       console.log("Webcam started successfully");
//     })
//     .catch((error) => {
//       console.error("Error starting webcam:", error);
//     });
// }

// async function getFolderNames() {
//   try {
//     const response = await fetch('./list_folders.php');
//     console.log('Fetch response:', response);
//     const folderNames = await response.json();
//     console.log('Folder names:', folderNames);
//     return folderNames;
//   } catch (error) {
//     console.error('Error fetching folder names:', error);
//     return [];
//   }
// }

// async function getEmployeeArrivalData() {
//   try {
//     const response = await fetch('../get_attendance.php');
//     console.log('Fetch attendance response:', response);
//     const employees = await response.json();
//     console.log('Employee Arrival Data:', employees);
//     return employees;
//   } catch (error) {
//     console.error('Error fetching attendance data:', error);
//     return [];
//   }
// }

// async function getEmployeeData() {
//   try {
//     const response = await fetch('../get_employee_records.php');
//     console.log('Fetch employee records response:', response);
//     const employees = await response.json();
//     console.log('Employee records:', employees);
//     return employees;
//   } catch (error) {
//     console.log('Error fetching employee data:',error)
//     return [];
//   }
// }

// async function getLabeledFaceDescriptions() {
//   try {
//     const labels = await getFolderNames();
//     const emp = await getEmployeeArrivalData();
//     const empData = await getEmployeeData();

//     console.log("Fetched labels:", labels);
//     console.log("Fetched employee arrival data:", emp);
//     console.log("Fetched employee data:", empData);

//     const labeledFaceDescriptors = [];

//     for (const label of labels) {
//       const descriptions = [];
//       for (let i = 1; i <= 6; i++) {
//         const imgPath = `./Labels/${label}/${i}.jpg`;
//         console.log("Fetching image:", imgPath);
//         const img = await faceapi.fetchImage(imgPath);

//         const detections = await faceapi
//           .detectSingleFace(img)
//           .withFaceLandmarks()
//           .withFaceDescriptor();

//         if (detections && detections.descriptor) {
//           descriptions.push(detections.descriptor);
//         } else {
//           console.warn(`No face detected in image ${i} of ${label}`);
//         }
//       }

//       if (descriptions.length > 0) {
//         const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//           label,
//           descriptions
//         );
//         labeledFaceDescriptors.push(labeledFaceDescriptor);
//       }
//     }

//     console.log("Labeled face descriptors:", labeledFaceDescriptors);
//     return labeledFaceDescriptors;
//   } catch (error) {
//     console.error("Error fetching labeled face descriptors:", error);
//     return [];
//   }
// }

// video.addEventListener("play", async () => {
//   try {
//     const labeledFaceDescriptors = await getLabeledFaceDescriptions();
//     if (labeledFaceDescriptors.length > 0) {
//       const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//       const canvas = faceapi.createCanvasFromMedia(video, {
//         willReadFrequently: true,
//       });
//       document.body.append(canvas);

//       const displaySize = { width: video.width, height: video.height };
//       faceapi.matchDimensions(canvas, displaySize);

//       const processResults = async (results, resizedDetections) => {
//         for (let i = 0; i < results.length; i++) {
//           const result = results[i];
//           const box = resizedDetections[i].detection.box;
//           const drawBox = new faceapi.draw.DrawBox(box, {
//             label: result.toString(),
//           });
//           drawBox.draw(canvas);

         
//           if (result.label && !emailSent[result.label]) {
//             emailSent[result.label] = true;

//             const emp_code = result.label; 
//             const attendanceType = "Check-in"; 
//             const apikey = "qwerty!"; 
//             const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`; 
//             console.log("Sending POST request with data:", postData);

//             try {
//               const response = await fetch('../attendance.php', {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//                 body: postData,
//               });

//               if (response.ok) {
//                 const data = await response.text();
//                 console.log(`Attendance sent successfully for ${emp_code}:`, data);
//               } else {
//                 console.error(`Failed to send attendance for ${emp_code}:`, response.statusText);
//               }
//             } catch (error) {
//               console.error('Error sending attendance:', error);
//             }
//           }
//         }
//       };

//       setInterval(async () => {
//         const detections = await faceapi
//           .detectAllFaces(video)
//           .withFaceLandmarks()
//           .withFaceDescriptors();

//         const resizedDetections = faceapi.resizeResults(
//           detections,
//           displaySize
//         );

//         canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//         const results = resizedDetections.map((d) => {
//           return faceMatcher.findBestMatch(d.descriptor);
//         });

//         processResults(results, resizedDetections);
//       }, 100);
//     } else {
//       console.warn("No labeled face descriptors found.");
//     }
//   } catch (error) {
//     console.error("Error in face recognition:", error);
//   }
// });







// const video = document.getElementById("video");
// let emailSent = {};

// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false,
//         })
//         .then((stream) => {
//             video.srcObject = stream;
//             console.log("Webcam started successfully");
//         })
//         .catch((error) => {
//             console.error("Error starting webcam:", error);
//         });
// }

// async function getFolderNames() {
//     try {
//         const response = await fetch('./list_folders.php');
//         console.log('Fetch response:', response);
//         const folderNames = await response.json();
//         console.log('Folder names:', folderNames);
//         return folderNames;
//     } catch (error) {
//         console.error('Error fetching folder names:', error);
//         return [];
//     }
// }

// async function getEmployeeArrivalData() {
//     try {
//         const response = await fetch('../get_attendance.php');
//         console.log('Fetch attendance response:', response);
//         const employees = await response.json();
//         console.log('Employee Arrival Data:', employees);
//         return employees;
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         return [];
//     }
// }

// async function getEmployeeData() {
//     try {
//         const response = await fetch('../get_employee_records.php');
//         console.log('Fetch employee records response:', response);
//         const employees = await response.json();
//         console.log('Employee records:', employees);
//         return employees;
//     } catch (error) {
//         console.log('Error fetching employee data:', error)
//         return [];
//     }
// }

// async function getLabeledFaceDescriptions() {
//   try {
//     // Show the loader and change background
//     document.getElementById("loader").classList.remove("hidden");
//     document.body.classList.add("loading"); // Add loading class to body

//     const labels = await getFolderNames();
//     const emp = await getEmployeeArrivalData();
//     const empData = await getEmployeeData();

//     console.log("Fetched labels:", labels);
//     console.log("Fetched employee arrival data:", emp);
//     console.log("Fetched employee data:", empData);

//     const labeledFaceDescriptors = [];

//     for (const label of labels) {
//       const descriptions = [];
//       for (let i = 1; i <= 6; i++) {
//         const imgPath = `./Labels/${label}/${i}.jpg`;
//         console.log("Fetching image:", imgPath);
//         const img = await faceapi.fetchImage(imgPath);

//         const detections = await faceapi
//           .detectSingleFace(img)
//           .withFaceLandmarks()
//           .withFaceDescriptor();

//         if (detections && detections.descriptor) {
//           descriptions.push(detections.descriptor);
//         } else {
//           console.warn(`No face detected in image ${i} of ${label}`);
//         }
//       }

//       if (descriptions.length > 0) {
//         const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//           label,
//           descriptions
//         );
//         labeledFaceDescriptors.push(labeledFaceDescriptor);
//       }
//     }

//     console.log("Labeled face descriptors:", labeledFaceDescriptors);

//     // Hide the loader and remove background change
//     document.getElementById("loader").classList.add("hidden");
//     document.body.classList.remove("loading"); // Remove loading class from body

//     return labeledFaceDescriptors;
//   } catch (error) {
//     console.error("Error fetching labeled face descriptors:", error);

//     // Hide the loader and remove background change in case of an error
//     document.getElementById("loader").classList.add("hidden");
//     document.body.classList.remove("loading"); // Remove loading class from body

//     return [];
//   }
// }


// video.addEventListener("play", async () => {
//     try {
//         const labeledFaceDescriptors = await getLabeledFaceDescriptions();
//         if (labeledFaceDescriptors.length > 0) {
//             const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//             const canvas = faceapi.createCanvasFromMedia(video, {
//                 willReadFrequently: true,
//             });
//             document.body.append(canvas);

//             const displaySize = { width: video.width, height: video.height };
//             faceapi.matchDimensions(canvas, displaySize);

//             const processResults = async (results, resizedDetections) => {
//                 for (let i = 0; i < results.length; i++) {
//                     const result = results[i];
//                     const box = resizedDetections[i].detection.box;
//                     const drawBox = new faceapi.draw.DrawBox(box, {
//                         label: result.toString(),
//                     });
//                     drawBox.draw(canvas);

//                     if (result.label && !emailSent[result.label]) {
//                         emailSent[result.label] = true;

//                         const emp_code = result.label;
//                         const attendanceType = "Check-in";
//                         const apikey = "qwerty!"; 
//                         const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
//                         console.log("Sending POST request with data:", postData);

//                         try {
//                             const response = await fetch('../attendance.php', {
//                                 method: 'POST',
//                                 headers: {
//                                     'Content-Type': 'application/x-www-form-urlencoded',
//                                 },
//                                 body: postData,
//                             });

//                             if (response.ok) {
//                                 const data = await response.text();
//                                 console.log(`Attendance sent successfully for ${emp_code}:`, data);
//                             } else {
//                                 console.error(`Failed to send attendance for ${emp_code}:`, response.statusText);
//                             }
//                         } catch (error) {
//                             console.error('Error sending attendance:', error);
//                         }
//                     }
//                 }
//             };

//             setInterval(async () => {
//                 const detections = await faceapi
//                     .detectAllFaces(video)
//                     .withFaceLandmarks()
//                     .withFaceDescriptors();

//                 const resizedDetections = faceapi.resizeResults(
//                     detections,
//                     displaySize
//                 );

//                 canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//                 const results = resizedDetections.map((d) => {
//                     return faceMatcher.findBestMatch(d.descriptor);
//                 });

//                 processResults(results, resizedDetections);
//             }, 100);
//         }
//     } catch (error) {
//         console.error("Error in video play event:", error);
//     }
// });


// //working code
// const video = document.getElementById("video");
// let emailSent = {};

// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false,
//         })
//         .then((stream) => {
//             video.srcObject = stream;
//             console.log("Webcam started successfully");
//         })
//         .catch((error) => {
//             console.error("Error starting webcam:", error);
//         });
// }

// async function getFolderNames() {
//     try {
//         const response = await fetch('./list_folders.php');
//         console.log('Fetch response:', response);
//         const folderNames = await response.json();
//         console.log('Folder names:', folderNames);
//         return folderNames;
//     } catch (error) {
//         console.error('Error fetching folder names:', error);
//         return [];
//     }
// }

// async function getEmployeeArrivalData() {
//     try {
//         const response = await fetch('../get_attendance.php');
//         console.log('Fetch attendance response:', response);
//         const employees = await response.json();
//         console.log('Employee Arrival Data:', employees);
//         return employees;
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         return [];
//     }
// }

// async function getEmployeeData() {
//     try {
//         const response = await fetch('../get_employee_records.php');
//         console.log('Fetch employee records response:', response);
//         const employees = await response.json();
//         console.log('Employee records:', employees);
//         return employees;
//     } catch (error) {
//         console.log('Error fetching employee data:', error)
//         return [];
//     }
// }

// async function getLabeledFaceDescriptions() {
//     try {

//         document.getElementById("loader").classList.remove("hidden");
//         document.body.classList.add("loading"); 

//         const labels = await getFolderNames();
//         const emp = await getEmployeeArrivalData();
//         const empData = await getEmployeeData();

//         console.log("Fetched labels:", labels);
//         console.log("Fetched employee arrival data:", emp);
//         console.log("Fetched employee data:", empData);

//         const labeledFaceDescriptors = [];

//         for (const label of labels) {
//             const descriptions = [];
//             for (let i = 1; i <= 6; i++) {
//                 const imgPath = `./Labels/${label}/${i}.jpg`;
//                 console.log("Fetching image:", imgPath);
//                 const img = await faceapi.fetchImage(imgPath);

//                 const detections = await faceapi
//                     .detectSingleFace(img)
//                     .withFaceLandmarks()
//                     .withFaceDescriptor();

//                 if (detections && detections.descriptor) {
//                     descriptions.push(detections.descriptor);
//                 } else {
//                     console.warn(`No face detected in image ${i} of ${label}`);
//                 }
//             }

//             if (descriptions.length > 0) {
//                 const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//                     label,
//                     descriptions
//                 );
//                 labeledFaceDescriptors.push(labeledFaceDescriptor);
//             }
//         }

//         console.log("Labeled face descriptors:", labeledFaceDescriptors);


//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");

//         video.play(); 

//         return labeledFaceDescriptors;
//     } catch (error) {
//         console.error("Error fetching labeled face descriptors:", error);


//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading"); 

//         return [];
//     }
// }

// video.addEventListener("play", async () => {
//     try {
//         const labeledFaceDescriptors = await getLabeledFaceDescriptions();
//         if (labeledFaceDescriptors.length > 0) {
//             const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//             const canvas = faceapi.createCanvasFromMedia(video, {
//                 willReadFrequently: true,
//             });
//             document.body.append(canvas);

//             const displaySize = { width: video.width, height: video.height };
//             faceapi.matchDimensions(canvas, displaySize);

//             const processResults = async (results, resizedDetections) => {
//                 for (let i = 0; i < results.length; i++) {
//                     const result = results[i];
//                     const box = resizedDetections[i].detection.box;
//                     const drawBox = new faceapi.draw.DrawBox(box, {
//                         label: result.toString(),
//                     });
//                     drawBox.draw(canvas);

//                     if (result.label && !emailSent[result.label]) {
//                         emailSent[result.label] = true;

//                         const emp_code = result.label;
//                         const attendanceType = "Check-in";
//                         const apikey = "qwerty!"; 
//                         const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
//                         console.log("Sending POST request with data:", postData);

//                         try {
//                             const response = await fetch('../attendance.php', {
//                                 method: 'POST',
//                                 headers: {
//                                     'Content-Type': 'application/x-www-form-urlencoded',
//                                 },
//                                 body: postData,
//                             });

//                             if (response.ok) {
//                                 const data = await response.text();
//                                 console.log(`Attendance sent successfully for ${emp_code}:`, data);
//                             } else {
//                                 console.error(`Failed to send attendance for ${emp_code}:`, response.statusText);
//                             }
//                         } catch (error) {
//                             console.error('Error sending attendance:', error);
//                         }
//                     }
//                 }
//             };

//             setInterval(async () => {
//                 const detections = await faceapi
//                     .detectAllFaces(video)
//                     .withFaceLandmarks()
//                     .withFaceDescriptors();

//                 const resizedDetections = faceapi.resizeResults(
//                     detections,
//                     displaySize
//                 );

//                 canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//                 const results = resizedDetections.map((d) => {
//                     return faceMatcher.findBestMatch(d.descriptor);
//                 });

//                 processResults(results, resizedDetections);
//             }, 100);
//         }
//     } catch (error) {
//         console.error("Error in video play event:", error);
//     }
// });


//code for getting employee location
// const video = document.getElementById("video");
// let emailSent = {};

// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false,
//         })
//         .then((stream) => {
//             video.srcObject = stream;
//             console.log("Webcam started successfully");
//         })
//         .catch((error) => {
//             console.error("Error starting webcam:", error);
//         });
// }

// async function getFolderNames() {
//     try {
//         const response = await fetch('./list_folders.php');
//         console.log('Fetch response:', response);
//         const folderNames = await response.json();
//         console.log('Folder names:', folderNames);
//         return folderNames;
//     } catch (error) {
//         console.error('Error fetching folder names:', error);
//         return [];
//     }
// }

// async function getEmployeeArrivalData() {
//     try {
//         const response = await fetch('../get_attendance.php');
//         console.log('Fetch attendance response:', response);
//         const employees = await response.json();
//         console.log('Employee Arrival Data:', employees);
//         return employees;
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         return [];
//     }
// }

// async function getEmployeeData() {
//     try {
//         const response = await fetch('../get_employee_records.php');
//         console.log('Fetch employee records response:', response);
//         const employees = await response.json();
//         console.log('Employee records:', employees);
//         return employees;
//     } catch (error) {
//         console.log('Error fetching employee data:', error);
//         return [];
//     }
// }

// async function getLabeledFaceDescriptions() {
//     try {

//         document.getElementById("loader").classList.remove("hidden");
//         document.body.classList.add("loading"); 

//         const labels = await getFolderNames();
//         const emp = await getEmployeeArrivalData();
//         const empData = await getEmployeeData();

//         console.log("Fetched labels:", labels);
//         console.log("Fetched employee arrival data:", emp);
//         console.log("Fetched employee data:", empData);

//         const labeledFaceDescriptors = [];

//         for (const label of labels) {
//             const descriptions = [];
//             for (let i = 1; i <= 6; i++) {
//                 const imgPath = `./Labels/${label}/${i}.jpg`;
//                 console.log("Fetching image:", imgPath);
//                 const img = await faceapi.fetchImage(imgPath);

//                 const detections = await faceapi
//                     .detectSingleFace(img)
//                     .withFaceLandmarks()
//                     .withFaceDescriptor();

//                 if (detections && detections.descriptor) {
//                     descriptions.push(detections.descriptor);
//                 } else {
//                     console.warn(`No face detected in image ${i} of ${label}`);
//                 }
//             }

//             if (descriptions.length > 0) {
//                 const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//                     label,
//                     descriptions
//                 );
//                 labeledFaceDescriptors.push(labeledFaceDescriptor);
//             }
//         }

//         console.log("Labeled face descriptors:", labeledFaceDescriptors);

//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");

//         video.play(); 

//         return labeledFaceDescriptors;
//     } catch (error) {
//         console.error("Error fetching labeled face descriptors:", error);

//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading"); 

//         return [];
//     }
// }

// video.addEventListener("play", async () => {
//     try {
//         const labeledFaceDescriptors = await getLabeledFaceDescriptions();
//         if (labeledFaceDescriptors.length > 0) {
//             const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//             const canvas = faceapi.createCanvasFromMedia(video, {
//                 willReadFrequently: true,
//             });
//             document.body.append(canvas);

//             const displaySize = { width: video.width, height: video.height };
//             faceapi.matchDimensions(canvas, displaySize);

//             const processResults = async (results, resizedDetections) => {
//                 for (let i = 0; i < results.length; i++) {
//                     const result = results[i];
//                     const box = resizedDetections[i].detection.box;
//                     const drawBox = new faceapi.draw.DrawBox(box, {
//                         label: result.toString(),
//                     });
//                     drawBox.draw(canvas);

//                     if (result.label && !emailSent[result.label]) {
//                         emailSent[result.label] = true;

//                         const emp_code = result.label;
//                         const attendanceType = "Check-in";
//                         const apikey = "qwerty!"; 
//                         const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
//                         console.log("Sending POST request with data:", postData);

//                         try {
//                             const response = await fetch('../attendance.php', {
//                                 method: 'POST',
//                                 headers: {
//                                     'Content-Type': 'application/x-www-form-urlencoded',
//                                 },
//                                 body: postData,
//                             });

//                             if (response.ok) {
//                                 const data = await response.text();
//                                 console.log(`Attendance sent successfully for ${emp_code}:`, data);

//                                 // Get employee location
//                                 navigator.geolocation.getCurrentPosition(
//                                     (position) => {
//                                         const latitude = position.coords.latitude;
//                                         const longitude = position.coords.longitude;
//                                         console.log(`Employee ${emp_code} location: Latitude - ${latitude}, Longitude - ${longitude}`);
//                                     },
//                                     (error) => {
//                                         console.error("Error fetching location:", error);
//                                     }
//                                 );
//                             } else {
//                                 console.error(`Failed to send attendance for ${emp_code}:`, response.statusText);
//                             }
//                         } catch (error) {
//                             console.error('Error sending attendance:', error);
//                         }
//                     }
//                 }
//             };

//             setInterval(async () => {
//                 const detections = await faceapi
//                     .detectAllFaces(video)
//                     .withFaceLandmarks()
//                     .withFaceDescriptors();

//                 const resizedDetections = faceapi.resizeResults(
//                     detections,
//                     displaySize
//                 );

//                 canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//                 const results = resizedDetections.map((d) => {
//                     return faceMatcher.findBestMatch(d.descriptor);
//                 });

//                 processResults(results, resizedDetections);
//             }, 100);
//         }
//     } catch (error) {
//         console.error("Error in video play event:", error);
//     }
// });






// const video = document.getElementById("video");
// let emailSent = {};

// // Define boundaries for the desired location
// const boundaries = {
//     north: 37.8049,  // Northern latitude
//     south: 37.7749,  // Southern latitude
//     east: -122.4194, // Eastern longitude
//     west: -122.4494   // Western longitude
// };

// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false,
//         })
//         .then((stream) => {
//             video.srcObject = stream;
//             console.log("Webcam started successfully");
//         })
//         .catch((error) => {
//             console.error("Error starting webcam:", error);
//         });
// }

// async function getFolderNames() {
//     try {
//         const response = await fetch('./list_folders.php');
//         const folderNames = await response.json();
//         return folderNames;
//     } catch (error) {
//         console.error('Error fetching folder names:', error);
//         return [];
//     }
// }

// async function getEmployeeArrivalData() {
//     try {
//         const response = await fetch('../get_attendance.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         return [];
//     }
// }

// async function getEmployeeData() {
//     try {
//         const response = await fetch('../get_employee_records.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.log('Error fetching employee data:', error);
//         return [];
//     }
// }

// async function getLabeledFaceDescriptions() {
//     try {
//         document.getElementById("loader").classList.remove("hidden");
//         document.body.classList.add("loading");

//         const labels = await getFolderNames();
//         const emp = await getEmployeeArrivalData();
//         const empData = await getEmployeeData();

//         const labeledFaceDescriptors = [];

//         for (const label of labels) {
//             const descriptions = [];
//             for (let i = 1; i <= 6; i++) {
//                 const imgPath = `./Labels/${label}/${i}.jpg`;
//                 const img = await faceapi.fetchImage(imgPath);

//                 const detections = await faceapi
//                     .detectSingleFace(img)
//                     .withFaceLandmarks()
//                     .withFaceDescriptor();

//                 if (detections && detections.descriptor) {
//                     descriptions.push(detections.descriptor);
//                 } else {
//                     console.warn(`No face detected in image ${i} of ${label}`);
//                 }
//             }

//             if (descriptions.length > 0) {
//                 const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//                     label,
//                     descriptions
//                 );
//                 labeledFaceDescriptors.push(labeledFaceDescriptor);
//             }
//         }

//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");

//         video.play();

//         return labeledFaceDescriptors;
//     } catch (error) {
//         console.error("Error fetching labeled face descriptors:", error);
//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");
//         return [];
//     }
// }

// // Function to check if the user is inside the defined boundaries
// function isInsideBoundaries(lat, lon) {
//     return (
//         lat <= boundaries.north &&
//         lat >= boundaries.south &&
//         lon <= boundaries.east &&
//         lon >= boundaries.west
//     );
// }

// video.addEventListener("play", async () => {
//     try {
//         const labeledFaceDescriptors = await getLabeledFaceDescriptions();
//         if (labeledFaceDescriptors.length > 0) {
//             const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//             const canvas = faceapi.createCanvasFromMedia(video, {
//                 willReadFrequently: true,
//             });
//             document.body.append(canvas);

//             const displaySize = { width: video.width, height: video.height };
//             faceapi.matchDimensions(canvas, displaySize);

//             const processResults = async (results, resizedDetections) => {
//                 for (let i = 0; i < results.length; i++) {
//                     const result = results[i];
//                     const box = resizedDetections[i].detection.box;
//                     const drawBox = new faceapi.draw.DrawBox(box, {
//                         label: result.toString(),
//                     });
//                     drawBox.draw(canvas);

//                     if (result.label && !emailSent[result.label]) {
//                         emailSent[result.label] = true;

//                         const emp_code = result.label;

//                         // Get employee location
//                         navigator.geolocation.getCurrentPosition(
//                             (position) => {
//                                 const latitude = position.coords.latitude;
//                                 const longitude = position.coords.longitude;

//                                 // Check if the user is inside the defined boundaries
//                                 if (isInsideBoundaries(latitude, longitude)) {
//                                     console.log(`Employee ${emp_code} location: Latitude - ${latitude}, Longitude - ${longitude}`);

//                                     const attendanceType = "Check-in";
//                                     const apikey = "qwerty!"; 
//                                     const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
//                                     console.log("Sending POST request with data:", postData);

//                                     // Sending attendance data
//                                     fetch('../attendance.php', {
//                                         method: 'POST',
//                                         headers: {
//                                             'Content-Type': 'application/x-www-form-urlencoded',
//                                         },
//                                         body: postData,
//                                     })
//                                     .then((response) => {
//                                         if (response.ok) {
//                                             return response.text();
//                                         } else {
//                                             throw new Error(`Failed to send attendance for ${emp_code}: ${response.statusText}`);
//                                         }
//                                     })
//                                     .then((data) => {
//                                         console.log(`Attendance sent successfully for ${emp_code}:`, data);
//                                     })
//                                     .catch((error) => {
//                                         console.error('Error sending attendance:', error);
//                                     });
//                                 } else {
//                                     console.error("You are outside the designated location.");
//                                     alert("You are outside the designated location.");
//                                 }
//                             },
//                             (error) => {
//                                 console.error("Error fetching location:", error);
//                             }
//                         );
//                     }
//                 }
//             };

//             setInterval(async () => {
//                 const detections = await faceapi
//                     .detectAllFaces(video)
//                     .withFaceLandmarks()
//                     .withFaceDescriptors();

//                 const resizedDetections = faceapi.resizeResults(
//                     detections,
//                     displaySize
//                 );

//                 canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//                 const results = resizedDetections.map((d) => {
//                     return faceMatcher.findBestMatch(d.descriptor);
//                 });

//                 processResults(results, resizedDetections);
//             }, 100);
//         }
//     } catch (error) {
//         console.error("Error in video play event:", error);
//     }
// });


// const video = document.getElementById("video");
// let emailSent = {};

// // Define boundaries for the desired location
// const boundaries = {
//     north: 37.8049,  // Northern latitude
//     south: 37.7749,  // Southern latitude
//     east: -122.4194, // Eastern longitude
//     west: -122.4494   // Western longitude
// };

// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false,
//         })
//         .then((stream) => {
//             video.srcObject = stream;
//             console.log("Webcam started successfully");
//         })
//         .catch((error) => {
//             console.error("Error starting webcam:", error);
//         });
// }

// async function getFolderNames() {
//     try {
//         const response = await fetch('./list_folders.php');
//         const folderNames = await response.json();
//         return folderNames;
//     } catch (error) {
//         console.error('Error fetching folder names:', error);
//         return [];
//     }
// }

// async function getEmployeeArrivalData() {
//     try {
//         const response = await fetch('../get_attendance.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         return [];
//     }
// }

// async function getEmployeeData() {
//     try {
//         const response = await fetch('../get_employee_records.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.log('Error fetching employee data:', error);
//         return [];
//     }
// }

// async function getLabeledFaceDescriptions() {
//     try {
//         document.getElementById("loader").classList.remove("hidden");
//         document.body.classList.add("loading");

//         const labels = await getFolderNames();
//         console.log("Folder names:", labels);
        
//         const emp = await getEmployeeArrivalData();
//         const empData = await getEmployeeData();

//         const labeledFaceDescriptors = [];

//         for (const label of labels) {
//             const descriptions = [];
//             for (let i = 1; i <= 6; i++) {
//                 const imgPath = `./Labels/${label}/${i}.jpg`;
//                 const img = await faceapi.fetchImage(imgPath);

//                 const detections = await faceapi
//                     .detectSingleFace(img)
//                     .withFaceLandmarks()
//                     .withFaceDescriptor();

//                 if (detections && detections.descriptor) {
//                     descriptions.push(detections.descriptor);
//                 } else {
//                     console.warn(`No face detected in image ${i} of ${label}`);
//                 }
//             }

//             if (descriptions.length > 0) {
//                 const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//                     label,
//                     descriptions
//                 );
//                 labeledFaceDescriptors.push(labeledFaceDescriptor);
//                 console.log(`Added labeled face descriptor for ${label}`);
//             }
//         }

//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");

//         video.play();
//         console.log("Video playback started");

//         return labeledFaceDescriptors;
//     } catch (error) {
//         console.error("Error fetching labeled face descriptors:", error);
//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");
//         return [];
//     }
// }

// // Function to check if the user is inside the defined boundaries
// function isInsideBoundaries(lat, lon) {
//     return (
//         lat <= boundaries.north &&
//         lat >= boundaries.south &&
//         lon <= boundaries.east &&
//         lon >= boundaries.west
//     );
// }

// video.addEventListener("play", async () => {
//     try {
//         const labeledFaceDescriptors = await getLabeledFaceDescriptions();
//         if (labeledFaceDescriptors.length > 0) {
//             const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//             const canvas = faceapi.createCanvasFromMedia(video, {
//                 willReadFrequently: true,
//             });
//             document.body.append(canvas);

//             const displaySize = { width: video.width, height: video.height };
//             faceapi.matchDimensions(canvas, displaySize);
//             console.log("Canvas for video created");

//             const processResults = async (results, resizedDetections) => {
//                 for (let i = 0; i < results.length; i++) {
//                     const result = results[i];
//                     const box = resizedDetections[i].detection.box;
//                     const drawBox = new faceapi.draw.DrawBox(box, {
//                         label: result.toString(),
//                     });
//                     drawBox.draw(canvas);

//                     if (result.label && !emailSent[result.label]) {
//                         emailSent[result.label] = true;
//                         const emp_code = result.label;
//                         console.log(`Detected employee code: ${emp_code}`);

//                         // Get employee location
//                         navigator.geolocation.getCurrentPosition(
//                             (position) => {
//                                 const latitude = position.coords.latitude;
//                                 const longitude = position.coords.longitude;
//                                 console.log(`Employee ${emp_code} location: Latitude - ${latitude}, Longitude - ${longitude}`);

//                                 // Check if the user is inside the defined boundaries
//                                 if (isInsideBoundaries(latitude, longitude)) {
//                                     console.log(`Inside designated location for ${emp_code}`);

//                                     const attendanceType = "Check-in";
//                                     const apikey = "qwerty!"; 
//                                     const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
//                                     console.log("Sending POST request with data:", postData);

//                                     // Sending attendance data
//                                     fetch('../attendance.php', {
//                                         method: 'POST',
//                                         headers: {
//                                             'Content-Type': 'application/x-www-form-urlencoded',
//                                         },
//                                         body: postData,
//                                     })
//                                     .then((response) => {
//                                         if (response.ok) {
//                                             return response.text();
//                                         } else {
//                                             throw new Error(`Failed to send attendance for ${emp_code}: ${response.statusText}`);
//                                         }
//                                     })
//                                     .then((data) => {
//                                         console.log(`Attendance sent successfully for ${emp_code}:`, data);
//                                     })
//                                     .catch((error) => {
//                                         console.error('Error sending attendance:', error);
//                                     });
//                                 } else {
//                                     console.error("You are outside the designated location.");
//                                     alert("You are outside the designated location.");
//                                     return; // Stop execution if outside location
//                                 }
//                             },
//                             (error) => {
//                                 console.error("Error fetching location:", error);
//                             }
//                         );
//                     }
//                 }
//             };

//             setInterval(async () => {
//                 const detections = await faceapi
//                     .detectAllFaces(video)
//                     .withFaceLandmarks()
//                     .withFaceDescriptors();

//                 const resizedDetections = faceapi.resizeResults(
//                     detections,
//                     displaySize
//                 );

//                 canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//                 const results = resizedDetections.map((d) => {
//                     return faceMatcher.findBestMatch(d.descriptor);
//                 });

//                 processResults(results, resizedDetections);
//             }, 100);
//         }
//     } catch (error) {
//         console.error("Error in video play event:", error);
//     }
// });

// //latest working code with everything
// const video = document.getElementById("video");
// let emailSent = {};

// const boundaries = {
//     // north: 32.812861,  
//     north: 75.812861,  

//     // south: 37.7749,  
//     // east: 74.8196915, 
//     east: 56.8196915, 

//     // west: -122.4494   
// };

// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false,
//         })
//         .then((stream) => {
//             video.srcObject = stream;
//             console.log("Webcam started successfully");
//         })
//         .catch((error) => {
//             console.error("Error starting webcam:", error);
//         });
// }

// async function getFolderNames() {
//     try {
//         const response = await fetch('./list_folders.php');
//         const folderNames = await response.json();
//         return folderNames;
//     } catch (error) {
//         console.error('Error fetching folder names:', error);
//         return [];
//     }
// }

// async function getEmployeeArrivalData() {
//     try {
//         const response = await fetch('../get_attendance.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         return [];
//     }
// }

// async function getEmployeeData() {
//     try {
//         const response = await fetch('../get_employee_records.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.log('Error fetching employee data:', error);
//         return [];
//     }
// }

// async function getLabeledFaceDescriptions() {
//     try {
//         document.getElementById("loader").classList.remove("hidden");
//         document.body.classList.add("loading");

//         const labels = await getFolderNames();
//         console.log("Folder names:", labels);
        
//         const emp = await getEmployeeArrivalData();
//         const empData = await getEmployeeData();

//         const labeledFaceDescriptors = [];

//         for (const label of labels) {
//             const descriptions = [];
//             for (let i = 1; i <= 6; i++) {
//                 const imgPath = `./Labels/${label}/${i}.jpg`;
//                 const img = await faceapi.fetchImage(imgPath);

//                 const detections = await faceapi
//                     .detectSingleFace(img)
//                     .withFaceLandmarks()
//                     .withFaceDescriptor();

//                 if (detections && detections.descriptor) {
//                     descriptions.push(detections.descriptor);
//                 } else {
//                     console.warn(`No face detected in image ${i} of ${label}`);
//                 }
//             }

//             if (descriptions.length > 0) {
//                 const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//                     label,
//                     descriptions
//                 );
//                 labeledFaceDescriptors.push(labeledFaceDescriptor);
//                 console.log(`Added labeled face descriptor for ${label}`);
//             }
//         }

//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");

//         video.play();
//         console.log("Video playback started");

//         return labeledFaceDescriptors;
//     } catch (error) {
//         console.error("Error fetching labeled face descriptors:", error);
//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");
//         return [];
//     }
// }

// function isInsideBoundaries(lat, lon) {
//     return (
//         lat <= boundaries.north &&
//         // lat >= boundaries.south &&
//         // lon <= boundaries.east &&
//         lon <= boundaries.east
//         // lon >= boundaries.west
//     );
// }

// video.addEventListener("play", async () => {
//     try {
//         const labeledFaceDescriptors = await getLabeledFaceDescriptions();
//         if (labeledFaceDescriptors.length > 0) {
//             const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//             const canvas = faceapi.createCanvasFromMedia(video, {
//                 willReadFrequently: true,
//             });
//             document.body.append(canvas);

//             const displaySize = { width: video.width, height: video.height };
//             faceapi.matchDimensions(canvas, displaySize);
//             console.log("Canvas for video created");

//             const processResults = async (results, resizedDetections) => {
//                 for (let i = 0; i < results.length; i++) {
//                     const result = results[i];
//                     const box = resizedDetections[i].detection.box;
//                     const drawBox = new faceapi.draw.DrawBox(box, {
//                         label: result.toString(),
//                     });
//                     drawBox.draw(canvas);

//                     if (result.label && !emailSent[result.label]) {
//                         emailSent[result.label] = true;
//                         const emp_code = result.label;
//                         console.log(`Detected employee code: ${emp_code}`);

//                         // employee location
//                         navigator.geolocation.getCurrentPosition(
//                             (position) => {
//                                 const latitude = position.coords.latitude;
//                                 const longitude = position.coords.longitude;
//                                 console.log(`Employee location: Latitude - ${latitude}, Longitude - ${longitude}`);

//                                 // Check if the user is inside the defined boundaries
//                                 if (isInsideBoundaries(latitude, longitude)) {
//                                     console.log(`Inside designated location for ${emp_code}`);

//                                     const attendanceType = "Check-in";
//                                     const apikey = "qwerty!"; 
//                                     const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
//                                     console.log("Sending POST request with data:", postData);

//                                     // Sending attendance data
//                                     fetch('../attendance.php', {
//                                         method: 'POST',
//                                         headers: {
//                                             'Content-Type': 'application/x-www-form-urlencoded',
//                                         },
//                                         body: postData,
//                                     })
//                                     .then((response) => {
//                                         if (response.ok) {
//                                             return response.text();
//                                         } else {
//                                             throw new Error(`Failed to send attendance for ${emp_code}: ${response.statusText}`);
//                                         }
//                                     })
//                                     .then((data) => {
//                                         console.log(`Attendance sent successfully for ${emp_code}:`, data);
//                                         alert(`Hi ${emp_code}, Your attendance has been marked`);
//                                     })
//                                     .catch((error) => {
//                                         console.error('Error sending attendance:', error);
//                                     });
//                                 } else {
//                                     console.error("You are outside the designated location.so cant send the request");
//                                     alert(`Hi ${emp_code}, You are outside the designated location So, attendance will not be marked`);
//                                     emailSent[result.label] = false; 
//                                     return; 
//                                 }
//                             },
//                             (error) => {
//                                 console.error("Error fetching location:", error);
//                             }
//                         );
//                     }
//                 }
//             };

//             setInterval(async () => {
//                 const detections = await faceapi
//                     .detectAllFaces(video)
//                     .withFaceLandmarks()
//                     .withFaceDescriptors();

//                 const resizedDetections = faceapi.resizeResults(
//                     detections,
//                     displaySize
//                 );

//                 canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//                 const results = resizedDetections.map((d) => {
//                     return faceMatcher.findBestMatch(d.descriptor);
//                 });

//                 processResults(results, resizedDetections);
//             }, 100);
//         }
//     } catch (error) {
//         console.error("Error in video play event:", error);
//     }
// });



// import Swal from "sweetalert2";
// const video = document.getElementById("video");
// let emailSent = {};

// const boundaries = {
//     // north: 75.812861,
//     north: 32.812861,
//     // east: 56.8196915,
//     east: 74.8196915,
// };

// const GOOGLE_API_KEY = 'AIzaSyDBjmH_N8taHpt3JIrfMv5iSTaO5LhZwok'; 

// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false,
//         })
//         .then((stream) => {
//             video.srcObject = stream;
//             console.log("Webcam started successfully");
//         })
//         .catch((error) => {
//             console.error("Error starting webcam:", error);
//         });
// }

// async function getFolderNames() {
//     try {
//         const response = await fetch('./list_folders.php');
//         const folderNames = await response.json();
//         return folderNames;
//     } catch (error) {
//         console.error('Error fetching folder names:', error);
//         return [];
//     }
// }

// async function getEmployeeArrivalData() {
//     try {
//         const response = await fetch('../get_attendance.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         return [];
//     }
// }

// async function getEmployeeData() {
//     try {
//         const response = await fetch('../get_employee_records.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.log('Error fetching employee data:', error);
//         return [];
//     }
// }

// async function getLabeledFaceDescriptions() {
//     try {
//         document.getElementById("loader").classList.remove("hidden");
//         document.body.classList.add("loading");

//         const labels = await getFolderNames();
//         console.log("Folder names:", labels);
        
//         const emp = await getEmployeeArrivalData();
//         const empData = await getEmployeeData();

//         const labeledFaceDescriptors = [];

//         for (const label of labels) {
//             const descriptions = [];
//             for (let i = 1; i <= 6; i++) {
//                 const imgPath = `./Labels/${label}/${i}.jpg`;
//                 const img = await faceapi.fetchImage(imgPath);

//                 const detections = await faceapi
//                     .detectSingleFace(img)
//                     .withFaceLandmarks()
//                     .withFaceDescriptor();

//                 if (detections && detections.descriptor) {
//                     descriptions.push(detections.descriptor);
//                 } else {
//                     console.warn(`No face detected in image ${i} of ${label}`);
//                 }
//             }

//             if (descriptions.length > 0) {
//                 const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//                     label,
//                     descriptions
//                 );
//                 labeledFaceDescriptors.push(labeledFaceDescriptor);
//                 console.log(`Added labeled face descriptor for ${label}`);
//             }
//         }

//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");

//         video.play();
//         console.log("Video playback started");

//         return labeledFaceDescriptors;
//     } catch (error) {
//         console.error("Error fetching labeled face descriptors:", error);
//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");
//         return [];
//     }
// }

// function isInsideBoundaries(lat, lon) {
//     return (
//         lat <= boundaries.north &&
//         lon <= boundaries.east
//     );
// }


// async function getEmployeeLocation() {
//     try {
//         const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const data = await response.json();
//         if (data.location) {
//             const latitude = data.location.lat;
//             const longitude = data.location.lng;
//             console.log(`Employee location: Latitude - ${latitude}, Longitude - ${longitude}`);
//             return { latitude, longitude };
//         } else {
//             console.error('No location found in the response:', data);
//             return null;
//         }
//     } catch (error) {
//         console.error("Error fetching location from Google API:", error);
//         return null;
//     }
// }

// video.addEventListener("play", async () => {
//     try {
//         const labeledFaceDescriptors = await getLabeledFaceDescriptions();
//         if (labeledFaceDescriptors.length > 0) {
//             const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//             const canvas = faceapi.createCanvasFromMedia(video, {
//                 willReadFrequently: true,
//             });
//             document.body.append(canvas);

//             const displaySize = { width: video.width, height: video.height };
//             faceapi.matchDimensions(canvas, displaySize);
//             console.log("Canvas for video created");

//             const processResults = async (results, resizedDetections) => {
//                 for (let i = 0; i < results.length; i++) {
//                     const result = results[i];
//                     const box = resizedDetections[i].detection.box;
//                     const drawBox = new faceapi.draw.DrawBox(box, {
//                         label: result.toString(),
//                     });
//                     drawBox.draw(canvas);

//                     if (result.label && !emailSent[result.label]) {
//                         emailSent[result.label] = true;
//                         const emp_code = result.label;
//                         console.log(`Detected employee code: ${emp_code}`);

                        
//                         const location = await getEmployeeLocation();
//                         if (location) {
//                             const { latitude, longitude } = location;

//                             // check boundaries
//                             if (isInsideBoundaries(latitude, longitude)) {
//                                 console.log(`Inside designated location for ${emp_code}`);

//                                 const attendanceType = "Check-in";
//                                 const apikey = "qwerty!"; 
//                                 const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
//                                 console.log("Sending POST request with data:", postData);

//                                 fetch('../attendance.php', {
//                                     method: 'POST',
//                                     headers: {
//                                         'Content-Type': 'application/x-www-form-urlencoded',
//                                     },
//                                     body: postData,
//                                 })
//                                 .then((response) => {
//                                     if (response.ok) {
//                                         return response.text();
//                                     } else {
//                                         throw new Error(`Failed to send attendance for ${emp_code}: ${response.statusText}`);
//                                     }
//                                 })
//                                 .then((data) => {
//                                     console.log(`Attendance sent successfully for ${emp_code}:`, data);
//                                     // alert(`Hi ${emp_code}, Your attendance has been marked`);
//                                     Swal.fire({
//                                         position: "top-end",
//                                         icon: "success",
//                                         title: "Your work has been saved",
//                                         showConfirmButton: false,
//                                         timer: 1500
//                                       });
//                                 })
//                                 .catch((error) => {
//                                     console.error('Error sending attendance:', error);
//                                 });
//                             } else {
//                                 console.error("You are outside the designated location, so attendance will not be marked.");
//                                 alert(`Hi ${emp_code}, You are outside the designated location. So, attendance will not be marked.`);
//                                 emailSent[result.label] = false; 
//                                 return; 
//                             }
//                         } else {
//                             console.error("Could not retrieve employee location.");
//                         }
//                     }
//                 }
//             };

//             setInterval(async () => {
//                 const detections = await faceapi
//                     .detectAllFaces(video)
//                     .withFaceLandmarks()
//                     .withFaceDescriptors();

//                 const resizedDetections = faceapi.resizeResults(
//                     detections,
//                     displaySize
//                 );

//                 canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//                 const results = resizedDetections.map((d) => {
//                     return faceMatcher.findBestMatch(d.descriptor);
//                 });

//                 processResults(results, resizedDetections);
//             }, 100);
//         }
//     } catch (error) {
//         console.error("Error in video play event:", error);
//     }
// });



//import Swal from "sweetalert2";
// const video = document.getElementById("video");
// let emailSent = {};

// const boundaries = {
//     // north: 75.812861,
//     north: 32.812861,
//     // east: 56.8196915,
//     east: 74.8196915,
// };

// const GOOGLE_API_KEY = 'AIzaSyDBjmH_N8taHpt3JIrfMv5iSTaO5LhZwok'; 

// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false,
//         })
//         .then((stream) => {
//             video.srcObject = stream;
//             console.log("Webcam started successfully");
//         })
//         .catch((error) => {
//             console.error("Error starting webcam:", error);
//         });
// }

// async function getFolderNames() {
//     try {
//         const response = await fetch('./list_folders.php');
//         const folderNames = await response.json();
//         return folderNames;
//     } catch (error) {
//         console.error('Error fetching folder names:', error);
//         return [];
//     }
// }

// async function getEmployeeArrivalData() {
//     try {
//         const response = await fetch('../get_attendance.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         return [];
//     }
// }

// async function getEmployeeData() {
//     try {
//         const response = await fetch('../get_employee_records.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.log('Error fetching employee data:', error);
//         return [];
//     }
// }

// async function getLabeledFaceDescriptions() {
//     try {
//         document.getElementById("loader").classList.remove("hidden");
//         document.body.classList.add("loading");

//         const labels = await getFolderNames();
//         console.log("Folder names:", labels);
        
//         const emp = await getEmployeeArrivalData();
//         const empData = await getEmployeeData();

//         const labeledFaceDescriptors = [];

//         for (const label of labels) {
//             const descriptions = [];
//             for (let i = 1; i <= 6; i++) {
//                 const imgPath = `./Labels/${label}/${i}.jpg`;
//                 const img = await faceapi.fetchImage(imgPath);

//                 const detections = await faceapi
//                     .detectSingleFace(img)
//                     .withFaceLandmarks()
//                     .withFaceDescriptor();

//                 if (detections && detections.descriptor) {
//                     descriptions.push(detections.descriptor);
//                 } else {
//                     console.warn(`No face detected in image ${i} of ${label}`);
//                 }
//             }

//             if (descriptions.length > 0) {
//                 const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//                     label,
//                     descriptions
//                 );
//                 labeledFaceDescriptors.push(labeledFaceDescriptor);
//                 console.log(`Added labeled face descriptor for ${label}`);
//             }
//         }

//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");

//         video.play();
//         console.log("Video playback started");

//         return labeledFaceDescriptors;
//     } catch (error) {
//         console.error("Error fetching labeled face descriptors:", error);
//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");
//         return [];
//     }
// }

// function isInsideBoundaries(lat, lon) {
//     return (
//         lat <= boundaries.north &&
//         lon <= boundaries.east
//     );
// }


// async function getEmployeeLocation() {
//     try {
//         const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const data = await response.json();
//         if (data.location) {
//             const latitude = data.location.lat;
//             const longitude = data.location.lng;
//             console.log(`Employee location: Latitude - ${latitude}, Longitude - ${longitude}`);
//             return { latitude, longitude };
//         } else {
//             console.error('No location found in the response:', data);
//             return null;
//         }
//     } catch (error) {
//         console.error("Error fetching location from Google API:", error);
//         return null;
//     }
// }

// video.addEventListener("play", async () => {
//     try {
//         const labeledFaceDescriptors = await getLabeledFaceDescriptions();
//         if (labeledFaceDescriptors.length > 0) {
//             const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//             const canvas = faceapi.createCanvasFromMedia(video, {
//                 willReadFrequently: true,
//             });
//             document.body.append(canvas);

//             const displaySize = { width: video.width, height: video.height };
//             faceapi.matchDimensions(canvas, displaySize);
//             console.log("Canvas for video created");

//             const processResults = async (results, resizedDetections) => {
//                 for (let i = 0; i < results.length; i++) {
//                     const result = results[i];
//                     const box = resizedDetections[i].detection.box;
//                     const drawBox = new faceapi.draw.DrawBox(box, {
//                         label: result.toString(),
//                     });
//                     drawBox.draw(canvas);

//                     if (result.label && !emailSent[result.label]) {
//                         emailSent[result.label] = true;
//                         const emp_code = result.label;
//                         console.log(`Detected employee code: ${emp_code}`);

                        
//                         const location = await getEmployeeLocation();
//                         if (location) {
//                             const { latitude, longitude } = location;

//                             // check boundaries
//                             if (isInsideBoundaries(latitude, longitude)) {
//                                 console.log(`Inside designated location for ${emp_code}`);

//                                 const attendanceType = "Check-in";
//                                 const apikey = "qwerty!"; 
//                                 const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
//                                 console.log("Sending POST request with data:", postData);

//                                 fetch('../attendance.php', {
//                                     method: 'POST',
//                                     headers: {
//                                         'Content-Type': 'application/x-www-form-urlencoded',
//                                     },
//                                     body: postData,
//                                 })
//                                 .then((response) => {
//                                     if (response.ok) {
//                                         return response.text();
//                                     } else {
//                                         throw new Error(`Failed to send attendance for ${emp_code}: ${response.statusText}`);
//                                     }
//                                 })
//                                 .then((data) => {
//                                     console.log(`Attendance sent successfully for ${emp_code}:`, data);
//                                     // alert(`Hi ${emp_code}, Your attendance has been marked`);
//                                     Swal.fire({
//                                         position: "top-end",
//                                         icon: "success",
//                                         title: "Your work has been saved",
//                                         showConfirmButton: false,
//                                         timer: 1500
//                                       });
//                                 })
//                                 .catch((error) => {
//                                     console.error('Error sending attendance:', error);
//                                 });
//                             } else {
//                                 console.error("You are outside the designated location, so attendance will not be marked.");
//                                 alert(`Hi ${emp_code}, You are outside the designated location. So, attendance will not be marked.`);
//                                 emailSent[result.label] = false; 
//                                 return; 
//                             }
//                         } else {
//                             console.error("Could not retrieve employee location.");
//                         }
//                     }
//                 }
//             };

//             setInterval(async () => {
//                 const detections = await faceapi
//                     .detectAllFaces(video)
//                     .withFaceLandmarks()
//                     .withFaceDescriptors();

//                 const resizedDetections = faceapi.resizeResults(
//                     detections,
//                     displaySize
//                 );

//                 canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//                 const results = resizedDetections.map((d) => {
//                     return faceMatcher.findBestMatch(d.descriptor);
//                 });

//                 processResults(results, resizedDetections);
//             }, 100);
//         }
//     } catch (error) {
//         console.error("Error in video play event:", error);
//     }
// });




// const video = document.getElementById("video");
// let emailSent = {};

// const boundaries = {
//     north: 75.812861,
//     // north: 32.812861,
//     east: 56.8196915,
//     // east: 74.8196915,
// };

// const GOOGLE_API_KEY = 'AIzaSyDBjmH_N8taHpt3JIrfMv5iSTaO5LhZwok'; 

// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false,
//         })
//         .then((stream) => {
//             video.srcObject = stream;
//             console.log("Webcam started successfully");
//         })
//         .catch((error) => {
//             console.error("Error starting webcam:", error);
//         });
// }

// async function getFolderNames() {
//     try {
//         const response = await fetch('./list_folders.php');
//         const folderNames = await response.json();
//         return folderNames;
//     } catch (error) {
//         console.error('Error fetching folder names:', error);
//         return [];
//     }
// }

// async function getEmployeeArrivalData() {
//     try {
//         const response = await fetch('../get_attendance.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         return [];
//     }
// }

// async function getEmployeeData() {
//     try {
//         const response = await fetch('../get_employee_records.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.log('Error fetching employee data:', error);
//         return [];
//     }
// }

// async function getLabeledFaceDescriptions() {
//     try {
//         document.getElementById("loader").classList.remove("hidden");
//         document.body.classList.add("loading");

//         const labels = await getFolderNames();
//         console.log("Folder names:", labels);
        
//         const emp = await getEmployeeArrivalData();
//         const empData = await getEmployeeData();

//         const labeledFaceDescriptors = [];

//         for (const label of labels) {
//             const descriptions = [];
//             for (let i = 1; i <= 6; i++) {
//                 const imgPath = `./Labels/${label}/${i}.jpg`;
//                 const img = await faceapi.fetchImage(imgPath);

//                 const detections = await faceapi
//                     .detectSingleFace(img)
//                     .withFaceLandmarks()
//                     .withFaceDescriptor();

//                 if (detections && detections.descriptor) {
//                     descriptions.push(detections.descriptor);
//                 } else {
//                     console.warn(`No face detected in image ${i} of ${label}`);
//                 }
//             }

//             if (descriptions.length > 0) {
//                 const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//                     label,
//                     descriptions
//                 );
//                 labeledFaceDescriptors.push(labeledFaceDescriptor);
//                 console.log(`Added labeled face descriptor for ${label}`);
//             }
//         }

//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");

//         video.play();
//         console.log("Video playback started");

//         return labeledFaceDescriptors;
//     } catch (error) {
//         console.error("Error fetching labeled face descriptors:", error);
//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");
//         return [];
//     }
// }

// function isInsideBoundaries(lat, lon) {
//     return (
//         lat <= boundaries.north &&
//         lon <= boundaries.east
//     );
// }


// async function getEmployeeLocation() {
//     try {
//         const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const data = await response.json();
//         if (data.location) {
//             const latitude = data.location.lat;
//             const longitude = data.location.lng;
//             console.log(`Employee location: Latitude - ${latitude}, Longitude - ${longitude}`);
//             return { latitude, longitude };
//         } else {
//             console.error('No location found in the response:', data);
//             return null;
//         }
//     } catch (error) {
//         console.error("Error fetching location from Google API:", error);
//         return null;
//     }
// }

// video.addEventListener("play", async () => {
//     try {
//         const labeledFaceDescriptors = await getLabeledFaceDescriptions();
//         if (labeledFaceDescriptors.length > 0) {
//             const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//             const canvas = faceapi.createCanvasFromMedia(video, {
//                 willReadFrequently: true,
//             });
//             document.body.append(canvas);

//             const displaySize = { width: video.width, height: video.height };
//             faceapi.matchDimensions(canvas, displaySize);
//             console.log("Canvas for video created");

//             const processResults = async (results, resizedDetections) => {
//                 for (let i = 0; i < results.length; i++) {
//                     const result = results[i];
//                     const box = resizedDetections[i].detection.box;
//                     const drawBox = new faceapi.draw.DrawBox(box, {
//                         label: result.toString(),
//                     });
//                     drawBox.draw(canvas);

//                     if (result.label && !emailSent[result.label]) {
//                         emailSent[result.label] = true;
//                         const emp_code = result.label;
//                         console.log(`Detected employee code: ${emp_code}`);

                        
//                         const location = await getEmployeeLocation();
//                         if (location) {
//                             const { latitude, longitude } = location;

//                             // check boundaries
//                             if (isInsideBoundaries(latitude, longitude)) {
//                                 console.log(`Inside designated location for ${emp_code}`);

//                                 const attendanceType = "Check-in";
//                                 const apikey = "qwerty!"; 
//                                 const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
//                                 console.log("Sending POST request with data:", postData);

//                                 fetch('../attendance.php', {
//                                     method: 'POST',
//                                     headers: {
//                                         'Content-Type': 'application/x-www-form-urlencoded',
//                                     },
//                                     body: postData,
//                                 })
//                                 .then((response) => {
//                                     if (response.ok) {
//                                         return response.text();
//                                     } else {
//                                         throw new Error(`Failed to send attendance for ${emp_code}: ${response.statusText}`);
//                                     }
//                                 })
//                                 .then((data) => {
//                                     console.log(`Attendance sent successfully for ${emp_code}:`, data);
//                                     // alert(`Hi ${emp_code}, Your attendance has been marked`);
//                                     Swal.fire({
//                                         position: "center",
//                                         icon: "success",
//                                         title: `HI ${emp_code}, Your Attendance Has been marked`,
//                                         showConfirmButton: false,
//                                         timer: 2500
//                                       });
//                                 })
//                                 .catch((error) => {
//                                     console.error('Error sending attendance:', error);
//                                 });
//                             } else {
//                                 console.error("You are outside the designated location, so attendance will not be marked.");
//                                 // alert(`Hi ${emp_code}, You are outside the designated location. So, attendance will not be marked.`);
//                                 Swal.fire({
//                                     icon: "error",
//                                     title: `HI ${emp_code}`,
//                                     text: "Your Attendance is not marked as you are outside the campus",
//                                     // footer: '<a href="#">Why do I have this issue?</a>'
//                                   });
//                                 emailSent[result.label] = false; 
//                                 return; 
//                             }
//                         } else {
//                             console.error("Could not retrieve employee location.");
//                         }
//                     }
//                 }
//             };

//             setInterval(async () => {
//                 const detections = await faceapi
//                     .detectAllFaces(video)
//                     .withFaceLandmarks()
//                     .withFaceDescriptors();

//                 const resizedDetections = faceapi.resizeResults(
//                     detections,
//                     displaySize
//                 );

//                 canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//                 const results = resizedDetections.map((d) => {
//                     return faceMatcher.findBestMatch(d.descriptor);
//                 });

//                 processResults(results, resizedDetections);
//             }, 100);
//         }
//     } catch (error) {
//         console.error("Error in video play event:", error);
//     }
// });



//const video = document.getElementById("video");
// let emailSent = {};
// let alertShown = {}; 
// const boundaries = {
//     // north: 75.812861,
//     // east: 56.8196915,
//     north: 32.812861,
//     east: 74.8196915,
// };

// const GOOGLE_API_KEY = 'AIzaSyDBjmH_N8taHpt3JIrfMv5iSTaO5LhZwok'; 

// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false,
//         })
//         .then((stream) => {
//             video.srcObject = stream;
//             console.log("Webcam started successfully");
//         })
//         .catch((error) => {
//             console.error("Error starting webcam:", error);
//         });
// }

// async function getFolderNames() {
//     try {
//         const response = await fetch('./list_folders.php');
//         const folderNames = await response.json();
//         return folderNames;
//     } catch (error) {
//         console.error('Error fetching folder names:', error);
//         return [];
//     }
// }

// async function getEmployeeArrivalData() {
//     try {
//         const response = await fetch('../get_attendance.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         return [];
//     }
// }

// async function getEmployeeData() {
//     try {
//         const response = await fetch('../get_employee_records.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.log('Error fetching employee data:', error);
//         return [];
//     }
// }

// async function getLabeledFaceDescriptions() {
//     try {
//         document.getElementById("loader").classList.remove("hidden");
//         document.body.classList.add("loading");

//         const labels = await getFolderNames();
//         console.log("Folder names:", labels);
        
//         const emp = await getEmployeeArrivalData();
//         const empData = await getEmployeeData();

//         const labeledFaceDescriptors = [];

//         for (const label of labels) {
//             const descriptions = [];
//             for (let i = 1; i <= 6; i++) {
//                 const imgPath = `./Labels/${label}/${i}.jpg`;
//                 const img = await faceapi.fetchImage(imgPath);

//                 const detections = await faceapi
//                     .detectSingleFace(img)
//                     .withFaceLandmarks()
//                     .withFaceDescriptor();

//                 if (detections && detections.descriptor) {
//                     descriptions.push(detections.descriptor);
//                 } else {
//                     console.warn(`No face detected in image ${i} of ${label}`);
//                 }
//             }

//             if (descriptions.length > 0) {
//                 const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//                     label,
//                     descriptions
//                 );
//                 labeledFaceDescriptors.push(labeledFaceDescriptor);
//                 console.log(`Added labeled face descriptor for ${label}`);
//             }
//         }

//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");

//         video.play();
//         console.log("Video playback started");

//         return labeledFaceDescriptors;
//     } catch (error) {
//         console.error("Error fetching labeled face descriptors:", error);
//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");
//         return [];
//     }
// }

// function isInsideBoundaries(lat, lon) {
//     return (
//         lat <= boundaries.north &&
//         lon <= boundaries.east
//     );
// }

// async function getEmployeeLocation() {
//     try {
//         const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const data = await response.json();
//         if (data.location) {
//             const latitude = data.location.lat;
//             const longitude = data.location.lng;
//             console.log(`Employee location: Latitude - ${latitude}, Longitude - ${longitude}`);
//             return { latitude, longitude };
//         } else {
//             console.error('No location found in the response:', data);
//             return null;
//         }
//     } catch (error) {
//         console.error("Error fetching location from Google API:", error);
//         return null;
//     }
// }


// video.addEventListener("play", async () => {
//     try {
//         const labeledFaceDescriptors = await getLabeledFaceDescriptions(); 
//         if (labeledFaceDescriptors.length > 0) {
//             const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//             const canvas = faceapi.createCanvasFromMedia(video, {
//                 willReadFrequently: true,
//             });
//             document.body.append(canvas);

//             const displaySize = { width: video.width, height: video.height };
//             faceapi.matchDimensions(canvas, displaySize);
//             console.log("Canvas for video created");

//             const processResults = async (results, resizedDetections) => {
//                 for (let i = 0; i < results.length; i++) {
//                     const result = results[i];
//                     const box = resizedDetections[i].detection.box;
//                     const drawBox = new faceapi.draw.DrawBox(box, {
//                         label: result.toString(),
//                     });
//                     drawBox.draw(canvas);

//                     if (result.label && !emailSent[result.label]) {
//                         emailSent[result.label] = true;
//                         const emp_code = result.label;
//                         console.log(`Detected employee code: ${emp_code}`);

//                         const location = await getEmployeeLocation();
//                         if (location) {
//                             const { latitude, longitude } = location;

//                             // Check boundaries
//                             if (isInsideBoundaries(latitude, longitude)) {
//                                 console.log(`Inside designated location for ${emp_code}`);

//                                 const attendanceType = "Check-in";
//                                 const apikey = "qwerty!"; 
//                                 const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
//                                 console.log("Sending POST request with data:", postData);

//                                 fetch('../attendance.php', {
//                                     method: 'POST',
//                                     headers: {
//                                         'Content-Type': 'application/x-www-form-urlencoded',
//                                     },
//                                     body: postData,
//                                 })
//                                 .then((response) => {
//                                     if (response.ok) {
//                                         return response.text();
//                                     } else {
//                                         throw new Error(`Failed to send attendance for ${emp_code}: ${response.statusText}`);
//                                     }
//                                 })
//                                 .then((data) => {
//                                     console.log(`Attendance sent successfully for ${emp_code}:`, data);
//                                     Swal.fire({
//                                         position: "center",
//                                         icon: "success",
//                                         title: `Hi ${emp_code}, Your Attendance Has been marked`,
//                                         showConfirmButton: false,
//                                         timer: 2500
//                                     });
//                                 })
//                                 .catch((error) => {
//                                     console.error('Error sending attendance:', error);
//                                 });
//                             } else {
//                                 if (!alertShown[emp_code]) {
//                                     alertShown[emp_code] = true; 
//                                     console.error("You are outside the designated location, so attendance will not be marked.");
//                                     Swal.fire({
//                                         icon: "error",
//                                         title: `Hi ${emp_code}`,
//                                         text: "Your Attendance is not marked as you are outside the campus",
//                                     });
//                                 }
//                                 emailSent[result.label] = false; 
//                                 return; 
//                             }
//                         } else {
//                             console.error("Could not retrieve employee location.");
//                         }
//                     }
//                 }
//             };

//             setInterval(async () => {
//                 const detections = await faceapi
//                     .detectAllFaces(video)
//                     .withFaceLandmarks()
//                     .withFaceDescriptors();

//                 const resizedDetections = faceapi.resizeResults(
//                     detections,
//                     displaySize
//                 );

//                 canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//                 const results = resizedDetections.map((d) => {
//                     return faceMatcher.findBestMatch(d.descriptor);
//                 });

//                 processResults(results, resizedDetections);
//             }, 100);
//         }
//     } catch (error) {
//         console.error("Error in video play event:", error);
//     }
// });




// const video = document.getElementById("video");
// let emailSent = {};
// let alertShown = {}; 
// const boundaries = {
//     north: 32.812861,
//     east: 74.8196915,
// };

// const GOOGLE_API_KEY = 'AIzaSyDBjmH_N8taHpt3JIrfMv5iSTaO5LhZwok'; 

// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false,
//         })
//         .then((stream) => {
//             video.srcObject = stream;
//             console.log("Webcam started successfully");
//         })
//         .catch((error) => {
//             console.error("Error starting webcam:", error);
//         });
// }

// async function getFolderNames() {
//     try {
//         const response = await fetch('./list_folders.php');
//         const folderNames = await response.json();
//         return folderNames;
//     } catch (error) {
//         console.error('Error fetching folder names:', error);
//         return [];
//     }
// }

// async function getEmployeeArrivalData() {
//     try {
//         const response = await fetch('../get_attendance.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         return [];
//     }
// }

// async function getEmployeeData() {
//     try {
//         const response = await fetch('../get_employee_records.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.log('Error fetching employee data:', error);
//         return [];
//     }
// }
// let labeledFaceDescriptors = []; 

// // async function findImagePathWithExtensions(label, i) {
// //     const extensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG']; 
// //     for (const ext of extensions) {
// //         const imgPath = `./Labels/${label}/${i}.${ext}`;
// //         try {
// //             const img = await faceapi.fetchImage(imgPath); 
// //             return img; 
// //         } catch (error) {
            
// //             console.warn(`Image not found: ${imgPath}`);
// //         }
// //     }
// //     return null; 
// // }

// async function getLabeledFaceDescriptions() {
//     try {
//         document.getElementById("loader").classList.remove("hidden");
//         document.body.classList.add("loading");

//         const labels = await getFolderNames();
//         console.log("Folder names:", labels);
        
//         const emp = await getEmployeeArrivalData();
//         const empData = await getEmployeeData();

//         // const labeledFaceDescriptors = [];
//         labeledFaceDescriptors = [];


//         for (const label of labels) {
//             const descriptions = [];
//             for (let i = 1; i <= 6; i++) {
//                 // const imgPath = `./Labels/${label}/${i}.jpg`;
//                 findImagePathWithExtensions(label, i);
//                 const img = await faceapi.fetchImage(imgPath);

//                 const detections = await faceapi
//                     .detectSingleFace(img)
//                     .withFaceLandmarks()
//                     .withFaceDescriptor();

//                 if (detections && detections.descriptor) {
//                     descriptions.push(detections.descriptor);
//                 } else {
//                     console.warn(`No face detected in image ${i} of ${label}`);
//                 }
//             }

//             if (descriptions.length > 0) {
//                 const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//                     label,
//                     descriptions
//                 );
//                 labeledFaceDescriptors.push(labeledFaceDescriptor);
//                 console.log(`Added labeled face descriptor for ${label}`);
//             }
//         }

//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");

//         video.play();
//         console.log("Video playback started");

//         return labeledFaceDescriptors;
//     } catch (error) {
//         console.error("Error fetching labeled face descriptors:", error);
//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");
//         return [];
//     }
// }

// function isInsideBoundaries(lat, lon) {
//     return (
//         lat <= boundaries.north &&
//         lon <= boundaries.east
//     );
// }

// async function getEmployeeLocation() {
// //     let timerInterval;
// // Swal.fire({
// //   title: "Wait Fetching Your Location",
// //   html: "I will close in <b></b> milliseconds.",
// //   timer: 4000,
// //   timerProgressBar: true,
// //   didOpen: () => {
// //     Swal.showLoading();
// //     const timer = Swal.getPopup().querySelector("b");
// //     timerInterval = setInterval(() => {
// //       timer.textContent = `${Swal.getTimerLeft()}`;
// //     }, 100);
// //   },
// //   willClose: () => {
// //     clearInterval(timerInterval);
// //   }
// // }).then((result) => {
// //   /* Read more about handling dismissals below */
// //   if (result.dismiss === Swal.DismissReason.timer) {
// //     console.log("I was closed by the timer");
// //   }
// // });
//     try {
//         const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
            
//         });
//         const data = await response.json();
//         if (data.location) {
//             const latitude = data.location.lat;
//             const longitude = data.location.lng;
//             console.log(`Employee location: Latitude - ${latitude}, Longitude - ${longitude}`);
//             return { latitude, longitude };
//         } else {
//             console.error('No location found in the response:', data);
//             return null;
//         }
//     } catch (error) {
//         console.error("Error fetching location from Google API:", error);
//         return null;
//     }
// }


// video.addEventListener("play", async () => {
//     try {
//         const labeledFaceDescriptors = await getLabeledFaceDescriptions(); 
//         if (labeledFaceDescriptors.length > 0) {
//             const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//             const canvas = faceapi.createCanvasFromMedia(video, {
//                 willReadFrequently: true,
//             });
//             document.body.append(canvas);

//             const displaySize = { width: video.width, height: video.height };
//             faceapi.matchDimensions(canvas, displaySize);
//             console.log("Canvas for video created");

//             // Updated processResults function
//             const processResults = async (results, resizedDetections) => {
//                 for (let i = 0; i < results.length; i++) {
//                     const result = results[i];
//                     const box = resizedDetections[i].detection.box;
//                     const drawBox = new faceapi.draw.DrawBox(box, {
//                         label: result.toString(),
//                     });
//                     drawBox.draw(canvas);

//                     if (result.label === "unknown") {
//                         continue; // Skip further processing 
//                     }

//                     if (result.label && !emailSent[result.label]) {
//                         emailSent[result.label] = true;
//                         const emp_code = result.label;
//                         console.log(`Detected employee code: ${emp_code}`);

//                         const location = await getEmployeeLocation();
//                         if (location) {
//                             const { latitude, longitude } = location;

//                             // Check boundaries
//                             if (isInsideBoundaries(latitude, longitude)) {
//                                 console.log(`Inside designated location for ${emp_code}`);

//                                 const attendanceType = "Check-in";
//                                 const apikey = "qwerty!"; 
//                                 const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
//                                 console.log("Sending POST request with data:", postData);

//                                 fetch('../attendance.php', {
//                                     method: 'POST',
//                                     headers: {
//                                         'Content-Type': 'application/x-www-form-urlencoded',
//                                     },
//                                     body: postData,
//                                 })
//                                 .then((response) => {
//                                     if (response.ok) {
//                                         return response.text();
//                                     } else {
//                                         throw new Error(`Failed to send attendance for ${emp_code}: ${response.statusText}`);
//                                     }
//                                 })
//                                 .then((data) => {
//                                     console.log(`Attendance sent successfully for ${emp_code}:`, data);
//                                     Swal.fire({
//                                         position: "center",
//                                         icon: "success",
//                                         title: `Hi ${emp_code}, Your Attendance Has been marked`,
//                                         showConfirmButton: false,
//                                         timer: 2500
//                                     });
//                                 })
//                                 .catch((error) => {
//                                     console.error('Error sending attendance:', error);
//                                 });
//                             } else {
//                                 if (!alertShown[emp_code]) {
//                                     alertShown[emp_code] = true; 
//                                     console.error("You are outside the designated location, so attendance will not be marked.");
//                                     Swal.fire({
//                                         icon: "error",
//                                         title: `Hi ${emp_code}`,
//                                         text: "Your Attendance is not marked as you are outside the campus",
//                                     });
//                                 }
//                                 emailSent[result.label] = false; 
//                                 return; 
//                             }
//                         } else {
//                             console.error("Could not retrieve employee location.");
//                         }
//                     }
//                 }
//             };

//             setInterval(async () => {
//                 const detections = await faceapi
//                     .detectAllFaces(video)
//                     .withFaceLandmarks()
//                     .withFaceDescriptors();

//                 const resizedDetections = faceapi.resizeResults(
//                     detections,
//                     displaySize
//                 );

//                 canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//                 const results = resizedDetections.map((d) => {
//                     return faceMatcher.findBestMatch(d.descriptor);
//                 });

//                 processResults(results, resizedDetections);
//             }, 100);
//         }
//     } catch (error) {
//         console.error("Error in video play event:", error);
//     }
// });







// const video = document.getElementById("video");
// let emailSent = {};
// let alertShown = {}; 
// const boundaries = {
//     north: 32.812861,
//     east: 74.8196915,
// };

// const GOOGLE_API_KEY = 'AIzaSyDBjmH_N8taHpt3JIrfMv5iSTaO5LhZwok'; 

// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false,
//         })
//         .then((stream) => {
//             video.srcObject = stream;
//             console.log("Webcam started successfully");
//         })
//         .catch((error) => {
//             console.error("Error starting webcam:", error);
//         });
// }

// async function getFolderNames() {
//     try {
//         const response = await fetch('./list_folders.php');
//         const folderNames = await response.json();
//         return folderNames;
//     } catch (error) {
//         console.error('Error fetching folder names:', error);
//         return [];
//     }
// }

// async function getEmployeeArrivalData() {
//     try {
//         const response = await fetch('../get_attendance.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         return [];
//     }
// }

// async function getEmployeeData() {
//     try {
//         const response = await fetch('../get_employee_records.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.log('Error fetching employee data:', error);
//         return [];
//     }
// }
// let labeledFaceDescriptors = []; 

// async function findImagePathWithExtensions(label, i) {
//     const extensions = ['jpg', 'jpeg', 'png']; // List of possible file extensions
//     let imgPath = null;

//     // Check each extension to find the existing image file
//     for (const ext of extensions) {
//         const possibleImgPath = `./Labels/${label}/${i}.${ext}`;
//         try {
//             const response = await fetch(possibleImgPath, { method: 'HEAD' });
//             if (response.ok) {
//                 imgPath = possibleImgPath; // Found a valid image path
//                 break;
//             }
//         } catch (error) {
//             console.warn(`Image not found at: ${possibleImgPath}`);
//         }
//     }

//     if (imgPath) {
//         return imgPath;
//     } else {
//         console.warn(`No valid image found for ${label} image ${i}`);
//         return null;
//     }
// }


// async function getLabeledFaceDescriptions() {
//     try {
//         document.getElementById("loader").classList.remove("hidden");
//         document.body.classList.add("loading");

//         const labels = await getFolderNames(); // Fetch the folder names (labels)
//         console.log("Folder names:", labels);

//         labeledFaceDescriptors = [];

//         for (const label of labels) {
//             const descriptions = [];
//             for (let i = 1; i <= 6; i++) {
//                 const imgPath = await findImagePathWithExtensions(label, i); // Use updated function

//                 if (!imgPath) {
//                     console.warn(`No valid image for label: ${label}, image ${i}`);
//                     continue; // Skip this image if not found
//                 }

//                 const img = await faceapi.fetchImage(imgPath); // Fetch the image

//                 const detections = await faceapi
//                     .detectSingleFace(img)
//                     .withFaceLandmarks()
//                     .withFaceDescriptor();

//                 if (detections && detections.descriptor) {
//                     descriptions.push(detections.descriptor); // Store descriptor if face detected
//                 } else {
//                     console.warn(`No face detected in image ${i} of ${label}`);
//                 }
//             }

//             if (descriptions.length > 0) {
//                 const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//                     label,
//                     descriptions
//                 );
//                 labeledFaceDescriptors.push(labeledFaceDescriptor);
//                 console.log(`Added labeled face descriptor for ${label}`);
//             }
//         }

//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");

//         video.play();
//         console.log("Video playback started");

//         return labeledFaceDescriptors;
//     } catch (error) {
//         console.error("Error fetching labeled face descriptors:", error);
//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");
//         return [];
//     }
// }





// // // Function to dynamically find the correct image path with various extensions
// // async function findImagePathWithExtensions(label, imageName) {
// //     const extensions = ['jpg', 'jpeg', 'png']; // Possible file extensions
// //     let imgPath = null;

// //     // Check each extension for the image
// //     for (const ext of extensions) {
// //         const possibleImgPath = `./Labels/${label}/${imageName}.${ext}`;
// //         try {
// //             const response = await fetch(possibleImgPath, { method: 'HEAD' });
// //             if (response.ok) {
// //                 imgPath = possibleImgPath; // Found a valid image path
// //                 break;
// //             }
// //         } catch (error) {
// //             console.warn(`Image not found at: ${possibleImgPath}`);
// //         }
// //     }

// //     if (imgPath) {
// //         return imgPath;
// //     } else {
// //         console.warn(`No valid image found for ${label} image: ${imageName}`);
// //         return null;
// //     }
// // }

// // // Function to get all the labeled face descriptions dynamically
// // async function getLabeledFaceDescriptions() {
// //     try {
// //         document.getElementById("loader").classList.remove("hidden");
// //         document.body.classList.add("loading");

// //         const labels = await getFolderNames(); // Fetch folder names (labels)
// //         console.log("Folder names:", labels);

// //         labeledFaceDescriptors = [];

// //         for (const label of labels) {
// //             const descriptions = [];

// //             // Dynamically fetch image filenames for the label
// //             const imageNames = await getFolderImages(label); // List of image filenames (without extensions)

// //             for (const imageName of imageNames) {
// //                 const imgPath = await findImagePathWithExtensions(label, imageName); // Find image path

// //                 if (!imgPath) {
// //                     console.warn(`No valid image for label: ${label}, image: ${imageName}`);
// //                     continue; // Skip this image if not found
// //                 }

// //                 const img = await faceapi.fetchImage(imgPath); // Fetch the image

// //                 const detections = await faceapi
// //                     .detectSingleFace(img)
// //                     .withFaceLandmarks()
// //                     .withFaceDescriptor();

// //                 if (detections && detections.descriptor) {
// //                     descriptions.push(detections.descriptor); // Store descriptor if face detected
// //                 } else {
// //                     console.warn(`No face detected in image ${imageName} of ${label}`);
// //                 }
// //             }

// //             if (descriptions.length > 0) {
// //                 const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
// //                     label,
// //                     descriptions
// //                 );
// //                 labeledFaceDescriptors.push(labeledFaceDescriptor);
// //                 console.log(`Added labeled face descriptor for ${label}`);
// //             }
// //         }

// //         document.getElementById("loader").classList.add("hidden");
// //         document.body.classList.remove("loading");

// //         video.play();
// //         console.log("Video playback started");

// //         return labeledFaceDescriptors;
// //     } catch (error) {
// //         console.error("Error fetching labeled face descriptors:", error);
// //         document.getElementById("loader").classList.add("hidden");
// //         document.body.classList.remove("loading");
// //         return [];
// //     }
// // }






// function isInsideBoundaries(lat, lon) {
//     return (
//         lat <= boundaries.north &&
//         lon <= boundaries.east
//     );
// }

// async function getEmployeeLocation() {
// //     let timerInterval;
// // Swal.fire({
// //   title: "Wait Fetching Your Location",
// //   html: "I will close in <b></b> milliseconds.",
// //   timer: 4000,
// //   timerProgressBar: true,
// //   didOpen: () => {
// //     Swal.showLoading();
// //     const timer = Swal.getPopup().querySelector("b");
// //     timerInterval = setInterval(() => {
// //       timer.textContent = `${Swal.getTimerLeft()}`;
// //     }, 100);
// //   },
// //   willClose: () => {
// //     clearInterval(timerInterval);
// //   }
// // }).then((result) => {
// //   /* Read more about handling dismissals below */
// //   if (result.dismiss === Swal.DismissReason.timer) {
// //     console.log("I was closed by the timer");
// //   }
// // });
//     try {
//         const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
            
//         });
//         const data = await response.json();
//         if (data.location) {
//             const latitude = data.location.lat;
//             const longitude = data.location.lng;
//             console.log(`Employee location: Latitude - ${latitude}, Longitude - ${longitude}`);
//             return { latitude, longitude };
//         } else {
//             console.error('No location found in the response:', data);
//             return null;
//         }
//     } catch (error) {
//         console.error("Error fetching location from Google API:", error);
//         return null;
//     }
// }


// video.addEventListener("play", async () => {
//     try {
//         const labeledFaceDescriptors = await getLabeledFaceDescriptions(); 
//         if (labeledFaceDescriptors.length > 0) {
//             const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//             const canvas = faceapi.createCanvasFromMedia(video, {
//                 willReadFrequently: true,
//             });
//             document.body.append(canvas);

//             const displaySize = { width: video.width, height: video.height };
//             faceapi.matchDimensions(canvas, displaySize);
//             console.log("Canvas for video created");

//             // Updated processResults function
//             const processResults = async (results, resizedDetections) => {
//                 for (let i = 0; i < results.length; i++) {
//                     const result = results[i];
//                     const box = resizedDetections[i].detection.box;
//                     const drawBox = new faceapi.draw.DrawBox(box, {
//                         label: result.toString(),
//                     });
//                     drawBox.draw(canvas);

//                     if (result.label === "unknown") {
//                         continue; // Skip further processing 
//                     }

//                     if (result.label && !emailSent[result.label]) {
//                         emailSent[result.label] = true;
//                         const emp_code = result.label;
//                         console.log(`Detected employee code: ${emp_code}`);

//                         const location = await getEmployeeLocation();
//                         if (location) {
//                             const { latitude, longitude } = location;

//                             // Check boundaries
//                             if (isInsideBoundaries(latitude, longitude)) {
//                                 console.log(`Inside designated location for ${emp_code}`);

//                                 const attendanceType = "Check-in";
//                                 const apikey = "qwerty!"; 
//                                 const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
//                                 console.log("Sending POST request with data:", postData);

//                                 fetch('../attendance.php', {
//                                     method: 'POST',
//                                     headers: {
//                                         'Content-Type': 'application/x-www-form-urlencoded',
//                                     },
//                                     body: postData,
//                                 })
//                                 .then((response) => {
//                                     if (response.ok) {
//                                         return response.text();
//                                     } else {
//                                         throw new Error(`Failed to send attendance for ${emp_code}: ${response.statusText}`);
//                                     }
//                                 })
//                                 .then((data) => {
//                                     console.log(`Attendance sent successfully for ${emp_code}:`, data);
//                                     Swal.fire({
//                                         position: "center",
//                                         icon: "success",
//                                         title: `Hi ${emp_code}, Your Attendance Has been marked`,
//                                         showConfirmButton: false,
//                                         timer: 2500
//                                     });
//                                 })
//                                 .catch((error) => {
//                                     console.error('Error sending attendance:', error);
//                                 });
//                             } else {
//                                 if (!alertShown[emp_code]) {
//                                     alertShown[emp_code] = true; 
//                                     console.error("You are outside the designated location, so attendance will not be marked.");
//                                     Swal.fire({
//                                         icon: "error",
//                                         title: `Hi ${emp_code}`,
//                                         text: "Your Attendance is not marked as you are outside the campus",
//                                     });
//                                 }
//                                 emailSent[result.label] = false; 
//                                 return; 
//                             }
//                         } else {
//                             console.error("Could not retrieve employee location.");
//                         }
//                     }
//                 }
//             };

//             setInterval(async () => {
//                 const detections = await faceapi
//                     .detectAllFaces(video)
//                     .withFaceLandmarks()
//                     .withFaceDescriptors();

//                 const resizedDetections = faceapi.resizeResults(
//                     detections,
//                     displaySize
//                 );

//                 canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//                 const results = resizedDetections.map((d) => {
//                     return faceMatcher.findBestMatch(d.descriptor);
//                 });

//                 processResults(results, resizedDetections);
//             }, 100);
//         }
//     } catch (error) {
//         console.error("Error in video play event:", error);
//     }
// });





// const video = document.getElementById("video");
// let emailSent = {};
// let alertShown = {}; 
// const boundaries = {
//     north: 32.812861,
//     east: 74.8196915,
// };
// console.log(emp_code);
// const GOOGLE_API_KEY = 'AIzaSyDBjmH_N8taHpt3JIrfMv5iSTaO5LhZwok'; 
// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false,
//         })
//         .then((stream) => {
//             video.srcObject = stream;
//             console.log("Webcam started successfully");
//         })
//         .catch((error) => {
//             console.error("Error starting webcam:", error);
//         });
// }

//  function getFolderNames(emp_code) {
//     try {
//         const folderNames = [emp_code];
//         return folderNames;
//     } catch (error) {
//         console.error('Error fetching folder names:', error);
//         return [];
//     }
// }

// async function getEmployeeArrivalData() {
//     try {
//         const response = await fetch('../get_attendance.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         return [];
//     }
// }

// async function getEmployeeData() {
//     try {
//         const response = await fetch('../get_employee_records.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.log('Error fetching employee data:', error);
//         return [];
//     }
// }
// let labeledFaceDescriptors = []; 

// async function findImagePathWithExtensions(label, i) {
//     const possibleImgPath = `./Labels/${label}/${i}`; 
//     const extensions = ['jpg', 'JPG']; 
//     for (const ext of extensions) {
//         const imgPath = `${possibleImgPath}.${ext}`; 
//         try {
//             const response = await fetch(imgPath, { method: 'HEAD' });
//             if (response.ok) {
//                 console.log(`Found image at: ${imgPath}`);
//                 return imgPath; 
//             }
//         } catch (error) {
//             console.warn(`Image not found at: ${imgPath}`); // Log if the image is not found
//         }
//     }

//     console.warn(`No valid image found for ${label} image ${i}`);
//     return null; // Return null if no valid image was found
// }


// async function getLabeledFaceDescriptions(emp_code) {
//     try {
//         document.getElementById("loader").classList.remove("hidden");
//         document.body.classList.add("loading");

//         //const labels = await getFolderNames(); // Fetch the folder names (labels)
//         const labels =  getFolderNames(emp_code);
//         console.log("Folder names:", labels);

//         labeledFaceDescriptors = [];

//         for (const label of labels) {
//             const descriptions = [];
//             for (let i = 1; i <= 6; i++) {
//                 const imgPath = await findImagePathWithExtensions(label, i); // Use updated function

//                 if (!imgPath) {
//                     console.warn(`No valid image for label: ${label}, image ${i}`);
//                     continue; // Skip this image if not found
//                 }

//                 const img = await faceapi.fetchImage(imgPath); // Fetch the image

//                 const detections = await faceapi
//                     .detectSingleFace(img)
//                     .withFaceLandmarks()
//                     .withFaceDescriptor();

//                 if (detections && detections.descriptor) {
//                     descriptions.push(detections.descriptor); // Store descriptor if face detected
//                 } else {
//                     console.warn(`No face detected in image ${i} of ${label}`);
//                 }
//             }

//             if (descriptions.length > 0) {
//                 const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//                     label,
//                     descriptions
//                 );
//                 labeledFaceDescriptors.push(labeledFaceDescriptor);
//                 console.log(`Added labeled face descriptor for ${label}`);
//             }
//         }

//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");

//         video.play();
//         console.log("Video playback started");

//         return labeledFaceDescriptors;
//     } catch (error) {
//         console.error("Error fetching labeled face descriptors:", error);
//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");
//         return [];
//     }
// }






// function isInsideBoundaries(lat, lon) {
//     return (
//         lat <= boundaries.north &&
//         lon <= boundaries.east
//     );
// }

// async function getEmployeeLocation() {
//     let timerInterval;
// Swal.fire({
//   title: "Wait Fetching Your Location",
//   html: "I will close in <b></b> milliseconds.",
//   timer: 4000,
//   timerProgressBar: true,
//   didOpen: () => {
//     Swal.showLoading();
//     const timer = Swal.getPopup().querySelector("b");
//     timerInterval = setInterval(() => {
//       timer.textContent = `${Swal.getTimerLeft()}`;
//     }, 100);
//   },
//   willClose: () => {
//     clearInterval(timerInterval);
//   }
// }).then((result) => {
//   /* Read more about handling dismissals below */
//   if (result.dismiss === Swal.DismissReason.timer) {
//     console.log("I was closed by the timer");
//   }
// });
//     try {
//         const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
            
//         });
//         const data = await response.json();
//         if (data.location) {
//             const latitude = data.location.lat;
//             const longitude = data.location.lng;
//             console.log(`Employee location: Latitude - ${latitude}, Longitude - ${longitude}`);
//             return { latitude, longitude };
//         } else {
//             console.error('No location found in the response:', data);
//             return null;
//         }
//     } catch (error) {
//         console.error("Error fetching location from Google API:", error);
//         return null;
//     }
// }


// video.addEventListener("play", async () => {
//     try {
//         const labeledFaceDescriptors = await getLabeledFaceDescriptions(emp_code); 
//         if (labeledFaceDescriptors.length > 0) {
//             const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//             const canvas = faceapi.createCanvasFromMedia(video, {
//                 willReadFrequently: true,
//             });
//             document.body.append(canvas);

//             const displaySize = { width: video.width, height: video.height };
//             faceapi.matchDimensions(canvas, displaySize);
//             console.log("Canvas for video created");

//             // Updated processResults function
//             const processResults = async (results, resizedDetections) => {
//                 for (let i = 0; i < results.length; i++) {
//                     const result = results[i];
//                     const box = resizedDetections[i].detection.box;
//                     const drawBox = new faceapi.draw.DrawBox(box, {
//                         label: result.toString(),
//                     });
//                     drawBox.draw(canvas);

//                     if (result.label === "unknown") {
//                         continue; // Skip further processing 
//                     }

//                     if (result.label && !emailSent[result.label]) {
//                         emailSent[result.label] = true;
//                         const emp_code = result.label;
//                         console.log(`Detected employee code: ${emp_code}`);

//                         const location = await getEmployeeLocation();
//                         if (location) {
//                             const { latitude, longitude } = location;

//                             // Check boundaries
//                             if (isInsideBoundaries(latitude, longitude)) {
//                                 console.log(`Inside designated location for ${emp_code}`);

//                                 const attendanceType = "Check-in";
//                                 const apikey = "qwerty!"; 
//                                 const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
//                                 console.log("Sending POST request with data:", postData);

//                                 fetch('../attendance.php', {
//                                     method: 'POST',
//                                     headers: {
//                                         'Content-Type': 'application/x-www-form-urlencoded',
//                                     },
//                                     body: postData,
//                                 })
//                                 .then((response) => {
//                                     if (response.ok) {
//                                         return response.text();
//                                     } else {
//                                         throw new Error(`Failed to send attendance for ${emp_code}: ${response.statusText}`);
//                                     }
//                                 })
//                                 .then((data) => {
//                                     console.log(`Attendance sent successfully for ${emp_code}:`, data);
//                                     Swal.fire({
//                                         position: "center",
//                                         icon: "success",
//                                         title: `Hi ${emp_code}, Your Attendance Has been marked`,
//                                         showConfirmButton: false,
//                                         timer: 2500
//                                     });
//                                 })
//                                 .catch((error) => {
//                                     console.error('Error sending attendance:', error);
//                                 });
//                             } else {
//                                 if (!alertShown[emp_code]) {
//                                     alertShown[emp_code] = true; 
//                                     console.error("You are outside the designated location, so attendance will not be marked.");
//                                     Swal.fire({
//                                         icon: "error",
//                                         title: `Hi ${emp_code}`,
//                                         text: "Your Attendance is not marked as you are outside the campus",
//                                     });
//                                 }
//                                 emailSent[result.label] = false; 
//                                 return; 
//                             }
//                         } else {
//                             console.error("Could not retrieve employee location.");
//                         }
//                     }
//                 }
//             };

//             setInterval(async () => {
//                 const detections = await faceapi
//                     .detectAllFaces(video)
//                     .withFaceLandmarks()
//                     .withFaceDescriptors();

//                 const resizedDetections = faceapi.resizeResults(
//                     detections,
//                     displaySize
//                 );

//                 canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

//                 const results = resizedDetections.map((d) => {
//                     return faceMatcher.findBestMatch(d.descriptor);
//                 });

//                 processResults(results, resizedDetections);
//             }, 100);
//         }
//     } catch (error) {
//         console.error("Error in video play event:", error);
//     }
// });









const video = document.getElementById("video");
let emailSent = {};
let alertShown = {};
const boundaries = {
    north: 32.812861,
    // north: 32.7483392,
    // east:  74.8617728
    east: 74.8196915,
};
console.log(emp_code);
const GOOGLE_API_KEY = 'AIzaSyDBjmH_N8taHpt3JIrfMv5iSTaO5LhZwok'; 
Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("models"),
]).then(startWebcam);

function startWebcam() {
    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: false,
        })
        .then((stream) => {
            video.srcObject = stream;
            console.log("Webcam started successfully");
        })
        .catch((error) => {
            console.error("Error starting webcam:", error);
        });
}

function getFolderNames(emp_code) {
    try {
        const folderNames = [emp_code];
        return folderNames;
    } catch (error) {
        console.error('Error fetching folder names:', error);
        return [];
    }
}

async function getEmployeeArrivalData() {
    try {
        const response = await fetch('../get_attendance.php');
        const employees = await response.json();
        return employees;
    } catch (error) {
        console.error('Error fetching attendance data:', error);
        return [];
    }
}

async function getEmployeeData() {
    try {
        const response = await fetch('../get_employee_records.php');
        const employees = await response.json();
        return employees;
    } catch (error) {
        console.log('Error fetching employee data:', error);
        return [];
    }
}
let labeledFaceDescriptors = []; 

async function findImagePathWithExtensions(label, i) {
    const possibleImgPath = `./Labels/${label}/${i}`;
    const extensions = ['jpg', 'JPG']; 
    for (const ext of extensions) {
        const imgPath = `${possibleImgPath}.${ext}`;
        try {
            const response = await fetch(imgPath, { method: 'HEAD' });
            if (response.ok) {
                console.log(`Found image at: ${imgPath}`);
                return imgPath; 
            }
        } catch (error) {
            console.warn(`Image not found at: ${imgPath}`); // Log if the image is not found
        }
    }

    console.warn(`No valid image found for ${label} image ${i}`);
    return null; // Return null if no valid image was found
}

async function getLabeledFaceDescriptions(emp_code) {
    try {
        document.getElementById("loader").classList.remove("hidden");
        document.body.classList.add("loading");

        const labels = getFolderNames(emp_code);
        console.log("Folder names:", labels);

        labeledFaceDescriptors = [];

        for (const label of labels) {
            const descriptions = [];
            for (let i = 1; i <= 6; i++) {
                const imgPath = await findImagePathWithExtensions(label, i);

                if (!imgPath) {
                    console.warn(`No valid image for label: ${label}, image ${i}`);
                    continue; // Skip this image if not found
                }

                const img = await faceapi.fetchImage(imgPath); // Fetch the image

                const detections = await faceapi
                    .detectSingleFace(img)
                    .withFaceLandmarks()
                    .withFaceDescriptor();

                if (detections && detections.descriptor) {
                    descriptions.push(detections.descriptor);
                } else {
                    console.warn(`No face detected in image ${i} of ${label}`);
                }
            }

            if (descriptions.length > 0) {
                const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
                    label,
                    descriptions
                );
                labeledFaceDescriptors.push(labeledFaceDescriptor);
                console.log(`Added labeled face descriptor for ${label}`);
            }
        }

        document.getElementById("loader").classList.add("hidden");
        document.body.classList.remove("loading");

        video.play();
        console.log("Video playback started");

        return labeledFaceDescriptors;
    } catch (error) {
        console.error("Error fetching labeled face descriptors:", error);
        document.getElementById("loader").classList.add("hidden");
        document.body.classList.remove("loading");
        return [];
    }
}

function isInsideBoundaries(lat, lon) {
    return (
        lat <= boundaries.north &&
        lon <= boundaries.east
    );
}

let isLocationFetched = false; // Flag to ensure location is only fetched once

async function getEmployeeLocation() {
    if (isLocationFetched) return; // Skip if location has already been fetched
    isLocationFetched = true; // Set flag to true after fetching location

    // let timerInterval;
    // Swal.fire({
    //     title: "Wait Fetching Your Location",
    //     html: "I will close in <b></b> milliseconds.",
    //     timer: 4000,
    //     timerProgressBar: true,
    //     didOpen: () => {
    //         Swal.showLoading();
    //         const timer = Swal.getPopup().querySelector("b");
    //         timerInterval = setInterval(() => {
    //             timer.textContent = `${Swal.getTimerLeft()}`;
    //         }, 100);
    //     },
    //     willClose: () => {
    //         clearInterval(timerInterval);
    //     }
    // })
    let timerInterval;
Swal.fire({
    title: "Wait Fetching Your Location",
    html: "I will close in <b></b> milliseconds.",
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        let timeLeft = 5000;
        timerInterval = setInterval(() => {
            timer.textContent = `${timeLeft}`;
            timeLeft -= 100;
        }, 100);

        // Manually close the alert after 5 seconds
        setTimeout(() => {
            Swal.close();
        }, 5000); // 5 seconds
    },
    willClose: () => {
        clearInterval(timerInterval);
        // Add any further actions here after the 5 seconds have completed
        console.log("Proceeding further after 5 seconds");
    }
}).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
    });
    try {
        const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.location) {
            const latitude = data.location.lat;
            const longitude = data.location.lng;
            console.log(`Employee location: Latitude - ${latitude}, Longitude - ${longitude}`);
            return { latitude, longitude };
        } else {
            console.error('No location found in the response:', data);
            return null;
        }
    } catch (error) {
        console.error("Error fetching location from Google API:", error);
        return null;
    }
}


video.addEventListener("play", async () => {
    try {
        const labeledFaceDescriptors = await getLabeledFaceDescriptions(emp_code);
        if (labeledFaceDescriptors.length > 0) {
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

            const canvas = faceapi.createCanvasFromMedia(video, {
                willReadFrequently: true,
            });
            document.body.append(canvas);

            const displaySize = { width: video.width, height: video.height };
            faceapi.matchDimensions(canvas, displaySize);
            console.log("Canvas for video created");

            // Get the 2D rendering context
            const ctx = canvas.getContext("2d");

            // Updated processResults function
            const processResults = async (results, resizedDetections) => {
                for (let i = 0; i < results.length; i++) {
                    const result = results[i];
                    const box = resizedDetections[i].detection.box;
                    const drawBox = new faceapi.draw.DrawBox(box, {
                        label: result.toString(),
                    });
                    drawBox.draw(canvas);

                    if (result.label === "unknown") {
                        continue; // Skip further processing 
                    }

                    if (result.label === !emp_code) {
                        alert(`You are not ${emp_code}`)
                        continue; // Skip further processing 
                    }

                    if (result.label && !emailSent[result.label]) {
                        emailSent[result.label] = true;
                        const emp_code = result.label;
                        console.log(`Detected employee code: ${emp_code}`);

                        const location = await getEmployeeLocation();
                        if (location) {
                            const { latitude, longitude } = location;

                            // Check boundaries
                            if (isInsideBoundaries(latitude, longitude)) {
                                console.log(`Inside designated location for ${emp_code}`);

                                const attendanceType = "Check-in";
                                const apikey = "qwerty!"; 
                                const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
                                console.log("Sending POST request with data:", postData);

                                fetch('../attendance.php', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                    },
                                    body: postData,
                                })
                                .then((response) => {
                                    if (response.ok) {
                                        return response.text();
                                    } else {
                                        throw new Error(`Failed to send attendance for ${emp_code}: ${response.statusText}`);
                                    }
                                })
                                // .then((data) => {
                                //     console.log(`Attendance sent successfully for ${emp_code}:`, data);
                                //     Swal.fire({
                                //         position: "center",
                                //         icon: "success",
                                //         title: `Hi ${emp_code}, Your Attendance Has been marked`,
                                //         showConfirmButton: false,
                                //         timer: 2500
                                //     });
                                //     Swal.fire("You can close the tab now");
                                // })

                                .then((data) => {
                                    console.log(`Attendance sent successfully for ${emp_code}:`, data);
                                
                                    // First Swal for attendance marked
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: `Hi ${emp_code}, Your Attendance Has been marked`,
                                        showConfirmButton: false,
                                        timer: 2000 // 2 seconds
                                    });
                                
                                    // Second Swal for closing the tab, triggered after 5 seconds
                                    setTimeout(() => {
                                        Swal.fire({
                                            title: "You can close the tab now",
                                            timer: 2000, // 5 seconds
                                            showConfirmButton: false
                                        });
                                    }, 2000); // Delay second alert by 5 seconds
                                })
                                
                                .catch((error) => {
                                    console.error('Error sending attendance:', error);
                                });
                            } else {
                                if (!alertShown[emp_code]) {
                                    alertShown[emp_code] = true; 
                                    console.error("You are outside the designated location, so attendance will not be marked.");
                                    Swal.fire({
                                        icon: "error",
                                        title: `Hi ${emp_code}`,
                                        text: "Your Attendance is not marked as you are outside the campus",
                                    });
                                }
                                emailSent[result.label] = false; 
                                return; 
                            }
                        } else {
                            console.error("Could not retrieve employee location.");
                        }
                    }
                }
            };

            setInterval(async () => {
                if (!video.paused && !video.ended) {
                    const detections = await faceapi.detectAllFaces(video)
                        .withFaceLandmarks()
                        .withFaceDescriptors();
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    
                    // Clear the canvas using the rendering context
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    const results = resizedDetections.map(d =>
                        faceMatcher.findBestMatch(d.descriptor)
                    );
                    await processResults(results, resizedDetections);
                }
            }, 100);
        } else {
            console.warn("No labeled face descriptors found.");
        }
    } catch (error) {
        console.error("Error during video play event:", error);
    }
});




// const video = document.getElementById("video");
// let emailSent = {};
// let alertShown = {};
// const boundaries = {
//     north: 32.812861,
//     east: 74.8196915,
// };
// console.log(emp_code);
// const GOOGLE_API_KEY = 'AIzaSyDBjmH_N8taHpt3JIrfMv5iSTaO5LhZwok'; 
// Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
//     faceapi.nets.faceRecognitionNet.loadFromUri("models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("models"),
// ]).then(startWebcam);

// function startWebcam() {
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: false,
//         })
//         .then((stream) => {
//             video.srcObject = stream;
//             console.log("Webcam started successfully");
//         })
//         .catch((error) => {
//             console.error("Error starting webcam:", error);
//         });
// }

// function getFolderNames(emp_code) {
//     try {
//         const folderNames = [emp_code];
//         return folderNames;
//     } catch (error) {
//         console.error('Error fetching folder names:', error);
//         return [];
//     }
// }

// async function getEmployeeArrivalData() {
//     try {
//         const response = await fetch('../get_attendance.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.error('Error fetching attendance data:', error);
//         return [];
//     }
// }

// async function getEmployeeData() {
//     try {
//         const response = await fetch('../get_employee_records.php');
//         const employees = await response.json();
//         return employees;
//     } catch (error) {
//         console.log('Error fetching employee data:', error);
//         return [];
//     }
// }
// let labeledFaceDescriptors = []; 

// async function findImagePathWithExtensions(label, i) {
//     const possibleImgPath = `./Labels/${label}/${i}`;
//     const extensions = ['jpg', 'JPG']; 
//     for (const ext of extensions) {
//         const imgPath = `${possibleImgPath}.${ext}`;
//         try {
//             const response = await fetch(imgPath, { method: 'HEAD' });
//             if (response.ok) {
//                 console.log(`Found image at: ${imgPath}`);
//                 return imgPath; 
//             }
//         } catch (error) {
//             console.warn(`Image not found at: ${imgPath}`); 
//         }
//     }

//     console.warn(`No valid image found for ${label} image ${i}`);
//     return null;
// }

// async function getLabeledFaceDescriptions(emp_code) {
//     try {
//         document.getElementById("loader").classList.remove("hidden");
//         document.body.classList.add("loading");

//         const labels = getFolderNames(emp_code);
//         console.log("Folder names:", labels);

//         labeledFaceDescriptors = [];

//         for (const label of labels) {
//             const descriptions = [];
//             for (let i = 1; i <= 6; i++) {
//                 const imgPath = await findImagePathWithExtensions(label, i);

//                 if (!imgPath) {
//                     console.warn(`No valid image for label: ${label}, image ${i}`);
//                     continue; 
//                 }

//                 const img = await faceapi.fetchImage(imgPath); 

//                 const detections = await faceapi
//                     .detectSingleFace(img)
//                     .withFaceLandmarks()
//                     .withFaceDescriptor();

//                 if (detections && detections.descriptor) {
//                     descriptions.push(detections.descriptor);
//                 } else {
//                     console.warn(`No face detected in image ${i} of ${label}`);
//                 }
//             }

//             if (descriptions.length > 0) {
//                 const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(
//                     label,
//                     descriptions
//                 );
//                 labeledFaceDescriptors.push(labeledFaceDescriptor);
//                 console.log(`Added labeled face descriptor for ${label}`);
//             }
//         }

//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");

//         video.play();
//         console.log("Video playback started");

//         return labeledFaceDescriptors;
//     } catch (error) {
//         console.error("Error fetching labeled face descriptors:", error);
//         document.getElementById("loader").classList.add("hidden");
//         document.body.classList.remove("loading");
//         return [];
//     }
// }

// function isInsideBoundaries(lat, lon) {
//     return (
//         lat <= boundaries.north &&
//         lon <= boundaries.east
//     );
// }

// async function getEmployeeLocation() {
//     let timerInterval;
//     await Swal.fire({
//         title: "Wait Fetching Your Location",
//         html: "I will close in <b></b> milliseconds.",
//         timer: 2000,
//         timerProgressBar: true,
//         didOpen: () => {
//             Swal.showLoading();
//             const timer = Swal.getPopup().querySelector("b");
//             timerInterval = setInterval(() => {
//                 timer.textContent = `${Swal.getTimerLeft()}`;
//             }, 100);
//         },
//         willClose: () => {
//             clearInterval(timerInterval);
//         }
//     }).then((result) => {
//         if (result.dismiss === Swal.DismissReason.timer) {
//             console.log("I was closed by the timer");
//         }
//     });

//     try {
//         const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const data = await response.json();
//         if (data.location) {
//             const latitude = data.location.lat;
//             const longitude = data.location.lng;
//             console.log(`Employee location: Latitude - ${latitude}, Longitude - ${longitude}`);
//             return { latitude, longitude };
//         } else {
//             console.error('No location found in the response:', data);
//             return null;
//         }
//     } catch (error) {
//         console.error("Error fetching location from Google API:", error);
//         return null;
//     }
// }

// video.addEventListener("play", async () => {
//     try {
//         const labeledFaceDescriptors = await getLabeledFaceDescriptions(emp_code);
//         if (labeledFaceDescriptors.length > 0) {
//             const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

//             const canvas = faceapi.createCanvasFromMedia(video, {
//                 willReadFrequently: true,
//             });
//             document.body.append(canvas);

//             const displaySize = { width: video.width, height: video.height };
//             faceapi.matchDimensions(canvas, displaySize);
//             console.log("Canvas for video created");


//             const ctx = canvas.getContext("2d");


//             const processResults = async (results, resizedDetections) => {
//                 for (let i = 0; i < results.length; i++) {
//                     const result = results[i];
//                     const box = resizedDetections[i].detection.box;
//                     const drawBox = new faceapi.draw.DrawBox(box, {
//                         label: result.toString(),
//                     });
//                     drawBox.draw(canvas);
            
//                     if (result.label === "unknown") {
//                         continue;  
//                     }
            
                    
//                     const probabilityThreshold = 0.85; 
            
//                     console.log(result.distance)
//                     if (result.label !== emp_code) {
//                         Swal.fire({
//                             icon: "error",
//                             title: `Error!`,
//                             text: "Unauthorized Access!",
//                         });
//                         continue;  
//                     }

            
//                     if (result.label && !emailSent[result.label]) {
//                         emailSent[result.label] = true;
//                         const emp_code = result.label;
//                         console.log(`Detected employee code: ${emp_code}`);
            
//                         const location = await getEmployeeLocation();
//                         if (location) {
//                             const { latitude, longitude } = location;
            
//                             // Check boundaries
//                             if (isInsideBoundaries(latitude, longitude) && result.distance > probabilityThreshold) {
//                                 console.log(`Inside designated location for ${emp_code}`);
            
//                                 const attendanceType = "Check-in";
//                                 const apikey = "qwerty!"; 
//                                 const postData = `atype=${attendanceType}&emp_code=${emp_code}&apikey=${apikey}`;
//                                 console.log("Sending POST request with data:", postData);
            
//                                 fetch('../attendance.php', {
//                                     method: 'POST',
//                                     headers: {
//                                         'Content-Type': 'application/x-www-form-urlencoded',
//                                     },
//                                     body: postData,
//                                 })
//                                 .then((response) => {
//                                     if (response.ok) {
//                                         return response.text();
//                                     } else {
//                                         throw new Error(`Failed to send attendance for ${emp_code}: ${response.statusText}`);
//                                     }
//                                 })
//                                 .then((data) => {
//                                     console.log(`Attendance sent successfully for ${emp_code}:`, data);
//                                     Swal.fire({
//                                         position: "center",
//                                         icon: "success",
//                                         title: `Hi ${emp_code}, Your Attendance Has been marked`,
//                                         showConfirmButton: false,
//                                         timer: 2500
//                                     });
//                                 })
//                                 .catch((error) => {
//                                     console.error('Error sending attendance:', error);
//                                 });
//                             } else {
//                                 if (!alertShown[emp_code]) {
//                                     alertShown[emp_code] = true; 
//                                     console.error("You are outside the designated location, so attendance will not be marked.");
//                                     Swal.fire({
//                                         icon: "error",
//                                         title: `Hi ${emp_code}`,
//                                         text: "Your Attendance is not marked as you are outside the campus",
//                                     });
//                                 }
//                                 emailSent[result.label] = false; 
//                                 return; 
//                             }
//                         } else {
//                             console.error("Could not retrieve employee location.");
//                         }
//                     }
//                 }
//             };
            

//             setInterval(async () => {
//                 if (!video.paused && !video.ended) {
//                     const detections = await faceapi.detectAllFaces(video)
//                         .withFaceLandmarks()
//                         .withFaceDescriptors();
//                     const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    
                    
//                     ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
//                     const results = resizedDetections.map(d =>
//                         faceMatcher.findBestMatch(d.descriptor)
//                     );
//                     await processResults(results, resizedDetections);
//                 }
//             }, 100);
//         } else {
//             console.warn("No labeled face descriptors found.");
//         }
//     } catch (error) {
//         console.error("Error during video play event:", error);
//     }
// });
