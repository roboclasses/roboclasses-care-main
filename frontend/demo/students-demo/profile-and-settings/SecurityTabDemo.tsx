"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Lock,
  Smartphone,
  Shield,
  Check,
  Eye,
  EyeOff,
  Key,
} from "lucide-react";

const SecurityTabDemo = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">
            Password & Security
          </CardTitle>
          <p className="text-sm text-gray-600">
            Manage your account security settings
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-800">
                  Strong Password Active
                </h4>
                <p className="text-sm text-green-700">
                  Your password meets all security requirements
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5 text-purple-600" />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Change Password
                    </h4>
                    <p className="text-sm text-gray-600">
                      Last changed 3 months ago
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-200 hover:bg-purple-50 bg-transparent"
                >
                  Update
                </Button>
              </div>
            </div>

            <div className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-gray-600">
                      Add an extra layer of security
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-700 border-yellow-200"
                  >
                    Disabled
                  </Badge>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600"
                  >
                    Enable
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-purple-600" />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Trusted Devices
                    </h4>
                    <p className="text-sm text-gray-600">
                      3 devices currently trusted
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-200 hover:bg-purple-50 bg-transparent"
                >
                  Manage
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Reset Section */}
      <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">
            Password Reset
          </CardTitle>
          <p className="text-sm text-gray-600">Update your account password</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label
              htmlFor="currentPassword"
              className="text-sm font-medium text-gray-700"
            >
              Current Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="pr-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <Label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700"
            >
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex-1 sm:flex-none">
              <Lock className="h-4 w-4 mr-2" />
              Update Password
            </Button>
            <Button
              variant="outline"
              className="border-purple-200 hover:bg-purple-50 flex-1 sm:flex-none bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTabDemo;
