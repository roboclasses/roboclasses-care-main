import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { conversations } from "./FacutiesData";

const ConvoListDemo = ({
  selectedConversation,
  setSelectedConversation,
}: {
  selectedConversation: number;
  setSelectedConversation: (index: number) => void;
}) => {
  return (
    <div className="lg:col-span-1">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg">
              Conversations
            </CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 text-sm"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {conversations.map((conv, index) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(index)}
                className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === index
                    ? "bg-purple-50 border-r-2 border-purple-600"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarImage
                      src={conv.avatar || "/assets/images/student-profile.png"}
                    />
                    <AvatarFallback>
                      {conv.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate">
                        {conv.name}
                      </h4>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{conv.role}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-purple-600 text-white text-xs"
                    >
                      {conv.unread}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConvoListDemo;
