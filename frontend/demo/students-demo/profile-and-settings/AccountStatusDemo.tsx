import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Data =[{
    id:1,
    title:"Account Active",
},
{
    id:2,
    title:"Email Verified",
},
{
    id:3,
    title:"2FA Disabled",
},
{
    id:4,
    title:"Profile Complete",
},]

const AccountStatusDemo = () => {
  return (
     <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Data.map((item)=>(
                    <div key={item.id} className="flex items-center gap-3">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{item.title}</span>
                  </div>
                  ))}
                </div>
              </CardContent>
            </Card>
  )
}

export default AccountStatusDemo