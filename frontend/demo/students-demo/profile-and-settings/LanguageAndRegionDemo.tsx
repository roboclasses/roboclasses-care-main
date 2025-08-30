"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const LanguageAndRegionDemo = () => {
  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    colorBlindSupport: false,
    voiceNavigation: false,
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Language & Region */}
      <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">
            Language & Accessibility Settings
          </CardTitle>
          <p className="text-sm text-gray-600">
            Customize your experience and accessibility options
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-medium text-gray-700">Language</Label>
              <select className="mt-1 w-full px-3 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400">
                <option>English (US)</option>
                <option>Spanish (ES)</option>
                <option>French (FR)</option>
                <option>German (DE)</option>
                <option>Chinese (ZH)</option>
              </select>
            </div>
            <div>
              <Label className="font-medium text-gray-700">Time Zone</Label>
              <select className="mt-1 w-full px-3 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400">
                <option>Eastern Time (ET)</option>
                <option>Central Time (CT)</option>
                <option>Mountain Time (MT)</option>
                <option>Pacific Time (PT)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-medium text-gray-700">Date Format</Label>
              <select className="mt-1 w-full px-3 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <Label className="font-medium text-gray-700">Theme</Label>
              <select className="mt-1 w-full px-3 py-2 border border-purple-200 rounded-md focus:border-purple-400 focus:ring-purple-400">
                <option>Light Mode</option>
                <option>Dark Mode</option>
                <option>Auto (System)</option>
              </select>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-4">
              Accessibility Options
            </h4>
            <div className="space-y-4">
              {[
                {
                  key: "highContrast",
                  label: "High Contrast Mode",
                  desc: "Increase contrast for better visibility",
                },
                {
                  key: "largeText",
                  label: "Large Text",
                  desc: "Increase font size throughout the application",
                },
                {
                  key: "reducedMotion",
                  label: "Reduced Motion",
                  desc: "Minimize animations and transitions",
                },
                {
                  key: "screenReader",
                  label: "Screen Reader Support",
                  desc: "Optimize interface for screen readers",
                },
                {
                  key: "keyboardNavigation",
                  label: "Enhanced Keyboard Navigation",
                  desc: "Improved keyboard shortcuts and focus",
                },
                {
                  key: "colorBlindSupport",
                  label: "Color Blind Support",
                  desc: "Alternative color schemes for accessibility",
                },
                {
                  key: "voiceNavigation",
                  label: "Voice Navigation",
                  desc: "Enable voice commands and navigation",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 border border-purple-100 rounded-lg"
                >
                  <div>
                    <Label className="font-medium text-gray-800">
                      {item.label}
                    </Label>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <Switch
                    checked={
                      accessibility[item.key as keyof typeof accessibility]
                    }
                    onCheckedChange={(checked) =>
                      setAccessibility({
                        ...accessibility,
                        [item.key]: checked,
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageAndRegionDemo;
