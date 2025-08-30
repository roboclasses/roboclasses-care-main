"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight } from "lucide-react";
import { faqCategories } from "./SupportData";
import { useState } from "react";

const FaqTabDemo = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // For filter FAQs
  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0 || searchQuery === "");

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl sm:text-2xl text-gray-800">
            Frequently Asked Questions
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
            {faqCategories.map((category) => (
              <div
                key={category.id}
                className="p-3 sm:p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                    <category.icon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                      {category.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {category.count} articles
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((category) => (
              <div key={category.id}>
                {category.questions.length > 0 && (
                  <>
                    <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-3">
                      {category.title}
                    </h3>
                    <div className="space-y-2 mb-6">
                      {category.questions.map((faq, index) => (
                        <details
                          key={index}
                          className="group border border-purple-100 rounded-lg"
                        >
                          <summary className="flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-purple-50/50">
                            <span className="font-medium text-sm sm:text-base text-gray-800 pr-2">
                              {faq.q}
                            </span>
                            <ChevronRight className="h-4 w-4 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                          </summary>
                          <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-gray-600 border-t border-purple-100">
                            <p className="pt-3 text-sm sm:text-base">{faq.a}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaqTabDemo;
