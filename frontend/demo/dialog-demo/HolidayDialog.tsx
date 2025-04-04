import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Settings } from "lucide-react"
import { EditHoidayForm } from "../time-off-demo/EditHolidayForm"


export function HolidayDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
            <Settings />
            Edit Holidays
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Enter or Edit Holidays</DialogTitle>
        </DialogHeader>
            <EditHoidayForm />
      </DialogContent>
    </Dialog>
  )
}
