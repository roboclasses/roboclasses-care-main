// For mapping teachers in drop-down
export const teachers = [
  { id: 1, name: "All" },
  { id: 2, name: "Kritika Maheswari" },
  { id: 3, name: "Monty" },
  { id: 4, name: "Kiruthika PK" },
  { id: 5, name: "Pal Gudka" },
];

// For detect system timezone
// export const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const timezone = [
  { id: 1, name: "Asia/Kolkata", country: "India" },
  { id: 2, name: "America/New_York", country: "USA" },
  { id: 3, name: "Asia/Riyadh", country: "Saudi Arab" },
  { id: 4, name: "America/Toronto", country: "Canada" },
  { id: 5, name: "Asia/Dubai", country: "UAE" },
];

// For mapping countries
export const countries = [
  { id: 1, name: "UAE" },
  { id: 2, name: "INDIA" },
  { id: 3, name: "USA" },
  { id: 4, name: "CANADA" },
  { id: 5, name: "SAUDI ARAB" },
];

// For mapping weekdays
export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Time off views
export const tabs = [
  { id: "past", name: "Past Leaves" },
  { id: "apply", name: "Apply Leaves" },
];

// Time off types
export const timeOffTypes = [
  {
    id: 1,
    type: "Normal Leave",
  },
  {
    id: 2,
    type: "Sick Leave",
  },
  {
    id: 3,
    type: "Half Day Leave",
  },
];

// Time off status
export const timeOffStatus = [
  {
    id: 1,
    status: "Requested"
  },
  {
    id: 2,
    status: "Approved"
  },
  {
    id: 3,
    status: "Cancelled"
  },
]

// Leave Policy
export const LEAVE_POLICY = {
  normal: {
    total: 15,
    name: "Normal Leave",
    description: "Annual personal leave allowence",
  },
  sick: {
    total: 5,
    name: "Sick Leave",
    description: "For medical absences with doctor's note",
  },
  half: {
    total: 30,
    name: "Half Day Leave",
    description: "Reason for Leave: Early leave",
  },
  holidays: {
    total: 3,
    name: "National Holidays",
    description: "UAE public holidays",
  },
};

//Feedback data
export const FeedbackData = [
  {
    id: 1,
    question: "How excited or interested was your child about attending the Course?",
    option: { a: "Very Excited", b: "Excited", c: "Not excited at all" },
  },
  {
    id: 2,
    question: "Do you feel your child has learned useful skills in coding and robotics through this program?",
    option: { a: "Yes", b: "No", c: "Not sure" },
  },
  {
    id: 3,
    question: "Have you noticed any improvement in your child’s problem-solving, creativity, or logical thinking since starting the program?",
    option: { a: "Yes", b: "No", c: "Not sure" },
  },
  {
    id: 4,
    question: "How well did the teacher communicate with you about your child’s progress?",
    option: { a: "Excellent", b: "Good", c: "Needs improvement" },
  },
  {
    id: 5,
    question: "Did your child find the teacher helpful and encouraging during the classes?",
    option: { a: "Yes", b: "No", c: "Not sure" },
  },
  {
    id: 6,
    question: "Were the class timings, assignments, and pace suitable for your child?",
    option: { a: "Yes", b: "No", c: "Not sure" },
  },
  {
    id: 7,
    question: "Do you feel the teaching methods used were appropriate for your child’s age and understanding level?",
    option: { a: "Yes", b: "No", c: "Not sure" },
  },
];

// Zoom meeting types data
export const meetingTypeData = [
  {
    id: "1",
    type: "Instant Meeting",
  },
  {
    id: "2",
    type: "Scheduled Meeting",
  },
  {
    id: "3",
    type: "Recurring Meeting with no fixed time",
  },
  {
    id: "4",
    type: "Recurring Meeting with fixed time",
  },
];

// Zoom meeting reminder data
export const reminderData = [
  {
    id: 1,
    reminder: "15",
    content: "15 minutes",
  },
  {
    id: 2,
    reminder: "30",
    content: "30 minutes",
  },
  {
    id: 3,
    reminder: "60",
    content: "1 hour",
  },
  {
    id: 4,
    reminder: "120",
    content: "2 hours",
  },
  {
    id: 5,
    reminder: "1440",
    content: "1 day",
  },
];
