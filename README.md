# Learning Management System

A modern, responsive Learning Management System built with React and Tailwind CSS. This application allows users to browse courses, enroll in them, and track their learning progress.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real Course Data**: Fetches real course data from multiple reliable APIs
- **Course Catalog**: Browse and search through various courses
- **Course Filtering**: Filter courses by level, topic, and keyword search
- **User Management**: Create an account and track your progress
- **Course Enrollment**: Enroll in courses
- **Progress Tracking**: Mark lessons as completed and track your progress
- **Student Dashboard**: View enrolled courses, progress, and certificates
- **Interactive UI**: Modern and intuitive user interface

## Tech Stack

- **React**: Frontend library for building user interfaces
- **React Router**: For multi-page navigation
- **Context API**: For state management
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Build tool for fast development
- **External API Integration**: Multiple APIs with fallback mechanism for reliability

## How to Use

1. Browse the course catalog from the home page or courses page
2. Use the search and filtering options to find courses that interest you
3. Click on a course to view detailed information
4. Log in by clicking the "Log In" button in the navigation bar
5. Enroll in courses that interest you
6. Track your progress by marking lessons as completed
7. View your overall progress in the dashboard

## API Integration

The application fetches real course data from multiple sources with a fallback mechanism for reliability:

1. **Primary API**: Open Library API provides educational content based on relevant subjects
2. **Secondary API**: JSONPlaceholder API serves as a backup data source
3. **Fallback Data**: Local mock data is used if both APIs fail

This multi-layered approach ensures that the application always has data to display, even if one or more external APIs are unavailable.

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/learning-management-system.git
   ```

2. Navigate to the project directory:
   ```
   cd learning-management-system
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Project Structure

- `/src`: Source code
  - `/components`: Reusable UI components
  - `/pages`: Page components (Home, Courses, CourseDetail, Dashboard)
  - `/context`: Context providers for state management
  - `/data`: Mock data for the application (fallback)
  - `/services`: API services for data fetching with fallback mechanisms
  - `/assets`: Images and static assets

## Current Implementation Notes

- User data is stored in browser memory (Context API) and will be lost on page refresh
- Course progress tracking is functional
- Certificates are generated based on course completion status
- Real course data is fetched from multiple APIs with fallback mechanisms

## Future Enhancements

- User authentication with JWT
- Backend integration with a more comprehensive course API
- Persistent storage for user progress
- Course rating and review system
- Payment integration for premium courses
- Discussion forums for courses
- Video content integration
- Quiz and assessment system
