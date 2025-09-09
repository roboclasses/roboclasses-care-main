import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen } from "lucide-react"

const Data = [{
    id:1,
    title:"Overall Progress",
    stats:"75%",
},
{
    id:2,
    title:"Current Grade",
    stats:"A-",
},
{
    id:3,
    title:"Assignments",
    stats:"8/10",
},]

const Header = () => {
  return (
     <Card className="mb-8 bg-custom-gradient text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Course Progress</h2>
                <p className="text-purple-100 mb-4">You&apos;re doing great! Keep up the excellent work.</p>
                <div className="flex items-center gap-6">
                  {Data.map((item)=>(
                    <div key={item.id}>
                    <p className="text-sm text-purple-100">{item.title}</p>
                    <p className="text-2xl font-bold">{item.stats}</p>
                  </div>
                  ))}
                </div>
              </div>
              <div className="w-32 h-32 bg-white/20 rounded-full items-center justify-center lg:flex hidden">
                <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={75} className="h-2 bg-white/20" />
            </div>
          </CardContent>
        </Card>
  )
}

export default Header