import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Star, Eye } from "lucide-react";
import Image from "next/image";
import { ebooks } from "./LibraryData";

const EBooksTab = ({viewMode}:{viewMode:string}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">E-Books & PDFs</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
              : "space-y-3 sm:space-y-4"
          }
        >
          {ebooks.map((book) => (
            <Card key={book.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4">
                {viewMode === "grid" ? (
                  <div className="text-center">
                    <Image
                      height={100}
                      width={200}
                      src={book.thumbnail || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-28 xs:h-32 sm:h-40 object-cover rounded-md mb-3"
                    />
                    <h3 className="font-medium text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                      {book.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 truncate">
                      {book.author}
                    </p>
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-3 text-xs sm:text-sm">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                      <span>{book.rating}</span>
                      <span className="text-gray-500 hidden xs:inline">
                        ({book.downloads})
                      </span>
                    </div>
                    <div className="flex flex-col xs:flex-row gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent text-xs sm:text-sm"
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 flex-1 text-xs sm:text-sm"
                      >
                        <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Image
                      height={100}
                      width={200}
                      src={book.thumbnail || "/placeholder.svg"}
                      alt={book.title}
                      className="w-12 h-16 xs:w-16 xs:h-20 sm:w-16 sm:h-20 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">
                        {book.author}
                      </p>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {book.subject}
                        </Badge>
                        <span className="text-xs text-gray-500 hidden xs:inline">
                          {book.pages} pages
                        </span>
                        <span className="text-xs text-gray-500">
                          {book.size}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                        <span className="text-xs sm:text-sm">
                          {book.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent text-xs px-2 sm:px-3"
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden xs:inline">Preview</span>
                      </Button>
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

export default EBooksTab;
