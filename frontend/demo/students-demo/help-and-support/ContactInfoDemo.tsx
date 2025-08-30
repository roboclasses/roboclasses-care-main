import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones } from "lucide-react";

const colorMap: Record<string, string> = {
  gray: "text-gray-800",
  slate: "text-slate-800",
  red: "text-red-800",
  green: "text-green-800",
};

const Data = [
  {
    id: 1,
    title: "Support Email:",
    contact: "support@university.edu",
    color: "gray",
  },
  {
    id: 2,
    title: "Phone Support:",
    contact: "+1 (555) 123-HELP",
    color: "slate",
  },
  {
    id: 3,
    title: "Emergency Line:",
    contact: "+1 (555) 911-HELP",
    color: "red",
  },
  {
    id: 4,
    title: "Live Chat:",
    contact: "Available 24/7",
    color: "green",
  },
];

const ContactInfoDemo = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-800">
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Data.map((item) => (
            <div key={item.id} className="text-sm">
              <p className="text-gray-600 mb-1">{item.title}</p>
              <p className={`font-medium ${colorMap[item.color]}`}>{item.contact}</p>
            </div>
          ))}

          <Button
            size="sm"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 mt-3"
          >
            <Headphones className="h-4 w-4 mr-2" />
            Get Help Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfoDemo;
