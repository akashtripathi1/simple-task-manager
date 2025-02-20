import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2 bg-white rounded-md shadow-sm", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-2 items-center w-full",
        caption_label: "text-base font-medium",
        nav: "flex items-center justify-between mb-2",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-75 hover:opacity-100 transition"
        ),
        nav_button_previous: "ml-2",
        nav_button_next: "mr-2",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell: "text-gray-500 rounded-md w-10 font-normal text-sm",
        row: "flex w-full mt-1",
        cell: cn(
          "relative p-1 text-center text-sm focus-within:z-20 transition-colors",
          props.mode === "range"
            ? "first:rounded-l-md last:rounded-r-md"
            : "rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal transition-colors"
        ),
        day_range_start: "rounded-l-md",
        day_range_end: "rounded-r-md",
        day_selected:
          "bg-primary text-white hover:bg-primary focus:bg-primary",
        day_today: "border border-primary",
        day_outside: "text-gray-400",
        day_disabled: "text-gray-300 opacity-50",
        day_range_middle: "bg-primary/50 text-white",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-5 w-5", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-5 w-5", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export default Calendar
