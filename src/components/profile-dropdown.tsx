/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import React from "react"
import { CircleFadingPlus, Mail } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Clock, User, Box } from "lucide-react"
export function UserProfileAssign() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleFadingPlus size={15} className="cursor-pointer" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64">
        {/* No assignee */}
        <DropdownMenuItem className="flex items-center justify-between">
          <span className="flex items-center">
            <span className="mr-2">☀️</span> No assignee
          </span>
          <span className="text-xs text-gray-400">0</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Team members */}
        <DropdownMenuLabel>Team members</DropdownMenuLabel>

        {/* romi.indan with nested dropdown */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/avatar.jpg" alt="romi.indan" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
            <span>romi.indan</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-60">
          <div className=" rounded-lg bg-white  p-4">
      {/* Header with avatar + name */}
      <div className="flex items-center gap-3">
        <img
          src="/avatar.jpg"
          alt="Dilip kumar romi"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-base font-semibold text-gray-800">
            Dilip kumar romi
          </h2>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>romi.indan</span>
            <span>•</span>
            <span>Online</span>
            <span className="ml-1 h-2 w-2 rounded-full bg-green-500 inline-block"></span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-3 border-gray-200" />

      {/* Details */}
      <div className="space-y-3 text-sm text-gray-700">
        {/* Local time */}
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-500" />
          <span>23:22 local time</span>
        </div>

        {/* Student test */}
        <div className="flex items-center gap-2">
          <User size={16} className="text-gray-500" />
          <span>Student test</span>
        </div>

        {/* Assign */}
        <div className="flex items-center gap-2">
          <Box size={16} className="text-gray-500" />
          <span>Assign</span>
        </div>
      </div>
    </div>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        {/* Invite new user */}
        <DropdownMenuItem className="flex items-center space-x-2">
          <Mail size={14} className="text-gray-500" />
          <span>Invite and assign…</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
