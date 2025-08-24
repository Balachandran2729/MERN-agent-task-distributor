# Task Distribution System

This is a full-stack web application built as part of the MERN Stack Internship Assignment. It implements a task distribution system where administrators can manage agents and automatically distribute uploaded CSV/Excel files containing tasks among agents in a fair and balanced manner.
## Features

*   **User Authentication**: Secure admin login with JWT authentication and account creation functionality
    **Agent Management**: Create, view, and manage task distribution agents with complete details
    **File Upload & Processing**: Upload CSV/Excel files containing task data with automatic validation
    **Smart Task Distribution**: Automated fair distribution algorithm that equally assigns tasks among available agents
    **Task Visualization**: View distributed tasks for each agent with clear interface
    **Responsive Dark Theme UI**: Modern, professional dark-themed interface that works on all devices
    **Real-time Feedback**: Toast notifications and loading states for enhanced user experience

## Technologies Used

*   **Frontend**: Next.js 13+, App Router, React 18, Tailwind CSS, Axios, React Hot Toast
    **Backend**: Node.js, Express.js, Mongoose (MongoDB ODM)
    **Database**: MongoDB
    **Authentication**: JWT (JSON Web Tokens)
    **File Processing**: XLSX library for CSV/Excel parsing
    **UI Components**: Lucide React Icons, Custom UI components
    **Styling**: Tailwind CSS with dark theme

## Prerequisites

*   Node.js v14+ installed on your machine
    MongoDB installed and running (or MongoDB Atlas connection)
    Git (to clone the repository)
## Getting Started

These instructions will get you a copy of the project up and running on your local machine.
### 1. Clone the Repository

git clone <repository-url>
cd <your-project-directory-name>
