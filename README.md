# Feedback Collector App 🎯

Feedback Collector is a fullstack web application that enables users to submit, view, and export feedback while allowing administrators to manage the feedback in detail.

Users can fill out a feedback form with their name, category (bug, feature request, general), and message. Submitted feedback is analyzed for sentiment (positive, neutral, or negative) and stored in a database.

Any visitor can:

- View all submitted feedback

- Filter feedback by category or sentiment

- Export feedback as CSV or JSON

Admins can:

- Log in securely

- Delete feedback entries

- Logout and return to the login page

The application features a clean UI with animations, icon buttons, and toast alerts to enhance user experience.
---

## 🚀 Tech Stack

- **Frontend**: ReactJS, React Router, React Toastify, Framer Motion, React Icons
- **Backend**: Python (Flask)
- **Database**: SQLite
- **Deployment**: (Optional) Vercel (frontend) + Railway (backend) ( Not deployed because railway allows free users only to deploy databases)

---

## ✅ Features

### User Features:
- Submit feedback with name, category, and message
- Sentiment analysis (positive/neutral/negative)
- Feedback is stored securely in the database
-  View all feedback
- Filter by category or sentiment
- Export feedback as CSV or JSON


### Admin Features:
- Admin login (with hardcoded credentials)
- View all submitted feedback
- Filter feedback by category or sentiment
- Delete specific feedback
- Export feedback as CSV or JSON
- Logout functionality

### UI/UX:
- Clean, responsive interface
- Toast notifications for actions
- Icons on buttons for better clarity
- Animated page transitions for smooth navigation

---

## 🔧 Setup Instructions

Follow these steps to run the project on your local machine:

---

### 1. Clone the Repository

```bash
git clone https://github.com/gokulkvn/feedback-collector.git
cd feedback-collector
```

---

### 2. Backend Setup (Python + Flask)

#### 📁 Navigate to backend:

```bash
cd backend
```

#### 🐍 Create a virtual environment:

```bash
python -m venv venv
```

#### 🔛 Activate it:

- Windows:
```bash
venv\Scripts\activate
```

- macOS/Linux:
```bash
source venv/bin/activate
```

#### 📦 Install dependencies:

```bash
pip install flask flask-cors
```

#### ▶️ Start the backend server:

```bash
python app.py
```

Backend will be available at:  
**http://localhost:5000/**

---

### 3. Frontend Setup (React)

#### 📁 Navigate to frontend:

```bash
cd ../frontend
```

#### 📦 Install React dependencies:

```bash
npm install
```

#### ▶️ Start the React app:

```bash
npm start
```

Frontend will be available at:  
**http://localhost:3000/**

---

## 🔐 Admin Login

- **Username**: `admin`  
- **Password**: `1234`  

> On successful login, admin can manage and delete feedback.

---

## 📹 Demo Video 

Upload your demo video and add the link below:

[📺 Watch Demo](https://drive.google.com/file/d/1ShLXcz2hzgXaAtHjttCvEPqSXaAVeBh_/view?usp=sharing)

---

## 📁 Folder Structure

```
feedback-collector/
├── backend/
│   └── app.py
├── frontend/
│   └── src/
│       └── pages/
│           ├── FeedbackFormPage.js
│           ├── AdminLoginPage.js
│           └── FeedbackViewPage.js
├── README.md
```

---

