import { Button } from "@/components/ui/button";
import { btnType } from "@/types/Types";
import { Calendar } from "lucide-react";


export function TimeOffButton({ name, type, onClick }: btnType) {
  return (
    <Button type={type} onClick={onClick} className='rounded-full'>
    <Calendar />
      {name}
    </Button>
  );
}
