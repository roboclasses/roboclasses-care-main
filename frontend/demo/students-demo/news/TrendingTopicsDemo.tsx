import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { trendingTopics } from "./NewsData";

const TrendingTopicsDemo = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-800">Trending Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-purple-50/50 rounded"
            >
              <div className="flex items-center gap-2">
                <TrendingUp
                  className={`h-4 w-4 ${
                    topic.trend === "up"
                      ? "text-green-600"
                      : topic.trend === "down"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                />
                <span className="text-sm text-gray-700">{topic.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {topic.mentions}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTopicsDemo;
