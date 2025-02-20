import * as React from "react";
import { Calendar as ShadCalendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const CustomCalendar = ({ selectedDate, onSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (date) => {
    if (date) {
      console.log("Date Selected:", date);
      onSelect(date);
      setIsOpen(false);
    }
  };

  return (
    // Set modal to true to ensure proper behavior inside a Dialog
    <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={4}
        className="w-auto p-2 bg-white shadow-md rounded-lg"
      >
        <ShadCalendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
};

export { CustomCalendar };
