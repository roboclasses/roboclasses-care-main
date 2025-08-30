import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const colorMap : Record<string, string> = {
    purple: "text-purple-600",
    green: "text-green-600",
    blue: "text-blue-600",
    indigo: "text-indigo-600",

}

const Data = [{
    id:1,
    title:"< 90 sec",
    desc:"Avg. Chat Response",
    color:"purple",
},
{
    id:2,
    title:"99.2%",
    desc:"Issue Resolution Rate",
    color:"green",
},
{
    id:3,
    title:"4.9/5",
    desc:"Customer Satisfaction",
    color:"blue",
},
{
    id:4,
    title:"24/7",
    desc:"Live Chat Available",
    color:"indigo",
},]

const SupportPerformanceDemo = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">
                  Support Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Data.map((item)=>(
                    <div key={item.id} className="text-center">
                    <div className={`text-2xl font-bold ${colorMap[item.color]}`}>
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-600">
                     {item.desc}
                    </div>
                  </div>
                  ))}

                </div>
              </CardContent>
            </Card>
  )
}

export default SupportPerformanceDemo