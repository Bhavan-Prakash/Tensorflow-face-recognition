const video = document.getElementById("video");
let emailSent = {};
let alertShown = {};
const boundaries = {
    north: 123,
    east: 321,
};
console.log(name);
const GOOGLE_API_KEY = 'Your google API key'; 
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

function getFolderNames(name) {
    try {
        const folderNames = [name];
        return folderNames;
    } catch (error) {
        console.error('Error fetching folder names:', error);
        return [];
    }
}

async function getEmployeeArrivalData() {
    try {
        const response = await fetch('../youremployeearrivalDataset.php');
        const employees = await response.json();
        return employees;
    } catch (error) {
        console.error('Error fetching attendance data:', error);
        return [];
    }
}

async function getEmployeeData() {
    try {
        const response = await fetch('../youremployeeDataset.php');
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
            console.warn(`Image not found at: ${imgPath}`); 
        }
    }

    console.warn(`No valid image found for ${label} image ${i}`);
    return null; 
}

async function getLabeledFaceDescriptions(name) {
    try {
        document.getElementById("loader").classList.remove("hidden");
        document.body.classList.add("loading");

        const labels = getFolderNames(name);
        console.log("Folder names:", labels);

        labeledFaceDescriptors = [];

        for (const label of labels) {
            const descriptions = [];
            for (let i = 1; i <= 6; i++) {
                const imgPath = await findImagePathWithExtensions(label, i);

                if (!imgPath) {
                    console.warn(`No valid image for label: ${label}, image ${i}`);
                    continue; 
                }

                const img = await faceapi.fetchImage(imgPath);

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

let isLocationFetched = false;

async function getEmployeeLocation() {
    if (isLocationFetched) return; 
    isLocationFetched = true; 
   
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

       
        setTimeout(() => {
            Swal.close();
        }, 5000); 
    },
    willClose: () => {
        clearInterval(timerInterval);
        
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
        const labeledFaceDescriptors = await getLabeledFaceDescriptions(name);
        if (labeledFaceDescriptors.length > 0) {
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

            const canvas = faceapi.createCanvasFromMedia(video, {
                willReadFrequently: true,
            });
            document.body.append(canvas);

            const displaySize = { width: video.width, height: video.height };
            faceapi.matchDimensions(canvas, displaySize);
            console.log("Canvas for video created");

            
            const ctx = canvas.getContext("2d");

            
            const processResults = async (results, resizedDetections) => {
                for (let i = 0; i < results.length; i++) {
                    const result = results[i];
                    const box = resizedDetections[i].detection.box;
                    const drawBox = new faceapi.draw.DrawBox(box, {
                        label: result.toString(),
                    });
                    drawBox.draw(canvas);

                    if (result.label === "unknown") {
                        continue; 
                    }

                    if (result.label === !name) {
                        alert(`You are not ${name}`)
                        continue;  
                    }

                    if (result.label && !emailSent[result.label]) {
                        emailSent[result.label] = true;
                        const name = result.label;
                        console.log(`Detected employee code: ${name}`);

                        const location = await getEmployeeLocation();
                        if (location) {
                            const { latitude, longitude } = location;

                            
                            if (isInsideBoundaries(latitude, longitude)) {
                                console.log(`Inside designated location for ${name}`);

                                const attendanceType = "Check-in";
                                const apikey = "qwerty!"; 
                                const postData = `atype=${attendanceType}&name=${name}&apikey=${apikey}`;
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
                                        throw new Error(`Failed to send attendance for ${name}: ${response.statusText}`);
                                    }
                                })
                                

                                .then((data) => {
                                    console.log(`Attendance sent successfully for ${name}:`, data);
                                
                                   
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: `Hi ${name}, Your Attendance Has been marked`,
                                        showConfirmButton: false,
                                        timer: 2000 
                                    });
                                
                                  
                                    setTimeout(() => {
                                        Swal.fire({
                                            title: "You can close the tab now",
                                            timer: 2000, 
                                            showConfirmButton: false
                                        });
                                    }, 2000); 
                                })
                                
                                .catch((error) => {
                                    console.error('Error sending attendance:', error);
                                });
                            } else {
                                if (!alertShown[name]) {
                                    alertShown[name] = true; 
                                    console.error("You are outside the designated location, so attendance will not be marked.");
                                    Swal.fire({
                                        icon: "error",
                                        title: `Hi ${name}`,
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
