import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Play } from "lucide-react";
import { tutorials } from "./SupportData";
import Image from "next/image";

const TutorialsTabDemo = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">
          Video Tutorials & Guides
        </CardTitle>
        <p className="text-sm text-gray-600">
          Learn how to use LMS features with comprehensive step-by-step guides
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="border border-purple-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative">
                <Image
                  height={100}
                  width={200}
                  src={tutorial.thumbnail || "/placeholder.svg"}
                  alt={tutorial.title}
                  className="w-full h-32 sm:h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="h-6 w-6 text-purple-600 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {tutorial.duration}
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-2 line-clamp-2">
                  {tutorial.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                  {tutorial.description}
                </p>
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <span>{tutorial.views} views</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{tutorial.rating}</span>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-700 text-xs"
                  >
                    {tutorial.category}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorialsTabDemo;
