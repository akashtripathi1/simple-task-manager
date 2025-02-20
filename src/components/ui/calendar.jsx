import React from 'react'
import { format } from 'date-fns'

const Calendar = ({ date, onChange }) => {
  return (
    <input
      type="date"
      value={format(date, 'yyyy-MM-dd')}
      onChange={(e) => onChange(new Date(e.target.value))}
      className="border p-2 rounded"
    />
  )
}

export default Calendar
