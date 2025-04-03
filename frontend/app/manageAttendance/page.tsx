import { AttendanceForm } from "@/demo/manage-attendance-demo/AttendanceForm";

export default function page() {
  return (
      <main className="grid grid-cols-1 p-10">
        <h1 className="lg:text-4xl text-xl mb-4">Manage Attendance</h1>
        <AttendanceForm />
      </main>
  );
}
