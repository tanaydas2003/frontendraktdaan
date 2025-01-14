# Raktdaan: Online Blood Bank Portal System

## Project Overview
Raktdaan is a comprehensive online blood bank portal system designed to facilitate blood donation and management for donors, hospitals, organizations, and administrators. The system aims to streamline the blood donation process, ensure efficient communication between stakeholders, and provide a secure platform for managing donor registrations and blood requests.

## Table of Contents
1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Installation and Setup](#installation-and-setup)
4. [Usage](#usage)
5. [Admin Portal](#admin-portal)
6. [Future Enhancements](#future-enhancements)

---

## Features
- **Donor Portal:** Allows individuals to register as donors, update their profiles, and view donation history.
- **Hospital Portal:** Enables hospitals to request blood, manage requests, and access donor details.
- **Organization Portal:** Organizations can manage blood donation drives and view donor statistics.
- **Admin Portal:** Provides administrators with the authority to manage registrations, delete fraudulent entries, and oversee the overall system.
- **Authentication:** Secure login using JWT tokens.
- **Responsive Design:** Optimized for both desktop and mobile devices.

---

## Technology Stack
**Frontend:**
- React.js
- TypeScript
- Tailwind CSS
- Material-UI
- Framer Motion

**Backend:**
- Node.js
- Express.js
- MongoDB

**Tools:**
- Postman (API Testing)
- VS Code (Development Environment)

---

## Installation and Setup
### Prerequisites
- Node.js (v14+)
- MongoDB

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/raktdaan.git
   ```
2. Navigate to the project directory:
   ```bash
   cd raktdaan
   ```
3. Install dependencies for the frontend:
   ```bash
   cd client
   npm install
   ```
4. Start the frontend:
   ```bash
   npm start
   ```
5. Open the application in your browser at `http://localhost:3000`.

---

## Usage
- **Donors:** Register, log in, and manage profiles. View upcoming blood donation drives and request a blood donation certificate.
- **Hospitals:** Submit blood requests and track the status of each request.
- **Organizations:** Organize and manage blood donation drives.
- **Admins:** Manage users, monitor requests, and handle fraud detection.

---

## Admin Portal
The Admin Portal provides a comprehensive view of all users, hospitals, and organizations registered in the system. Admins have the ability to:
- Manage donor registrations.
- Approve or reject hospital requests.
- Monitor blood donation drive activities.
- Handle fraudulent activities by deleting accounts.

---

## Future Enhancements
- **Real-time Notifications:** Implement real-time updates for donors and hospitals.
- **Analytics Dashboard:** Provide detailed insights on donation trends and blood requests.
- **Multi-language Support:** Make the platform accessible to a wider audience by supporting multiple languages.

---

Feel free to contribute to this project by submitting issues and pull requests. We welcome feedback and suggestions to improve Raktdaan!

