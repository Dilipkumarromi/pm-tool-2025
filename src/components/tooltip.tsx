import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
  type TooltipMessageProps = {
    message: string
    children: React.ReactNode
  }
  
  export function TooltipMessage({ message, children }: TooltipMessageProps) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger >
        <TooltipContent className="text-sm mr-3">
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    )
  }
  