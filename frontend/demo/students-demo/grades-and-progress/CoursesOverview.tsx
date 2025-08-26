import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from "lucide-react";

const colorMap: Record<string, string> = {
  green: "bg-green-50 border-green-200",
  purple: "bg-purple-50 border-purple-200",
  blue: "bg-blue-50 border-blue-200",
  yellow: "bg-yellow-50 border-yellow-200",
}

const Data = [{
  id:1,
  subject: "Object-Oriented Programming",
  batch: "CS 301",
  teacher: "Prof. Sarah Johnson",
  credits: "4 Credits",
  score: "A- (88%)",
  percentage: {
    assignments:"85%",
    quizzes:"92%",
    midterm:"87%",
    participation:"95%"
  },
  color:"green",
},
{
  id:2,
  subject: "Database Systems",
  batch: "CS 350",
  teacher: "Prof. Michael Chen",
  credits: "3 Credits",
  score: "A (95%)",
  percentage: {
    assignments:"98%",
    quizzes:"94%",
    midterm:"92%",
    participation:"100%"
  },
  color:"purple",
},
{
  id:3,
  subject: "Web Development",
  batch: "CS 280",
  teacher: "Prof. Emily Rodriguez",
  credits: "3 Credits",
  score: "B+ (87%)",
  percentage: {
    assignments:"89%",
    quizzes:"85%",
    midterm:"Pending",
    participation:"90%"
  },
  color:"blue",
},
{
  id:4,
  subject: "Data Structures & Algorithms",
  batch: "CS 250",
  teacher: "Prof. David Kim",
  credits: "3 Credits",
  score: "B (82%)",
  percentage: {
    assignments:"78%",
    quizzes:"85%",
    midterm:"80%",
    participation:"88%"
  },
  color:"yellow",
},
]

const CoursesOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <BookOpen className="w-5 h-5 text-blue-500" />
          Course-wise Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Data.map((item)=>(
            <div key={item.id} className={`p-4 rounded-lg border ${colorMap[item.color]}`}>
          <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-2">
            <div>
              <h3 className="font-semibold text-green-800">
                {item.subject}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {item.batch} • {item.teacher} • {item.credits}
              </p>
            </div>
            <Badge className="bg-green-600 self-start sm:self-center">
              {item.score}
            </Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Assignments</p>
              <p className="font-medium">{item.percentage.assignments}</p>
            </div>
            <div>
              <p className="text-gray-600">Quizzes</p>
              <p className="font-medium">{item.percentage.midterm}</p>
            </div>
            <div>
              <p className="text-gray-600">Midterm</p>
              <p className="font-medium">{item.percentage.participation}</p>
            </div>
            <div>
              <p className="text-gray-600">Participation</p>
              <p className="font-medium">{item.percentage.quizzes}</p>
            </div>
          </div>
          <div className="mt-3">
            <Progress value={88} className="h-2" />
          </div>
        </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CoursesOverview;

