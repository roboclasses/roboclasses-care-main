import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";

const Data = [
  {
    id: 1,
    title: "Last login:",
    desc: "Today at 2:30 PM",
  },
  {
    id: 2,
    title: "Device:",
    desc: "MacBook Pro - Chrome",
  },
  {
    id: 3,
    title: "Location:",
    desc: "New York, NY",
  },
];

const SessionDemo = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-800">Current Session</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Data.map((item) => (
            <div key={item.id} className="text-sm">
              <p className="text-gray-600">{item.title}</p>
              <p className="font-medium text-gray-800">{item.desc}</p>
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            className="w-full text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionDemo;
