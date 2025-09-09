import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageSquare, FileText, Video } from "lucide-react";

const Data = [{
    id:1,
    icon:<BookOpen className="w-4 h-4 mr-2" />,
    name:"Course Textbook",
},
{
    id:2,
    icon:<FileText className="w-4 h-4 mr-2" />,
    name:"Java Documentation",
},
{
    id:3,
    icon:<Video className="w-4 h-4 mr-2" />,
    name:"Tutorial Videos",
},
{
    id:4,
    icon:<MessageSquare className="w-4 h-4 mr-2" />,
    name:"Class Forum",
},]

const CourseResources = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Data.map((item)=>(
            <Button
            key={item.id}
            variant="outline"
            className="w-full justify-start bg-transparent"
          >
            {item.icon}
            {item.name}
          </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseResources;
