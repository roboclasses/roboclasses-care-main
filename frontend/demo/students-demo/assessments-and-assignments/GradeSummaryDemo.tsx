import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const GradeSummaryDemo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800">Overall GPA</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">3.7</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Object-Oriented Programming</span>
              <Badge variant="secondary">A-</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database Systems</span>
              <Badge variant="secondary">A</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Web Development</span>
              <Badge variant="secondary">B+</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeSummaryDemo;
