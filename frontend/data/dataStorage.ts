import { ATTENDANCES_IMAGE, BATCHES_IMAGE, COURSES_IMAGE, DEMO_CLASS_IMAGE, NORMAL_CLASS_IMAGE, STUDENT_IMAGE } from "@/constants/images";

// For mapping teachers in drop-down
export const teachers = [
  { id: 0, name: "Kritika Maheswari" },
  { id: 1, name: "Monty" },
  { id: 2, name: "Kiruthika PK" },
  { id: 3, name: "Pal Gudka" },
];

// For detect system timezone
export const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// For mapping timezones in drop down
export const timezone = [
  {id:0, name:"Asia/Kolkata", country:"India"},
  {id:1, name:"America/New_York", country:"USA"},
  {id:2, name:"Asia/Riyadh", country:"Saudi Arab"},
  {id:3, name:"America/Toronto", country:"Canada"},
  {id:4, name:"Asia/Dubai", country:"UAE"},
  {id:5, name:userTimeZone, country:"Your Timezone"},]



// For mapping image-icons
export const imageIcons = [
  {id:"student", img:STUDENT_IMAGE, alt:"students-pic"},
  {id:"democlass", img:DEMO_CLASS_IMAGE, alt:"demo-classes-pic"},
  {id:"normalclass", img:NORMAL_CLASS_IMAGE, alt:"normal-classes-pic"},
  {id:"attendance", img:ATTENDANCES_IMAGE, alt:"attendances-pic"},
  {id:"batch", img:BATCHES_IMAGE, alt:"batches-pic"},
  {id:"course", img:COURSES_IMAGE, alt:"courses-pic"},
]

// For mapping countries
export const countries = [
  {id: 1, name: "UAE"},
  {id: 2, name: "INDIA"},
  {id: 3, name: "USA"}, 
  {id: 4, name: "CANADA"},
  {id: 5, name: "SAUDI ARAB"},
];

// For mapping weekdays
export const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];





