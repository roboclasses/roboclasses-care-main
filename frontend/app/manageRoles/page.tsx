import { EmployeeTable } from "@/demo/table-demo/EmployeeTable";

const page = () => {
  return (
    <div className="p-5 2xl:w-full xl:w-[1000px] lg:w-[800px] md:w-[500px] sm:w-[600px] w-[400px] min-h-dvh">
      <EmployeeTable />
    </div>
  );
};

export default page;
