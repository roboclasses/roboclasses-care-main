import { LEAVE_POLICY } from "@/data/dataStorage";
import { leaveType } from "@/types/Types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert string to number
export function handleNumber(value:string){
  const formattedNumber = parseInt(value, 10)
  return formattedNumber;
}

// Leave module helper function
// Calculated current year
export const currentYear = new Date().getFullYear();


// Using leave policy remaining leave days are calculated or adjusted.

export const calculateLeaveDays = (
  leaves: leaveType[],
  type: string,
  userName: string
) => {
  return leaves
    .filter(
      (leave) =>
        leave.teacherName === userName &&
        leave.timeOffType === type &&
        leave.status === "Taken"
    )
    .reduce((total, leave) => {
      if (leave.dateRange?.from && leave.dateRange?.to) {
        const from = new Date(leave.dateRange?.from);
        const to = new Date(leave.dateRange?.to);
        if(leave.timeOffType === "Normal Leave"){

        }
        const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        return total + days;
      }
      return total;
    }, 0);
};

// Calculated adjusted normal leave
export const adjustedNormalLeave = (
  normalLeaveUsed: number,
  halfLeaveUsed: number
)=>{
  
  const halfDayDeduction = Number(halfLeaveUsed) * 0.5;
   
  const remaining =  LEAVE_POLICY.normal.total - Number(normalLeaveUsed) - halfDayDeduction;
  return parseFloat(remaining.toFixed(2))

}



