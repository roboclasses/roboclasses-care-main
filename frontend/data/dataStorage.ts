import {
  ATTENDANCES_IMAGE,
  BATCHES_IMAGE,
  COURSES_IMAGE,
  DEMO_CLASS_IMAGE,
  NORMAL_CLASS_IMAGE,
  STUDENT_IMAGE,
} from "@/constants/images";

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

// For mapping timezones in drop down
export const timezone = [
  { id: 1, name: "Asia/Kolkata", country: "India" },
  { id: 2, name: "America/New_York", country: "USA" },
  { id: 3, name: "Asia/Riyadh", country: "Saudi Arab" },
  { id: 4, name: "America/Toronto", country: "Canada" },
  { id: 5, name: "Asia/Dubai", country: "UAE" },
];

// For mapping image-icons
export const imageIcons = [
  { slug: "student", img: STUDENT_IMAGE, alt: "students-pic" },
  { slug: "democlass", img: DEMO_CLASS_IMAGE, alt: "demo-classes-pic" },
  { slug: "normalclass", img: NORMAL_CLASS_IMAGE, alt: "normal-classes-pic" },
  { slug: "attendance", img: ATTENDANCES_IMAGE, alt: "attendances-pic" },
  { slug: "batch", img: BATCHES_IMAGE, alt: "batches-pic" },
  { slug: "course", img: COURSES_IMAGE, alt: "courses-pic" },
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
