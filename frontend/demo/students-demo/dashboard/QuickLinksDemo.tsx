import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, FileText, MessageSquare } from "lucide-react";

const QuickLinksDemo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 bg-transparent hover:bg-purple-50"
          >
            <FileText className="w-6 h-6 text-purple-600" />
            <span className="text-sm">Assignments</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 bg-transparent hover:bg-purple-50"
          >
            <BookOpen className="w-6 h-6 text-purple-600" />
            <span className="text-sm">Grades</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 bg-transparent hover:bg-purple-50"
          >
            <MessageSquare className="w-6 h-6 text-purple-600" />
            <span className="text-sm">Messages</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2 bg-transparent hover:bg-purple-50"
          >
            <Calendar className="w-6 h-6 text-purple-600" />
            <span className="text-sm">Schedule</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickLinksDemo;
