import { AlertCircle, Book, CheckCircle, Zap } from "lucide-react"

  export const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Zap,
      count: 15,
      questions: [
        {
          q: "How do I log into the LMS for the first time?",
          a: "Use your student ID and the temporary password sent to your email. You'll be prompted to change it on first login.",
        },
        {
          q: "I forgot my password, how do I reset it?",
          a: "Click 'Forgot Password' on the login page, enter your email, and follow the reset instructions sent to your inbox.",
        },
        {
          q: "Where can I find my course materials and syllabus?",
          a: "Navigate to 'My Courses', select your course, and find materials in the 'Resources' or 'Content' section.",
        },
        {
          q: "How do I navigate the dashboard effectively?",
          a: "Use the main navigation menu on the left. Your dashboard shows recent activity, upcoming deadlines, and quick access links.",
        },
        {
          q: "Can I customize my dashboard layout?",
          a: "Yes, you can rearrange widgets and choose which information to display prominently in your profile settings.",
        },
      ],
    },
    {
      id: "courses",
      title: "Courses & Assignments",
      icon: Book,
      count: 22,
      questions: [
        {
          q: "How do I enroll in a new course?",
          a: "Visit the Course Catalog, search for your desired course, and click 'Enroll'. Some courses may require instructor approval.",
        },
        {
          q: "How do I submit assignments?",
          a: "Go to your course page, click on the assignment, upload your file(s), and click 'Submit'. Always check the submission confirmation.",
        },
        {
          q: "Can I save a draft of my assignment?",
          a: "Yes, you can save drafts before final submission. Look for the 'Save Draft' button in the assignment submission area.",
        },
        {
          q: "What file formats are accepted for submissions?",
          a: "We accept PDF, DOC, DOCX, PPT, PPTX, TXT, and most image formats. Maximum file size is 50MB per file.",
        },
        {
          q: "How do I access recorded lectures?",
          a: "Recorded lectures are available in the 'Lectures' section of each course. You can stream or download them for offline viewing.",
        },
        {
          q: "Can I participate in discussions from mobile?",
          a: "Yes, the discussion forums are fully mobile-responsive. You can read, post, and reply from any device.",
        },
      ],
    },
    {
      id: "technical",
      title: "Technical Support",
      icon: AlertCircle,
      count: 18,
      questions: [
        {
          q: "The video lectures won't play, what should I do?",
          a: "Try refreshing the page, clearing your browser cache, or switching to a different browser. Ensure you have a stable internet connection.",
        },
        {
          q: "I can't upload my assignment file",
          a: "Check that your file is under 50MB and in a supported format. Try using a different browser or clearing your cache.",
        },
        {
          q: "The website is loading very slowly",
          a: "This may be due to high traffic or your internet connection. Try accessing during off-peak hours or contact IT support.",
        },
        {
          q: "I'm getting error messages when trying to access content",
          a: "Take a screenshot of the error and contact technical support. Include details about what you were trying to do when the error occurred.",
        },
        {
          q: "How do I clear my browser cache?",
          a: "Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac), select 'Cached images and files', and click Clear data.",
        },
        {
          q: "Which browsers are supported?",
          a: "We support the latest versions of Chrome, Firefox, Safari, and Edge. Internet Explorer is not supported.",
        },
      ],
    },
    {
      id: "grades",
      title: "Grades & Progress",
      icon: CheckCircle,
      count: 12,
      questions: [
        {
          q: "When will my assignment grades be available?",
          a: "Grades are typically posted within 5-7 business days after the submission deadline, depending on the assignment complexity.",
        },
        {
          q: "How is my final grade calculated?",
          a: "Check your course syllabus for the specific grading breakdown. You can also view the grade calculation in your course's 'Grades' section.",
        },
        {
          q: "Can I request a grade review or appeal?",
          a: "Yes, contact your instructor within 7 days of grade posting to discuss any concerns or request a review of your grade.",
        },
        {
          q: "How do I track my overall progress in a course?",
          a: "Visit the 'Grades & Progress' section to see your current standing, completed assignments, and upcoming deadlines.",
        },
        {
          q: "What does 'Incomplete' mean on my transcript?",
          a: "An Incomplete grade means you haven't finished all course requirements. Contact your instructor to discuss completion options.",
        },
      ],
    },
  ]

  export const supportTickets = [
    {
      id: "TK-2024-001",
      subject: "Cannot access course materials for CS101",
      status: "Open",
      priority: "High",
      created: "2 hours ago",
      lastUpdate: "1 hour ago",
      category: "Technical",
      assignedTo: "Tech Support Team",
    },
    {
      id: "TK-2024-002",
      subject: "Grade inquiry for Midterm Exam - MATH201",
      status: "In Progress",
      priority: "Medium",
      created: "1 day ago",
      lastUpdate: "4 hours ago",
      category: "Academic",
      assignedTo: "Academic Support",
    },
    {
      id: "TK-2024-003",
      subject: "Password reset email not received",
      status: "Resolved",
      priority: "Low",
      created: "3 days ago",
      lastUpdate: "2 days ago",
      category: "Account",
      assignedTo: "IT Support",
    },
    {
      id: "TK-2024-004",
      subject: "Assignment submission failed - ENG102",
      status: "Open",
      priority: "High",
      created: "5 hours ago",
      lastUpdate: "3 hours ago",
      category: "Technical",
      assignedTo: "Tech Support Team",
    },
  ]

  export const tutorials = [
    {
      id: 1,
      title: "Getting Started with the LMS Platform",
      duration: "8:45",
      views: "3.2k",
      rating: 4.9,
      thumbnail: "/assets/images/student-profile.png",
      category: "Basics",
      description: "Complete walkthrough of the LMS interface and basic navigation",
    },
    {
      id: 2,
      title: "How to Submit Assignments Successfully",
      duration: "6:30",
      views: "2.8k",
      rating: 4.8,
      thumbnail: "/assets/images/student-profile.png",
      category: "Assignments",
      description: "Step-by-step guide to submitting different types of assignments",
    },
    {
      id: 3,
      title: "Participating in Discussion Forums",
      duration: "5:15",
      views: "1.9k",
      rating: 4.7,
      thumbnail: "/assets/images/student-profile.png",
      category: "Communication",
      description: "Learn how to engage effectively in course discussions",
    },
    {
      id: 4,
      title: "Understanding Your Grades and Progress",
      duration: "7:20",
      views: "2.1k",
      rating: 4.9,
      thumbnail: "/assets/images/student-profile.png",
      category: "Grades",
      description: "Navigate the grading system and track your academic progress",
    },
    {
      id: 5,
      title: "Using the Mobile App Effectively",
      duration: "4:50",
      views: "1.5k",
      rating: 4.6,
      thumbnail: "/assets/images/student-profile.png",
      category: "Mobile",
      description: "Access your courses and complete tasks on mobile devices",
    },
    {
      id: 6,
      title: "Troubleshooting Common Issues",
      duration: "9:10",
      views: "2.7k",
      rating: 4.8,
      thumbnail: "/assets/images/student-profile.png",
      category: "Technical",
      description: "Solve the most common technical problems independently",
    },
  ]
