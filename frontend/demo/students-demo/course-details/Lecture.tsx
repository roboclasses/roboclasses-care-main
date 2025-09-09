import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Download, FileText, Video } from "lucide-react";

const Lecture = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lecture Videos & Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">
                Lecture 8: Polymorphism in Practice
              </h3>
              <p className="text-sm text-gray-600">
                Duration: 45 minutes • Uploaded 2 days ago
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Watch
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">
                Lecture 7: Inheritance Hierarchies
              </h3>
              <p className="text-sm text-gray-600">
                Duration: 52 minutes • Watched
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Play className="w-4 h-4 mr-2" />
                Rewatch
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Lecture Slides: Chapter 5</h3>
              <p className="text-sm text-gray-600">
                PDF • 2.4 MB • Updated yesterday
              </p>
            </div>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Lecture;
