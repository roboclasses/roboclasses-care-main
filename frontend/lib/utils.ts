import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function handleNumber(value:string){
  const formattedNumber = parseInt(value, 10)
  return formattedNumber;
}



