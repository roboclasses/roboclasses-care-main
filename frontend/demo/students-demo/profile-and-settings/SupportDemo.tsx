import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Data = [
  {
    id: 1,
    name: "Contact Support",
  },
  {
    id: 2,
    name: "Help Center",
  },
  {
    id: 3,
    name: "Privacy Policy",
  },
];

const SupportDemo = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-800">Support & Help</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Need assistance with your account or settings?
          </p>
          <div className="space-y-2">
            {Data.map((item) => (
              <Button
                key={item.id}
                variant="outline"
                size="sm"
                className="w-full border-purple-200 hover:bg-purple-50 bg-transparent"
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportDemo;
