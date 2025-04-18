export type btnType = {
  name: string;
  type: "submit" | "button" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
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
};

export type courseType={
  _id:string;
  course:string;
  numberOfClasses:string;
}

export type usersType={
  _id:string;
  name:string;
  email:string;
  password:string;
  role:string;
  workingHours:string;
  workingDays:string
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

export type leaveType = {
  length: unknown;
  _id: string;
  teacherName: string;
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


