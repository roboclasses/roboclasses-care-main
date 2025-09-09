import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const colorMap : Record<string, string>={
    color1:"bg-gray-50",
    color2:"bg-gray-50",
    color3:"bg-yellow-50 border-yellow-200",
    color4:"bg-gray-50",
    color5:"bg-yellow-50 border-yellow-200",
    
}

const CourseGradeData = [{
    id:1,
    title:"Current Grade",
    grade:"A-",
    percentage:"91.5%",
},
{
    id:2,
    title:"Assignments",
    grade:"92%",
    percentage:"8/10 completed",
},
{
    id:3,
    title:"Participation",
    grade:"95%",
    percentage:"Excellent",
},]

const GradeBreakdownData = [{
    id:1,
    span:"Assignment 1: Basic OOP",
    badge:"88/100",
    color:"color1",
},
{
    id:2,
    span:"Assignment 2: Class Design",
    badge:"95/100",
    color:"color2",
},
{
    id:3,
    span:"Assignment 3: Inheritance Project",
    badge:"Pending",
    color:"color3",
},
{
    id:4,
    span:"Midterm Exam",
    badge:"89/100",
    color:"color4",
},
{
    id:5,
    span:"Final Exam",
    badge:"Not Scheduled",
    color:"color5",
},]

const Grades = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Grades</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CourseGradeData.map((item)=>(
                <Card key={item.id} className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-green-800">{item.title}</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">{item.grade}</p>
                <p className="text-sm text-green-600">{item.percentage}</p>
              </CardContent>
            </Card>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-4">Grade Breakdown</h3>
            <div className="space-y-3">
              {GradeBreakdownData.map((item)=>(
                <div key={item.id} className={`flex items-center justify-between p-3 ${colorMap[item.color]} rounded-lg`}>
                <span>{item.span}</span>
                <Badge variant="secondary">{item.badge}</Badge>
              </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Grades;
