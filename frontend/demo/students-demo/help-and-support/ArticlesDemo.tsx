import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Data = [
  { title: "Password Reset Guide", views: "2.1k" },
  { title: "Assignment Submission Help", views: "1.8k" },
  { title: "Course Navigation Tutorial", views: "1.5k" },
  { title: "Grade Calculation Explained", views: "1.3k" },
  { title: "Mobile App Setup", views: "1.1k" },
];

const ArticlesDemo = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-800">
          Most Helpful Articles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Data.map((article, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 hover:bg-purple-50/50 rounded cursor-pointer"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-indigo-100 rounded flex items-center justify-center text-xs font-semibold text-purple-600 flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm text-gray-700 block truncate">
                  {article.title}
                </span>
                <span className="text-xs text-gray-500">
                  {article.views} views
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticlesDemo;
