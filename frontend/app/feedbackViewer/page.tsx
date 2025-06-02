import { Label } from "@/components/ui/label";
import { TableFeedback } from "@/demo/feedback-demo/TableFeedback";

const page = () => {
  return (
    <div className="p-5 2xl:w-full xl:w-[1000px] lg:w-[800px] md:w-[500px] w-[420px] space-y-8">
      <div className="space-y-4">
      <Label className="font-semibold lg:text-4xl text-xl">Batch wise Feedbacks</Label>
      <TableFeedback />
      </div>
    </div>
  );
};

export default page;
