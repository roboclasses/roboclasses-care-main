import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Data = [
  {
    id: 1,
    title: "Database Assignment",
    desc: "Due today at 11:59 PM",
  },
  {
    id: 2,
    title: "Midterm Exam",
    desc: "Tomorrow at 10:00 AM",
  },
  {
    id: 3,
    title: "Project Proposal",
    desc: "Due in 3 days",
  },
];

const UrgentDeadlinesDemo = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-800">
          Urgent Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Data.map((item) => (
            <div key={item.id} className="p-3 bg-green-50 border border-green-200 rounded-lg" >
              <h4 className="font-semibold text-green-800 text-sm mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-green-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UrgentDeadlinesDemo;
