import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Eye, Bookmark } from "lucide-react";
import Image from "next/image";
import { lectures } from "./LibraryData";

const LecturesTab = ({viewMode}:{viewMode:string}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Recorded Lectures</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6"
              : "space-y-3 sm:space-y-4"
          }
        >
          {lectures.map((lecture) => (
            <Card
              key={lecture.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-3 sm:p-4">
                {viewMode === "grid" ? (
                  <div>
                    <div className="relative mb-3">
                      <Image
                        height={100}
                        width={200}
                        src={lecture.thumbnail || "/placeholder.svg"}
                        alt={lecture.title}
                        className="w-full h-28 xs:h-32 sm:h-40 object-cover rounded-md"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="sm"
                          className="bg-black/50 hover:bg-black/70 text-white text-xs sm:text-sm"
                        >
                          <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Play
                        </Button>
                      </div>
                      <Badge className="absolute top-2 right-2 bg-black/70 text-white text-xs">
                        {lecture.duration}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                      {lecture.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 truncate">
                      {lecture.instructor}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="truncate">{lecture.course}</span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Eye className="h-3 w-3" />
                        <span>{lecture.views}</span>
                      </div>
                    </div>
                    <div className="flex flex-col xs:flex-row gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent text-xs sm:text-sm"
                      >
                        <Bookmark className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 flex-1 text-xs sm:text-sm"
                      >
                        <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Watch
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="relative flex-shrink-0">
                      <Image
                        height={100}
                        width={200}
                        src={lecture.thumbnail || "/placeholder.svg"}
                        alt={lecture.title}
                        className="w-20 h-12 xs:w-24 xs:h-16 sm:w-24 sm:h-16 object-cover rounded-md"
                      />
                      <Play className="absolute inset-0 m-auto h-4 w-4 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2">
                        {lecture.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">
                        {lecture.instructor}
                      </p>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {lecture.course}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {lecture.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-500">
                        <Eye className="h-3 w-3" />
                        <span>{lecture.views} views</span>
                        <span className="hidden xs:inline">•</span>
                        <span className="hidden xs:inline">{lecture.date}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent text-xs px-2 sm:px-3"
                      >
                        <Bookmark className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden xs:inline">Save</span>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-xs px-2 sm:px-3"
                      >
                        <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden xs:inline">Watch</span>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LecturesTab;
