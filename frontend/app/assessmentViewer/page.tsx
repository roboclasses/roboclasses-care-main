import { Label } from "@/components/ui/label";
import { AssessmentAnswerTable } from "@/demo/table-demo/AssessmentAnswerTable";
import { AssessmentTable } from "@/demo/table-demo/AssessmentTable";

const page = () => {
  return (
    <div className="p-5 2xl:w-full xl:w-[1000px] lg:w-[800px] md:w-[500px] w-[420px] space-y-8">
      <div className="space-y-4">
      <Label className="font-bold lg:text-4xl text-xl">Batch wise Questions</Label>
      <AssessmentTable />
      </div>

      <div className="space-y-4">
      <Label className="font-bold lg:text-4xl text-xl">Batch wise Student Marks Sheets</Label>
      <AssessmentAnswerTable />
      </div>
    </div>
  );
};

export default page;
