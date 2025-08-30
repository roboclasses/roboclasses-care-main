"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Edit, Save, X, Link } from "lucide-react";
import { linkedAccounts } from "./ProfileData";
import { useState } from "react";

const ProfileSectionDemo = () => {
const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    studentId: "STU2024001",
    program: "Computer Science",
    year: "3rd Year",
    gpa: "3.85",
    advisor: "Dr. Sarah Johnson",
    emergencyContact: "Jane Doe - (555) 987-6543",
    address: "123 University Ave, College Town, ST 12345",
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-xl sm:text-2xl text-gray-800">
              Personal Information
            </CardTitle>
            <Button
              variant={isEditing ? "outline" : "default"}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className={
                isEditing
                  ? "border-purple-200 hover:bg-purple-50"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600"
              }
            >
              {isEditing ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center gap-4 lg:w-48">
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-400 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                  JD
                </div>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 p-0 shadow-lg"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg text-gray-800">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="text-sm text-gray-600">{profileData.studentId}</p>
                <Badge className="mt-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border-purple-200">
                  {profileData.program}
                </Badge>
              </div>
            </div>

            {/* Profile Form */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        firstName: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        lastName: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    disabled={!isEditing}
                    className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    disabled={!isEditing}
                    className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label
                    htmlFor="program"
                    className="text-sm font-medium text-gray-700"
                  >
                    Program
                  </Label>
                  <Input
                    id="program"
                    value={profileData.program}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        program: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="year"
                    className="text-sm font-medium text-gray-700"
                  >
                    Academic Year
                  </Label>
                  <Input
                    id="year"
                    value={profileData.year}
                    onChange={(e) =>
                      setProfileData({ ...profileData, year: e.target.value })
                    }
                    disabled={!isEditing}
                    className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="gpa"
                    className="text-sm font-medium text-gray-700"
                  >
                    Current GPA
                  </Label>
                  <Input
                    id="gpa"
                    value={profileData.gpa}
                    disabled
                    className="mt-1 bg-gray-50 border-gray-200"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="advisor"
                  className="text-sm font-medium text-gray-700"
                >
                  Academic Advisor
                </Label>
                <Input
                  id="advisor"
                  value={profileData.advisor}
                  disabled
                  className="mt-1 bg-gray-50 border-gray-200"
                />
              </div>

              <div>
                <Label
                  htmlFor="emergency"
                  className="text-sm font-medium text-gray-700"
                >
                  Emergency Contact
                </Label>
                <Input
                  id="emergency"
                  value={profileData.emergencyContact}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      emergencyContact: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>

              <div>
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Address
                </Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) =>
                    setProfileData({ ...profileData, address: e.target.value })
                  }
                  disabled={!isEditing}
                  className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>

              {isEditing && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex-1 sm:flex-none">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="border-purple-200 hover:bg-purple-50 flex-1 sm:flex-none"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">
            Linked Accounts
          </CardTitle>
          <p className="text-sm text-gray-600">
            Connect your external accounts for seamless integration
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {linkedAccounts.map((account) => (
              <div
                key={account.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-purple-100 rounded-lg bg-gradient-to-r from-purple-50/50 to-indigo-50/50"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center border border-purple-200">
                    <Link className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800">
                      {account.provider}
                    </h4>
                    <p className="text-sm text-gray-600 truncate">
                      {account.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      Last sync: {account.lastSync}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={account.connected ? "default" : "secondary"}
                    className={
                      account.connected
                        ? "bg-green-100 text-green-700 border-green-200"
                        : ""
                    }
                  >
                    {account.connected ? "Connected" : "Disconnected"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`${
                      account.connected
                        ? "text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                        : "text-green-600 hover:text-green-700 border-green-200 hover:bg-green-50"
                    }`}
                  >
                    {account.connected ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSectionDemo;
