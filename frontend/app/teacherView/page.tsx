import AttendanceTable from "@/demo/teacher-view-demo/AttendanceTable";

export default function page() {
  return (
      <main className="grid grid-cols-1 p-10">
        <h1 className="text-4xl font-bold mb-4">Teachers View</h1>
        <AttendanceTable />
      </main>
  );
}
