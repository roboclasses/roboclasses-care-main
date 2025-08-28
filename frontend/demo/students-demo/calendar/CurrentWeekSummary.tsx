import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const colorMap : Record<string, string> = {
    purple:"text-purple-600",
    blue: "text-blue-600",
    red: "text-red-600",
    orange: "text-orange-600",
}

const Data = [{
    id:1,
    count:"12",
    title:"Total Events",
    color:"purple",
},
{
    id:2,
    count:"8",
    title:"Lectures",
    color:"blue",
},
{
    id:3,
    count:"3",
    title:"Deadlines",
    color:"red",
},
{
    id:4,
    count:"1",
    title:"Exams",
    color:"orange",
},]

const CurrentWeekSummary = () => {
  return (
   <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">This Week Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Data.map((item)=>(
                        <div key={item.id} className="text-center">
                    <div className={`text-2xl font-bold ${colorMap[item.color]}`}>{item.count}</div>
                    <div className="text-sm text-gray-600">{item.title}</div>
                  </div>
                  ))}
                </div>
              </CardContent>
            </Card>
  )
}

export default CurrentWeekSummary