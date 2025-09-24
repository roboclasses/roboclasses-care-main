import { Url } from "next/dist/shared/lib/router/router";
import { ReactNode } from "react";

export type btnType = {
  name: string;
  type: "submit" | "button" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  link?: Url
};

export type appointmentTypes = {
  _id: string;
  userName?: string;
  date: string;
  time: string;
  timeZone?: string;
  destination?:string;
  course?: string;
  teacher?: string;
  converted?:string;
  batchNumber?:string;
  isCompensationClass?: boolean
};


export type batchType = {
  _id: string;
  teacher: string;
  batch: string;
  time: string[];
  day: string[];
  startDate:string;
  timeZone:string;
  numberOfClasses:string;
  studentName:string;
  destination:string;
  email:string;
  completed:string;
  colorCode: string;
};

type Syllabus={
  _id:string
  topic:string
}

export type courseType={
  _id:string;
  course:string;
  numberOfClasses:string;
  syllabus: Syllabus[];
}


export type usersType={
  _id:string;
  name:string;
  email:string;
  password:string;
  role:string;
  workingHours:string;
  workingDays:string
  zoomApi: string
}

export type QuestionType={
  _id:string
  questionId: string
  question: string
  option:{
    a: string
    b: string
    c: string
    d: string
  },
  answer: 'A' | 'B' | 'C' | 'D'
}

export type AssessmentType={
  _id: string
  batch: string
  teacher: string
  assessmentLevel: string
  questions: QuestionType[]
}

export type AnswerType={
  _id: string
  candidate: string
  teacher: string
  answer: string[]
  batch: string
  assessmentLevel: string
  submissionTime: Date
}

export type FeedbackQuestions={
  _id:string
  question: string
  option:{
    a: string
    b: string
    c: string
  },
  answer: 'A' | 'B' | 'C' 
}

export type FeedbackType={
  _id: string
  batch: string
  teacher: string
  student: string
  email: string
  destination?: string
  feedbackAnswer: string[]
  recommendProgram: string
  additionalFeedback: string
  isCompleted: boolean
  updatedAt: Date
}

export type studentType = {
  _id: string;
  studentId:string;
  studentName: string;
  parentName?:string;
  destination?: string;
  email?:string;
  address?:string;
  grade?:string;
  courses?:string;
}

export type studentSearchType = {
  onSelect: (student: studentType) => void;
  selectedStudent: studentType | null;
}


export type normalClassType = {
  _id: string;
  time: string[];
  date: string[];
  items: string[];
  teacher: string;
  batch: string;
  userName: string;
  destination: string;
  numberOfClasses: string;
};

export type TPtmType={
  _id: string
  batch: string
  studentName: string
  email: string
  destination: string
  teacher: string
  timeZone: string
  date: Date
  time: string
  topic: string
  type: number
  duration: number
  agenda: string
  participants: string[]
  isMeetingSetting: boolean
  meetingReminder: number
}

export type leaveType = {
  length: unknown;
  _id: string;
  employeeName: string;
  timeOffType: string;
  dateRange: {from: string, to:string};
  notes: string;
  status: string;
}

export type eventsType = {
  _id:string;
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  extendedProps:{
    createdBy: string;
    eventType: string;
  }
}

export type attendanceType = {
  _id:string;
  batchName:string;
  teacher:string;
  startDate:Date;
  classes: [Date];
  curriculumTaught: [string],
  completed: string;
  dateRange: {from: string, to:string};
}

export type TCalendarType={
  getEventTypeIcon: (type:string) => ReactNode,
  getStatusColor: (status: string) => string,
}

export type User={
  _id?:string,
  name: string
  role: string
  email?: string
  token?: string
}



