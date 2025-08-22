import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

const EnrolledCoursesDemo = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Current Enrolled Courses</CardTitle>
        <Button variant="link" className="text-purple-600">
          See all
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700"
                >
                  In Progress
                </Badge>
              </div>
              <h3 className="font-semibold mb-2">
                Object Oriented Programming
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Learn the fundamentals of OOP concepts
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                View Course
              </Button>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 bg-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-700"
                >
                  In Progress
                </Badge>
              </div>
              <h3 className="font-semibold mb-2">Database Systems</h3>
              <p className="text-sm text-gray-600 mb-4">
                Fundamentals of database design and SQL
              </p>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                View Course
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnrolledCoursesDemo;
