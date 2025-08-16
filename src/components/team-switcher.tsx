/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import * as React from "react";
import { ChevronDown, Plus, NotebookPen, Search } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import IssueModel from "./model/IssueModel";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  if (!activeTeam) {
    return null;
  }

  // separate handlers for Search + NotebookPen
  const handleSearchClick = () => {
    console.log("Search clicked");
    // your search logic here (open modal, input, etc.)
  };

  const handleNotebookClick = () => {
    console.log("Notebook clicked");
    // your notebook logic here
  };
  const modalRef = React.useRef<{ openModal: () => void; closeModal: () => void }>(null);

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-5 items-center justify-center rounded-md">
                <activeTeam.logo className="size-3" />
              </div>
              <span className="truncate font-medium">{activeTeam.name}</span>
              <ChevronDown className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-xs border">
                  <team.logo className="size-4 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Icons outside dropdown with separate actions */}
        <div className="flex items-center gap-3">
          <Search
            className="opacity-70 cursor-pointer"
            size={15}
            onClick={handleSearchClick}
          />
          <NotebookPen
            className="opacity-70 cursor-pointer shadow"
            size={17}
            onClick={() => modalRef.current?.openModal()}
          />
        </div>
      </SidebarMenuItem>
      <IssueModel ref={modalRef} />

    </SidebarMenu>
  );
}
