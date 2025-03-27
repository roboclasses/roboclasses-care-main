import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { StatusUpdateForm, timeOffIdType } from "./StatusUpdateForm"
import { Edit } from "lucide-react"

export function TimeOffApprovalDemo({timeOffId}:timeOffIdType) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
            <Edit />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <StatusUpdateForm timeOffId={timeOffId}/>
      </PopoverContent>
    </Popover>
  )
}
