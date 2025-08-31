import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react";

interface alertDialogT {
  onCancel: () => void;
  onExport: () => void;
}

export function ExportAlertDemo({ onCancel, onExport }: alertDialogT) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Export Student Data?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <b>This data is protected under privacy and data protection laws.</b> Please ensure that you are authorized to export and handle this information.<br />
            <span className="text-red-500">
              Proceed only if you understand and accept responsibility for data security.
            </span> 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button" onClick={onCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction type="button" onClick={onExport}>
            Yes, Export CSV
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
