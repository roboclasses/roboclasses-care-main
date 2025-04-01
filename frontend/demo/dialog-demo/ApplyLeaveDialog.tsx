import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "lucide-react"
import { LeaveForm } from "../time-off-demo/LeaveForm"

// Leave type
interface leaveType{
    name:string;
    variant: "link" | "secondary" | "default";
    className?: string;
    color?: string;
    defaultValue?:string
}

export function ApplyLeaveDialog({name, variant, className, color, defaultValue}:leaveType) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} className={className}>
           <Calendar color={color}/>
            {name}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Request time off </DialogTitle>
        </DialogHeader>
       <LeaveForm defaultValue={defaultValue || ''}/>
      </DialogContent>
    </Dialog>
  )
}
