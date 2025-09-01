"use client"

import * as React from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandDialog, // 👈 use CommandDialog for modal-like open/close
} from "@/components/ui/command"
import { Check, AlertTriangle, Signal } from "lucide-react"
import { cn } from "@/lib/utils"

// Priority list
const priorities = [
  { label: "No priority", value: "0", icon: null },
  { label: "Urgent", value: "1", icon: <AlertTriangle className="mr-2 h-4 w-4" /> },
  { label: "High", value: "2", icon: <Signal className="mr-2 h-4 w-4" /> },
  { label: "Medium", value: "3", icon: <Signal className="mr-2 h-4 w-4 opacity-70" /> },
  { label: "Low", value: "4", icon: <Signal className="mr-2 h-4 w-4 opacity-40" /> },
]

// Context
const PriorityContext = React.createContext<any>(null)

export function PriorityProvider({ children }: { children: React.ReactNode }) {
  const [priority, setPriority] = React.useState(priorities[0])
  const [open, setOpen] = React.useState(false) // 👈 control dropdown open/close

  return (
    <PriorityContext.Provider value={{ priority, setPriority, open, setOpen }}>
      {children}
    </PriorityContext.Provider>
  )
}

export function usePriority() {
  return React.useContext(PriorityContext)
}

export function PriorityCommand() {
  const { priority, setPriority, open, setOpen } = usePriority()

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Set priority to..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {priorities.map((p) => (
            <CommandItem
              key={p.value}
              value={p.label}
              onSelect={() => {
                setPriority(p)
                setOpen(false) // close after select
              }}
            >
              {p.icon}
              <span>{p.label}</span>
              <Check
                className={cn(
                  "ml-auto h-4 w-4",
                  priority.value === p.value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
