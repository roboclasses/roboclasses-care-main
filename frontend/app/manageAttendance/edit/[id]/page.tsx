import { EditAttendanceForm } from "@/demo/manage-attendance-demo/EditAttendanceForm";

const page = () => {
  return (
    <main className="grid grid-cols-1 p-10">
      <h1 className="text-4xl font-bold mb-4">Edit Attendances</h1>
      <EditAttendanceForm />
    </main>
  );
};

export default page;
