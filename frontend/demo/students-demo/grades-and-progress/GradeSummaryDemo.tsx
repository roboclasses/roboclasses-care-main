import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BarChart3, Target, TrendingUp } from "lucide-react";

const colorMap: Record<string, string> = {
  green:"bg-green-50 border-green-200",
  cyan:"bg-blue-50 border-blue-200",
  amber:"bg-amber-50 border-amber-200",
}

const DistributionData = [{
    id: 1,
    icon: <Award className="w-8 h-8 text-green-600 mx-auto mb-2"/>,
    title: "Cumulative GPA",
    grade: "3.7",
    desc: "Out of 4.0",
    color:"green",
},
{
    id: 2,
    icon: <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />,
    title: "Semester GPA",
    grade: "3.8",
    desc: "Current semester",
    color:"cyan",
},
{
    id: 3,
    icon: <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2"/>,
    title: "Grade Trend",
    grade: "+0.2",
    desc: "Improvement",
    color:"amber",
},
]

const SummaryData = [{
  id: 1,
  grade: "A (90-100%)",
  courses: "6 courses",
},
{
  id: 2,
  grade: "B (80-89%)",
  courses: "8 courses",
},
{
  id: 3,
  grade: "C (70-79%)",
  courses: "1 courses",
}]

const GradeSummaryDemo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <BarChart3 className="w-5 h-5 text-purple-500" />
          Grade Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
         {DistributionData.map((item)=>(
            <div key={item.id} className={`p-4 rounded-lg border text-center ${colorMap[item.color]}`}>
            {item.icon}
            <h3 className="font-semibold text-green-800">{item.title}</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">{item.grade}</p>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
         ))}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-4">Grade Distribution</h4>
          <div className="space-y-3">
            {SummaryData.map((item)=>(
              <div key={item.id} className="flex items-center justify-between">
              <span className="text-sm font-medium">{item.grade}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 sm:w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{item.courses}</span>
              </div>
            </div>

            ))}

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeSummaryDemo;
