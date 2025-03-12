'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { Separator } from '@radix-ui/react-separator'
import { SidebarTrigger } from './ui/sidebar'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from './ui/breadcrumb'


const NavBar = () => {
    const pathname = usePathname();

    // Split the pathname 
    const segments = pathname.split('/').filter(segment => segment !== '')
     
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
    <div className="flex items-center gap-2 px-3">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/">
             {'Dashboard'}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />  
          {
            segments.map((segment, index)=>(
            <React.Fragment key={index}>
                <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={pathname}>
                 {segment}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" /> 
            </React.Fragment> 
            ))
          }       
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>
  )
}

export default NavBar