  export const conversations = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Professor",
      lastMessage: "Assignment feedback is ready",
      time: "2 min ago",
      unread: 2,
      avatar: "/assets/images/student-profile.png?height=40&width=40",
    },
    {
      id: 2,
      name: "Study Group - CS101",
      role: "Group Chat",
      lastMessage: "Meeting tomorrow at 3 PM",
      time: "15 min ago",
      unread: 5,
      avatar: "/assets/images/student-profile.png?height=40&width=40",
    },
    {
      id: 3,
      name: "Alex Chen",
      role: "Classmate",
      lastMessage: "Can you share your notes?",
      time: "1 hour ago",
      unread: 0,
      avatar: "/assets/images/student-profile.png?height=40&width=40",
    },
    {
      id: 4,
      name: "Project Team Alpha",
      role: "Project Group",
      lastMessage: "Updated the presentation",
      time: "3 hours ago",
      unread: 1,
      avatar: "/assets/images/student-profile.png?height=40&width=40",
    },
  ]

  export const messages = [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      content: "Your latest assignment shows great improvement in understanding OOP concepts.",
      time: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Thank you for the feedback! I found the polymorphism section challenging.",
      time: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Dr. Sarah Johnson",
      content: "That's completely normal. Would you like to schedule office hours to discuss it further?",
      time: "10:35 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      content: "Yes, that would be very helpful. When are you available?",
      time: "10:37 AM",
      isOwn: true,
    },
  ]

  export const forumTopics = [
    {
      id: 1,
      title: "Database Design Best Practices",
      author: "Prof. Martinez",
      replies: 23,
      lastActivity: "2 hours ago",
      category: "CS Database",
      status: "active",
    },
    {
      id: 2,
      title: "Help with React Hooks Implementation",
      author: "Emma Wilson",
      replies: 8,
      lastActivity: "4 hours ago",
      category: "Web Development",
      status: "answered",
    },
    {
      id: 3,
      title: "Study Group for Midterm Exam",
      author: "Mike Johnson",
      replies: 15,
      lastActivity: "1 day ago",
      category: "General",
      status: "active",
    },
    {
      id: 4,
      title: "Career Advice for CS Graduates",
      author: "Dr. Thompson",
      replies: 45,
      lastActivity: "2 days ago",
      category: "Career",
      status: "pinned",
    },
  ]

  export const projects = [
    {
      id: 1,
      name: "E-commerce Website",
      course: "Web Development",
      members: 4,
      progress: 75,
      deadline: "2024-03-15",
      status: "on-track",
    },
    {
      id: 2,
      name: "Machine Learning Model",
      course: "AI Fundamentals",
      members: 3,
      progress: 45,
      deadline: "2024-03-20",
      status: "behind",
    },
    {
      id: 3,
      name: "Mobile App Prototype",
      course: "Mobile Development",
      members: 5,
      progress: 90,
      deadline: "2024-03-10",
      status: "ahead",
    },
  ]

  export const virtualMeetings = [
    {
      id: 1,
      title: "CS101 Lecture - Data Structures",
      instructor: "Dr. Johnson",
      time: "2:00 PM - 3:30 PM",
      status: "live",
      participants: 45,
    },
    {
      id: 2,
      title: "Project Team Meeting",
      instructor: "Team Alpha",
      time: "4:00 PM - 5:00 PM",
      status: "scheduled",
      participants: 4,
    },
    {
      id: 3,
      title: "Office Hours - Database Design",
      instructor: "Prof. Martinez",
      time: "6:00 PM - 7:00 PM",
      status: "scheduled",
      participants: 12,
    },
  ]

  export const onlineFaculty = [
    { name: "Dr. Sarah Johnson", status: "available", department: "Computer Science" },
    { name: "Prof. Martinez", status: "busy", department: "Database Systems" },
    { name: "Dr. Thompson", status: "available", department: "Career Services" },
  ]