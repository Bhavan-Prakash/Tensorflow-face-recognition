# Smart Face Recognition and Attendance System

![System Preview](assets/system_preview.png)

## Web-Based Real-Time Face Recognition Platform

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

This project implements a browser-based real-time face recognition system using deep learning models executed directly in the client browser via face-api.js.

The system identifies registered users from a labeled dataset and supports automated attendance logging, backend integration, and optional email notifications.

It is designed for institutional and organizational deployments where lightweight, on-premise biometric verification is required.

---

## System Architecture

```
Tensorflow-face-recognition/
│
├── Labels/                         # Face image dataset (organized per user)
│   └── bhavan/
│
├── models/                         # face-api.js pre-trained models
│
├── PHPMailer/                      # Email notification module
│
├── labeledFaceDescriptors.json     # Stored face embeddings
├── face-api.min.js                 # Face API library
├── index.php                       # Main application interface
├── script.js                       # Face detection and recognition logic
├── script.py                       # Descriptor generation helper
│
├── list_folders.php                # Dynamic folder listing API
├── send_mail.php                   # Attendance email trigger
├── send-email.php                  # Alternate mail endpoint
├── list_folders_log.txt            # Logging file
│
└── README.md
```

---

## How It Works

### 1. Dataset Preparation

- User images are stored inside the `Labels/` directory.
- Each folder represents one identity.
- The Python script (`script.py`) generates embeddings.
- Embeddings are stored in:

```
labeledFaceDescriptors.json
```

---

### 2. Model Loading

The browser loads:

- Tiny Face Detector
- Face Landmark Model
- Face Recognition Model

All models are served from the `models/` directory.

Inference runs entirely client-side.

---

### 3. Real-Time Face Detection

- Webcam stream is captured using browser APIs.
- Bounding boxes are drawn using Canvas.
- Facial landmarks are extracted.
- Faces are aligned automatically.

---

### 4. Face Embedding and Matching

- A 128-dimensional descriptor is generated.
- Euclidean distance is used for similarity comparison.
- A threshold determines recognition success.

---

### 5. Attendance Logging

When a face is successfully recognized:

- A PHP backend endpoint is triggered.
- The event is logged.
- An optional email notification is sent via PHPMailer.
- Duplicate prevention logic can be implemented server-side.

---

## Recognition Flow

```
Webcam Frame
      ↓
Face Detection
      ↓
Landmark Extraction
      ↓
Descriptor Generation (128D)
      ↓
Distance Comparison
      ↓
Threshold Validation
      ↓
Attendance Logging
```

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Tensorflow-face-recognition.git
cd Tensorflow-face-recognition
```

---

### 2. Setup Local Server

Recommended environment:

- XAMPP
- Apache
- PHP 7+

Place the project inside:

```
htdocs/
```

Start the Apache server.

---

### 3. Run the Application

Open in browser:

```
http://localhost/Tensorflow-face-recognition/
```

Grant camera permissions when prompted.

---

## Performance

Typical browser performance on a modern CPU:

| Module                  | Approximate Time |
|--------------------------|-----------------|
| Face Detection           | 15–30 ms       |
| Landmark Detection       | 10–20 ms       |
| Descriptor Matching      | < 5 ms         |

Performance depends on device CPU, camera resolution, and dataset size.

---

## Technologies Used

### Frontend
- JavaScript
- HTML5
- face-api.js
- Canvas API

### Backend
- PHP
- PHPMailer
- File-based logging

### Utilities
- Python (embedding generation)
- JSON-based descriptor storage

---

## Deployment Target

- Institutional attendance systems
- On-premise biometric verification
- Intranet-based identity systems
- Small to medium dataset deployments

---

## Project Strengths

- Real-time browser inference
- No cloud dependency
- Structured embedding management
- Backend attendance integration
- Email notification capability
- Lightweight deployment
- Modular architecture

This project represents a deployable web-based AI attendance system built using client-side deep learning and server-side processing.

---

## License

This project is licensed under the MIT License.
