export type btnType = {
  name: string;
  type: "submit" | "button" | "reset";
  onClick?: () => void;
  varient?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
};

export type appointmentTypes = {
  _id?: string;
  userName?: string;
  date: Date;
  time: string;
  destination?:string,
  course?: string;
  teacher?: string;
  status?: boolean;
  handleDateChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTimeChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  handleDelete?: () => void;
  handlePhoneChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type editAttendance = {
  _id?: string;
  date: Date;
  batch: string;
  score: string;
  studentsPresent: string;
  handleBatchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStudentsPresent: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleScore: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleDelete?: () => void;
};

export type batchType = {
  _id: string;
  teacher: string;
  batch: string;
  time: string[];
};

export type courseType={
  _id:string;
  course:string;
}

export type studentType = {
  id: number;
  name: string;
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
};

export type attendanceRowAndColumnType = {
  columns: Array<{
    _id:string;
    id: string;
    name: string;
    type: string;
  }>;
  rows: Array<{
    _id:string;
    id: string;
    cells: {
      [key: string]: string;
    };
  }>;
};


