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
export const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// For mapping timezones in drop down
export const timezone = [
  { id: 1, name: "Asia/Kolkata", country: "India" },
  { id: 2, name: "America/New_York", country: "USA" },
  { id: 3, name: "Asia/Riyadh", country: "Saudi Arab" },
  { id: 4, name: "America/Toronto", country: "Canada" },
  { id: 5, name: "Asia/Dubai", country: "UAE" },
  { id: 6, name: userTimeZone, country: "Your Timezone" },
];

// For mapping image-icons
export const imageIcons = [
  { id: "student", img: STUDENT_IMAGE, alt: "students-pic" },
  { id: "democlass", img: DEMO_CLASS_IMAGE, alt: "demo-classes-pic" },
  { id: "normalclass", img: NORMAL_CLASS_IMAGE, alt: "normal-classes-pic" },
  { id: "attendance", img: ATTENDANCES_IMAGE, alt: "attendances-pic" },
  { id: "batch", img: BATCHES_IMAGE, alt: "batches-pic" },
  { id: "course", img: COURSES_IMAGE, alt: "courses-pic" },
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
