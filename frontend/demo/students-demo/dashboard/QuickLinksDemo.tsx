import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, FileText, MessageSquare } from "lucide-react";
import Link from "next/link";

const Data = [
  {
    id: 1,
    icon: <FileText className="w-6 h-6 text-purple-600" />,
    name: "Assignments",
    link: "/students/submission",
  },
  {
    id: 2,
    icon: <BookOpen className="w-6 h-6 text-purple-600" />,
    name: "Grades",
    link: "/students/gradesAndProgress",
  },
  {
    id: 3,
    icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
    name: "Messages",
    link: "/students/communication",
  },
  {
    id: 4,
    icon: <Calendar className="w-6 h-6 text-purple-600" />,
    name: "Schedule",
    link: "/students/calendar",
  },
];

const QuickLinksDemo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Data.map((item) => (
            <Link key={item.id} href={item.link}>
              <Button
                variant="outline"
                className="h-20 w-full flex-col gap-2 bg-transparent hover:bg-purple-50"
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickLinksDemo;
