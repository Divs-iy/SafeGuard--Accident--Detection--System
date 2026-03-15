# SafeGuard – Accident Detection and Emergency Alert System

SafeGuard is a sensor-based accident detection system that uses smartphone motion sensors to detect sudden impacts and automatically trigger emergency alerts. The system analyzes accelerometer and gyroscope data to identify abnormal movement patterns that may indicate a vehicle crash or severe fall.

When a potential accident is detected, the system immediately triggers an emergency alert and sends the user’s location information to predefined contacts. The goal of this system is to reduce emergency response time and improve safety by automating accident reporting.

---

## Problem Statement

In many road accidents, victims are unable to contact emergency services due to injury, unconsciousness, or lack of immediate assistance. Delays in reporting accidents can significantly increase the severity of outcomes.

SafeGuard addresses this issue by using real-time smartphone sensor data to automatically detect accident-like motion patterns and send alerts without requiring manual intervention.

---

## Key Features

* Real-time accident detection using smartphone motion sensors
* Integration of **accelerometer and gyroscope data** for improved detection accuracy
* Automatic emergency alert trigger on abnormal impact detection
* Location sharing to emergency contacts
* Manual emergency alert button for user-triggered alerts
* Responsive web dashboard interface
* Real-time sensor monitoring during simulation or testing

---

## Detection Logic

The system analyzes motion sensor data using threshold-based detection:

* **Accelerometer** detects sudden changes in acceleration magnitude
* **Gyroscope** detects rapid rotational movement indicating possible impact or fall
* If both values exceed predefined thresholds, the system flags a possible accident event

Example condition used during testing:

Acceleration magnitude > threshold AND
Angular velocity > threshold → Trigger accident alert

Combining both sensors helps reduce false positives compared to single-sensor detection.

---

## System Architecture

User Device
↓
Sensor Data (Accelerometer + Gyroscope)
↓
Motion Analysis & Impact Detection
↓
Alert Trigger System
↓
Emergency Notification with Location

---

## Technology Stack

Frontend

* React / Next.js
* Tailwind CSS

Sensor Integration

* Device Motion API

Alert System

* SMS / notification alert integration

Development Tools

* JavaScript
* Git & GitHub
* VS Code

---

## Project Structure

```
SafeGuard-Accident-Detection-System
│
├── components
├── pages
├── public
├── styles
├── sensor-detection-logic
└── alert-system
```

---

## Performance and Testing

The system was tested through multiple simulated motion scenarios including:

* Sudden phone impact on surface
* Rapid motion and rotation events
* Normal device movement patterns

Testing results showed that combining accelerometer and gyroscope thresholds significantly improved detection reliability compared to single-sensor detection.

The current prototype focuses on demonstrating the accident detection workflow and emergency alert mechanism.

---

## Running the Project

Clone the repository:

```bash
git clone https://github.com/Divs-iy/SafeGuard--Accident--Detection--System.git
```

Navigate to the project folder:

```bash
cd SafeGuard--Accident--Detection--System
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the application in your browser:

```
http://localhost:3000
```

---

## Future Improvements

* Machine learning–based accident detection model
* Improved false-positive filtering
* Integration with emergency service APIs
* Real-time GPS tracking during emergencies
* Mobile application deployment

---

## Project Demo

A demo video and screenshots of the SafeGuard interface are included to demonstrate the accident detection workflow and alert system.

---

## Author

Divya Singh
Computer Science - AI/ML Student
Interested in building technology-driven solutions for real-world safety problems.

