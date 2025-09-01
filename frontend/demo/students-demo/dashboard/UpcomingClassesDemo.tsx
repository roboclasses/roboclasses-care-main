'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { batchType } from "@/types/Types";
import axios from "axios";
import { NewBatchEntryUrl } from "@/constants";
import { getUserSession } from "@/lib/session";
import { format, isBefore, isToday, startOfDay } from "date-fns";
import Cookies from "js-cookie";
import { ScrollArea } from "@/components/ui/scroll-area";

const UpcomingClassesDemo = () => {
  const [user, setUser] = useState({name:"", role:""})
  const [batches, setBatches] = useState<batchType[]>([]);

    // For fetch user session
    useEffect(() => {
      const handleFetch = async () => {
        try {
          const session = await getUserSession();
          if (!session.name || !session.role) {
            throw new Error("No session found.");
          }
          setUser({ role: session.role, name: session.name });
        } catch (error) {
          console.error(error);
        }
      };
  
      handleFetch();
    }, []);

  // For fetch enrolled batches and time
  useEffect(()=>{
    const handleFetch = async()=>{
      try {
        const res = await axios.get(`${NewBatchEntryUrl}?name=${user.name}`, {headers:{Authorization: Cookies.get('token')}})
        if(res.data){
          const enrolledBatch = res.data.filter((item:batchType)=>item.studentName === user.name).map((item:batchType)=>item)
          if(enrolledBatch){
            setBatches(enrolledBatch)
          }
        }

      } catch (error) {
        console.error(error);
      }
    }

    handleFetch();
  },[user.name])

  // For filter batches with labels
  const filteredBatches = useMemo(() => {
    if (!batches) return [];

    const today = startOfDay(new Date());

    return batches.map((item: batchType) => {
      const itemDate = startOfDay(new Date(item.startDate));

      let status: "today" | "upcoming" | "old" = "upcoming";
      if (isToday(itemDate)) status = "today";
      else if (isBefore(itemDate, today)) status = "old";

      return { ...item, status };
    });
  }, [batches]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Classes & Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
        <div className="space-y-4">
         {filteredBatches.map((item, index)=>(
          <div key={index} className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{item.batch}</h4>
              <p className="text-sm text-gray-600">{item.startDate ? format(new Date(item.startDate), 'MMM dd, yyyy') : ''}</p>
            </div>
            {item.status =="today" &&  <Badge variant="destructive">Due Today</Badge>}
            {item.status =="upcoming" &&  <Badge variant="default">Upcoming</Badge>}
            {item.status =="old" &&  <Badge variant="outline">Completed</Badge>}
          </div>
         ))}
        </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default UpcomingClassesDemo;
