import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { StatusUpdateForm } from "./StatusUpdateForm"
import { Edit } from "lucide-react"

export function TimeOffApprovalDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
            <Edit />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <StatusUpdateForm />
      </PopoverContent>
    </Popover>
  )
}
