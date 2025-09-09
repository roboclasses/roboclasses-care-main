import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";

const Discussions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Discussion Forum</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">Prof. Sarah Johnson</h4>
                  <Badge variant="secondary" className="text-xs">
                    Instructor
                  </Badge>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <h3 className="font-medium mb-2">
                  Assignment 3 Clarifications
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Several students have asked about the UML diagram
                  requirements. Please remember to include...
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <button className="flex items-center gap-1 hover:text-purple-600">
                    <MessageSquare className="w-3 h-3" />
                    12 replies
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border">
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">Alex Martinez</h4>
                  <span className="text-xs text-gray-500">5 hours ago</span>
                </div>
                <h3 className="font-medium mb-2">
                  Help with Polymorphism Example
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Can someone explain the difference between method overriding
                  and overloading with a practical example?
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <button className="flex items-center gap-1 hover:text-purple-600">
                    <MessageSquare className="w-3 h-3" />8 replies
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border">
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>LW</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">Lisa Wang</h4>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
                <h3 className="font-medium mb-2">Study Group for Final Exam</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Looking to form a study group for the final exam. Anyone
                  interested in meeting this weekend?
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <button className="flex items-center gap-1 hover:text-purple-600">
                    <MessageSquare className="w-3 h-3" />
                    15 replies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Discussions;
