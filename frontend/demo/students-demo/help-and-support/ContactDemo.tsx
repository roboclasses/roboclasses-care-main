import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageCircle,
  Phone,
  Mail,
  AlertCircle,
  Calendar,
} from "lucide-react";

const ContactDemo = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">
            Contact Support Team
          </CardTitle>
          <p className="text-sm text-gray-600">
            Multiple ways to get in touch with our dedicated support team
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Live Chat Support
                  </h3>
                  <p className="text-sm text-green-600">● Available 24/7</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Get instant help from our support specialists
              </p>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 w-full sm:w-auto"
              >
                Start Chat Now
              </Button>
            </div>

            <div className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email Support</h3>
                  <p className="text-sm text-gray-600">
                    Response within 4-6 hours
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                support@university.edu
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 hover:bg-purple-50 bg-transparent w-full sm:w-auto"
              >
                Send Email
              </Button>
            </div>

            <div className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone Support</h3>
                  <p className="text-sm text-gray-600">Mon-Fri 8AM-8PM EST</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                +1 (555) 123-HELP (4357)
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 hover:bg-purple-50 bg-transparent w-full sm:w-auto"
              >
                Call Now
              </Button>
            </div>

            <div className="p-4 border border-purple-100 rounded-lg hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Schedule Consultation
                  </h3>
                  <p className="text-sm text-gray-600">
                    One-on-one support session
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Book a personalized help session
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-200 hover:bg-purple-50 bg-transparent w-full sm:w-auto"
              >
                Book Session
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">
              Support Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-purple-100">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-purple-600" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Live Chat
                  </span>
                </div>
                <span className="text-sm text-green-600 font-medium">
                  24/7 Available
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-purple-100">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-purple-600" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Phone Support
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  Mon-Fri 8AM-8PM EST
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-purple-100">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-purple-600" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Email Support
                  </span>
                </div>
                <span className="text-sm text-gray-600">4-6 hour response</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Emergency Support
                  </span>
                </div>
                <span className="text-sm text-red-600 font-medium">
                  24/7 Critical Issues
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">
                  Critical System Issues
                </h4>
                <p className="text-sm text-red-700 mb-2">
                  For urgent technical problems affecting multiple users
                </p>
                <Button size="sm" variant="destructive" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Hotline
                </Button>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">
                  Academic Emergencies
                </h4>
                <p className="text-sm text-orange-700 mb-2">
                  For urgent academic support needs
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Academic Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactDemo;
