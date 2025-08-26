import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const colorMap : Record<string, string> = {
  green:"bg-green-50 border-green-200",
  blue:"bg-blue-50 border-blue-200",
  yellow:"bg-yellow-50 border-yellow-200",
  orange:"bg-orange-50 border-orange-200",
}

const Data = [{
  id:1, 
  fallback:"SJ",
  name:"Prof. Sarah Johnson",
  subject:"Object-Oriented Programming",
  description:"John demonstrates excellent understanding of OOP principles. His code structure is clean and well-organized. I recommend focusing on error handling and edge cases in future assignments.",
  date:"December 10, 2024",
  color:"green",
},
  {
  id:2, 
  fallback:"MC",
  name:"Prof. Michael Chen",
  subject:"Database Systems",
  description:"John demonstrates excellent understanding of OOP principles. His code structure is clean and well-organized. I recommend focusing on error handling and edge cases in future assignments.",
  date:"December 8, 2024",
  color:"blue",
},
{
  id:3, 
  fallback:"ER",
  name:"Prof. Emily Rodriguez",
  subject:"Database Systems",
  description:"John demonstrates excellent understanding of OOP principles. His code structure is clean and well-organized. I recommend focusing on error handling and edge cases in future assignments.",
  date:"December 8, 2024",
  color:"yellow",
},
{
  id:4, 
  fallback:"DK",
  name:"Prof. David Kim",
  subject:"Data Structures & Algorithms",
  description:"John demonstrates excellent understanding of OOP principles. His code structure is clean and well-organized. I recommend focusing on error handling and edge cases in future assignments.",
  date:"December 3, 2024",
  color:"orange",
},]

const FeedbackOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          Instructor Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Data.map((item)=>(
          <div key={item.id} className={`p-4 rounded-lg border ${colorMap[item.color]}`}>
          <div className="flex items-start gap-3 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/assets/images/student-profile.png" />
              <AvatarFallback>{item.fallback}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-green-800">
                {item.name}
              </h4>
              <p className="text-sm text-gray-600">
                {item.subject}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-2">
           {item.description}
          </p>
          <p className="text-xs text-gray-500">{item.date}</p>
        </div>))}
      </CardContent>
    </Card>
  );
};

export default FeedbackOverview;
