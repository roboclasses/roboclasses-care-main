import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { recentActivity } from "./NewsData"

const RecentActivityDemo = () => {
  return (
     <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 hover:bg-purple-50/50 rounded">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">{activity.action}</span> {activity.item}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
  )
}

export default RecentActivityDemo