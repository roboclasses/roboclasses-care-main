import { ATTENDANCES_IMAGE, BATCHES_IMAGE, COURSES_IMAGE, DEMO_CLASS_IMAGE, NORMAL_CLASS_IMAGE, STUDENT_IMAGE } from "@/constants/images";

// For mapping teachers in drop-down
export const teachers = [
  { id: 0, name: "Kritika Maheswari" },
  { id: 1, name: "Monty" },
  { id: 2, name: "Kiruthika PK" },
  { id: 3, name: "Pal Gudka" },
];


// For mapping image-icons
export const imageIcons = [
  {id:"student", img:STUDENT_IMAGE, alt:"students-pic"},
  {id:"democlass", img:DEMO_CLASS_IMAGE, alt:"demo-classes-pic"},
  {id:"normalclass", img:NORMAL_CLASS_IMAGE, alt:"normal-classes-pic"},
  {id:"attendance", img:ATTENDANCES_IMAGE, alt:"attendances-pic"},
  {id:"batch", img:BATCHES_IMAGE, alt:"batches-pic"},
  {id:"course", img:COURSES_IMAGE, alt:"courses-pic"},
]




