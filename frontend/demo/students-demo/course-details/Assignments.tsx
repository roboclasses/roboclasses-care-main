import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, Upload } from "lucide-react";

const Assignments = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignments & Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-red-800">
                Assignment 3: Inheritance Project
              </h3>
              <Badge variant="destructive">Due in 2 days</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Create a class hierarchy for a library management system
              demonstrating inheritance and polymorphism.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Due: Dec 18, 2024
                </span>
                <span>Points: 100</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Submit
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-green-800">
                Assignment 2: Class Design
              </h3>
              <Badge className="bg-green-600">Submitted</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Design and implement a banking system with proper encapsulation.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Grade: 95/100</span>
                <span>Submitted: Dec 10, 2024</span>
              </div>
              <Button size="sm" variant="outline">
                View Feedback
              </Button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-blue-800">
                Assignment 1: Basic OOP Concepts
              </h3>
              <Badge className="bg-blue-600">Graded</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Introduction to classes and objects with a simple calculator
              implementation.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Grade: 88/100</span>
                <span>Submitted: Nov 28, 2024</span>
              </div>
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Assignments;
