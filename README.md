# ROBOclasses Care 

A web application for online curriculum management. Built with next.js and express.js, ROBOclasses Care helps students to enroll in courses and activities, helps teachers to manage attendances, classes and availability etc. also Admins can see insights in admin dashboard.

## Features

- Parents can register for their child to enroll in our courses.
- Admins can create or edit courses.
- Teachers can create or edit batches.
- Teachers can craete demo-class and normal-class as well.
- Demo classes are scheduled in a way that students should recieve whatsapp-reminder before 1hour as well as 24hours before.
- Teachers can record what curriculum are taught in attendance module.
- Admins can see insights via tables and cards in admin dashboard with filters (status, name etc.).
- Teachers availability are displayed in calender view in days format.
- Teachers and admins can take leave (normal/sick) from our time-off module.
- Admins can manage roles in manage roles module.
- We have AI powered assessment module.
- We recently made one feedback module to take feedbacks from parents.

## Tech Stack

- next.js (v14) for frontend heavy
- express.js for robust backend
- JWT for auth (role based authentication and authorization)
- express-rate-limit for rate limiter
- TailwindCSS for styling
- MongoDB for database
- node-cron for scheduling cron jobs

## Getting Started

1. Clone the repository
2. copy `.env` and fill your credentials
3. Install dependencies with `npm install`
4. Run development server with `npm run dev`
5. Build for production with `npm run build`




