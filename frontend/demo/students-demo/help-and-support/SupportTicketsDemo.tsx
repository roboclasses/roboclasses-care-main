"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, Paperclip } from "lucide-react";
import { supportTickets } from "./SupportData";

const SupportTicketsDemo = () => {
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-xl text-gray-800">
              My Support Tickets
            </CardTitle>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {supportTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-3 sm:p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col xs:flex-row xs:items-center gap-2 mb-2">
                        <h3 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                          {ticket.subject}
                        </h3>
                        <Badge
                          variant={
                            ticket.status === "Open"
                              ? "destructive"
                              : ticket.status === "In Progress"
                              ? "default"
                              : "secondary"
                          }
                          className={`text-xs ${
                            ticket.status === "Open"
                              ? "bg-red-100 text-red-700 border-red-200"
                              : ticket.status === "In Progress"
                              ? "bg-blue-100 text-blue-700 border-blue-200"
                              : "bg-green-100 text-green-700 border-green-200"
                          }`}
                        >
                          {ticket.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                        <span>ID: {ticket.id}</span>
                        <span>Priority: {ticket.priority}</span>
                        <span>Category: {ticket.category}</span>
                        <span className="xs:col-span-2 sm:col-span-1">
                          Assigned: {ticket.assignedTo}
                        </span>
                      </div>
                      <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-4 text-xs text-gray-500">
                        <span>Created: {ticket.created}</span>
                        <span>Last update: {ticket.lastUpdate}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-200 hover:bg-purple-50 bg-transparent text-xs sm:text-sm w-full xs:w-auto"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">
            Create New Support Ticket
          </CardTitle>
          <p className="text-sm text-gray-600">
            Describe your issue and we&apos;ll help you resolve it quickly
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Category
              </Label>
              <select className="mt-1 w-full px-3 py-2 text-sm border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400">
                <option>Technical Issue</option>
                <option>Account Problem</option>
                <option>Course Content</option>
                <option>Grade Inquiry</option>
                <option>Assignment Submission</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <Label
                htmlFor="priority"
                className="text-sm font-medium text-gray-700"
              >
                Priority Level
              </Label>
              <select className="mt-1 w-full px-3 py-2 text-sm border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400">
                <option>Low - General inquiry</option>
                <option>Medium - Non-urgent issue</option>
                <option>High - Affecting coursework</option>
                <option>Urgent - Critical issue</option>
              </select>
            </div>
          </div>

          <div>
            <Label
              htmlFor="subject"
              className="text-sm font-medium text-gray-700"
            >
              Subject
            </Label>
            <Input
              id="subject"
              placeholder="Brief description of your issue"
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
              className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label
              htmlFor="message"
              className="text-sm font-medium text-gray-700"
            >
              Detailed Description
            </Label>
            <textarea
              id="message"
              rows={4}
              placeholder="Please provide detailed information about your issue, including any error messages and steps you've already tried..."
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
              className="mt-1 w-full px-3 py-2 text-sm border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400 resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 flex-1 sm:flex-none text-sm">
              <Send className="h-4 w-4 mr-2" />
              Submit Ticket
            </Button>
            <Button
              variant="outline"
              className="border-purple-200 hover:bg-purple-50 flex-1 sm:flex-none bg-transparent text-sm"
            >
              <Paperclip className="h-4 w-4 mr-2" />
              Attach Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTicketsDemo;
