"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter } from "lucide-react";
import { forumTopics } from "./FacutiesData";

const ForumsTab = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-lg sm:text-xl">
            Discussion Forums
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 sm:flex-none bg-transparent"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 flex-1 sm:flex-none"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Topic
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          {forumTopics.map((topic) => (
            <div
              key={topic.id}
              className="border rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-2">
                    <h3 className="font-medium text-sm sm:text-base hover:text-purple-600 cursor-pointer">
                      {topic.title}
                    </h3>
                    {topic.status === "pinned" && (
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800 text-xs"
                      >
                        Pinned
                      </Badge>
                    )}
                    {topic.status === "answered" && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 text-xs"
                      >
                        Answered
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                    <span>by {topic.author}</span>
                    <span>•</span>
                    <span>{topic.category}</span>
                    <span>•</span>
                    <span>{topic.replies} replies</span>
                    <span>•</span>
                    <span>{topic.lastActivity}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="self-start bg-transparent"
                >
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForumsTab;
