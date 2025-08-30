import { Button } from "@/components/ui/button"
import { Download, Settings } from "lucide-react"

const Header = () => {
  return (
     <div className="bg-custom-gradient backdrop-blur-sm rounded-xl shadow-lg mb-4 sm:mb-6 p-4 sm:p-6 border border-purple-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Profile & Settings
              </h1>
              <p className="text-sm sm:text-base text-purple-100">Manage your personal information and preferences</p>
            </div>
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
              <Button variant="outline" size="sm" className="bg-white/50 border-purple-200 hover:bg-purple-50">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <Settings className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </div>
          </div>
        </div>
  )
}

export default Header