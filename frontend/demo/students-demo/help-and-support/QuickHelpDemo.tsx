import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Video,
  Download,
  ExternalLink,
  Globe,
} from "lucide-react";

const Data = [{
    id:1,
    icon: <Globe className="h-4 w-4 mr-3" />,
    name: "System Status",
},
{
    id:2,
    icon: <Download className="h-4 w-4 mr-3" />,
    name: "User Manual",
},
{
    id:3,
    icon: <Video className="h-4 w-4 mr-3" />,
    name: "Video Library",
},
{
    id:4,
    icon: <ExternalLink className="h-4 w-4 mr-3" />,
    name: "Knowledge Base",
},]

const QuickHelpDemo = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">
                  Quick Help
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Data.map((item)=>(
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
  )
}

export default QuickHelpDemo