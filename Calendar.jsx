import React, { useState } from 'react';
import { ShadCalendar } from 'shad-calendar';

const MyComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <ShadCalendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        selectedClassName="bg-blue-600 text-white"
      />
    </div>
  );
};

export default MyComponent;
