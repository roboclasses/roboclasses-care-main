import { Label } from "@/components/ui/label";
import { TableBatchWiseAssessment } from "@/demo/assessment-viewer-demo/TableBatchWiseAssessment";
import { TableStudentWiseAnswer } from "@/demo/assessment-viewer-demo/TableStudentWiseAnswer";

const page = () => {
  return (
    <div className="p-5 2xl:w-full xl:w-[1000px] lg:w-[800px] md:w-[500px] sm:w-[600px] w-[370px] space-y-4">
      <Label className="font-bold text-4xl">Batch wise Questions</Label>
      <TableBatchWiseAssessment />

      <Label className="font-bold text-4xl">Answer Sheets</Label>
      <TableStudentWiseAnswer />
    </div>
  );
};

export default page;
