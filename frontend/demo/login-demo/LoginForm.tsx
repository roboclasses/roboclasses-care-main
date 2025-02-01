import * as React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SubmitButton from "../button-demo/SubmitButton"

export function LoginForm() {
  return (
        <form className="w-full px-20">
          <div className="grid items-center gap-4">       

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email"
                required
                autoComplete="email" 
                type="email"
                placeholder="Eg. devstidax@gmail.com" 
                className="h-12"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password"
                required
                autoComplete="password" 
                type="password"
                placeholder="Enter a strong password" 
                className="h-12"
              />
            </div>

            <SubmitButton name="Login" type="submit"/>
          </div>
        </form>
      
  )
}
