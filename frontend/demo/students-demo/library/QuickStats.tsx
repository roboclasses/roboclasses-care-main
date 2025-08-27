import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuickStats = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg">Library Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-gray-600">
              Books Downloaded
            </span>
            <span className="font-medium text-sm sm:text-base">23</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-gray-600">
              Lectures Watched
            </span>
            <span className="font-medium text-sm sm:text-base">45</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-gray-600">
              Templates Used
            </span>
            <span className="font-medium text-sm sm:text-base">12</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-gray-600">Bookmarks</span>
            <span className="font-medium text-sm sm:text-base">8</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
