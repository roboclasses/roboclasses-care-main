import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "lucide-react";

const Courses = [
            "Computer Science",
            "Mathematics",
            "Software Engineering",
            "Database Systems",
            "Machine Learning",
            "Web Development",
          ]

const PopularCategoriesDemo = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg">
          Popular Categories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Courses.map((category, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs sm:text-sm bg-transparent min-h-[36px] px-3"
            >
              <Tag className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{category}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularCategoriesDemo;
