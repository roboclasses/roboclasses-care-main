import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Share } from "lucide-react";
import { databases } from "./LibraryData";

const DatabaseTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">
          Research Database Links
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {databases.map((db) => (
            <Card
              key={db.id}
              className="border hover:shadow-md transition-shadow"
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex-1">
                    <div className="flex flex-col xs:flex-row xs:items-center gap-2 mb-2">
                      <h3 className="font-medium text-sm sm:text-base flex-1 min-w-0">
                        {db.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className={`text-xs self-start xs:self-center flex-shrink-0 ${
                          db.access === "Full Access"
                            ? "bg-green-100 text-green-800"
                            : db.access === "Limited Access"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {db.access}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                      {db.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {db.category}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent flex-1 xs:flex-none text-xs sm:text-sm"
                    >
                      <Share className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="hidden xs:inline">Share</span>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 flex-1 xs:flex-none text-xs sm:text-sm"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Access
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseTab;
