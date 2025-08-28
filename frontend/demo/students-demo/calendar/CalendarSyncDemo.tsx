import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink, Settings } from "lucide-react";

const Data = [
  {
    id: 1,
    name: "Google Calendar",
    icon: <ExternalLink className="h-4 w-4 mr-3" />,
  },
  {
    id: 2,
    name: "Outlook Calendar",
    icon: <ExternalLink className="h-4 w-4 mr-3" />,
  },
  {
    id: 3,
    name: "Export .ics",
    icon: <Download className="h-4 w-4 mr-3" />,
  },
  {
    id: 4,
    name: "Sync Settings",
    icon: <Settings className="h-4 w-4 mr-3" />,
  },
];

const CalendarSyncDemo = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-800">Calendar Sync</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Data.map((item) => (
            <Button
              key={item.id}
              variant="outline"
              size="sm"
              className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent text-sm"
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

export default CalendarSyncDemo;
