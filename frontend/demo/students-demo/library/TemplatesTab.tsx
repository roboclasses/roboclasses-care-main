import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";
import { templates } from "./LibraryData";

const TemplatesTab = ({viewMode}:{viewMode:string}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">
          Downloadable Templates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
              : "space-y-3 sm:space-y-4"
          }
        >
          {templates.map((template) => (
            <Card
              key={template.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-3 sm:p-4">
                {viewMode === "grid" ? (
                  <div className="text-center">
                    <div className="w-full h-28 xs:h-32 sm:h-32 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-md mb-3 flex items-center justify-center">
                      <FileText className="h-8 w-8 sm:h-12 sm:w-12 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                      {template.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {template.format}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {template.size}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      {template.downloads} downloads
                    </p>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 w-full text-xs sm:text-sm"
                    >
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-12 h-12 xs:w-16 xs:h-16 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-md flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2">
                        {template.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {template.format}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {template.size}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-gray-500 mb-2">
                        {template.downloads} downloads
                      </p>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-xs px-2 sm:px-3"
                      >
                        <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden xs:inline">Download</span>
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

export default TemplatesTab;
