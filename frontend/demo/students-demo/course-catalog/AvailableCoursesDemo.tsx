import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Users } from "lucide-react";

const AvailableCoursesDemo = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Available Courses</CardTitle>
        <Button variant="link" className="text-purple-600">
          View All Catalog
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Card className="border-blue-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="lg:flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      Machine Learning Fundamentals
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Introduction to ML algorithms and applications
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        12 weeks
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        25 spots left
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="mb-2">Advanced</Badge>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-teal-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="lg:flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-teal-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      Mobile App Development
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Build native mobile apps with React Native
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        14 weeks
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        18 spots left
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="mb-2">Intermediate</Badge>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="lg:flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-rose-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      Cybersecurity Essentials
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Learn network security and ethical hacking
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        10 weeks
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        32 spots left
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="mb-2">Beginner</Badge>
                  <Button className="w-full bg-rose-600 hover:bg-rose-700">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailableCoursesDemo;
