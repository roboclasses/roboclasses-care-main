import { AttendanceForm } from "@/demo/manage-attendance-demo/AttendanceForm";

export default function page() {
  return (
      <main className="grid grid-cols-1 p-10">
        <h1 className="text-4xl font-bold mb-4">Teachers View</h1>
        <AttendanceForm />
      </main>
  );
}
