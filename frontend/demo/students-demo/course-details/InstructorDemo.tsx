import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Star, Clock, Mail, Phone } from "lucide-react";

const Data = [{
    id:1,
    icon:<Mail className="w-4 h-4 text-gray-400" />,
    desc:"sarah.johnson@university.edu",
},
{
    id:2,
    icon:<Phone className="w-4 h-4 text-gray-400" />,
    desc:"(555) 123-4567",
},
{
    id:3,
    icon:<Clock className="w-4 h-4 text-gray-400" />,
    desc:"Office Hours: Mon/Wed 2-4 PM",
},]

const InstructorDemo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Instructor Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/placeholder.svg?height=64&width=64" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Prof. Sarah Johnson</h3>
            <p className="text-sm text-gray-600">Computer Science Department</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">4.8/5.0</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {Data.map((item)=>(
            <div key={item.id} className="flex items-center gap-3 text-sm">
            {item.icon}
            <span>{item.desc}</span>
          </div>
          ))}
        </div>

        <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
          <MessageSquare className="w-4 h-4 mr-2" />
          Send Message
        </Button>
      </CardContent>
    </Card>
  );
};

export default InstructorDemo;
