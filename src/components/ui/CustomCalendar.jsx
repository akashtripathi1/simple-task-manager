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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full flex justify-between items-center px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-offset-2"
        >
          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
          <CalendarIcon className="w-5 h-5 ml-2 text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-2 shadow-lg rounded-lg bg-white">
        <ShadCalendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          className="rounded-lg shadow-sm custom-calendar"
        />
      </PopoverContent>
    </Popover>
  );
};

export { CustomCalendar };