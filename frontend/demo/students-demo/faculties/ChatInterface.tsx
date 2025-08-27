"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Video,
  Send,
  Phone,
  MoreVertical,
  Paperclip,
  Smile,
} from "lucide-react";
import { useState } from "react";
import { conversations, messages } from "./FacutiesData";

const ChatInterface = ({selectedConversation}:{selectedConversation:number}) => {
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="lg:col-span-2">
      <Card className="h-[500px] sm:h-[600px] flex flex-col">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarImage
                  src={
                    conversations[selectedConversation]?.avatar ||
                    "/assets/images/student-profile.png"
                  }
                />
                <AvatarFallback>
                  {conversations[selectedConversation]?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm sm:text-base">
                  {conversations[selectedConversation]?.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {conversations[selectedConversation]?.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Video className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isOwn ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] sm:max-w-[70%] ${
                    message.isOwn
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  } rounded-lg p-2 sm:p-3`}
                >
                  <p className="text-xs sm:text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isOwn ? "text-purple-100" : "text-gray-500"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        <div className="border-t p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 text-sm"
            />
            <Button size="sm" variant="outline">
              <Smile className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;
