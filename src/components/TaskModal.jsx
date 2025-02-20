import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

const TaskModal = ({ isOpen, onClose, onSubmit, mode, initialData }) => {
  const [title, setTitle] = useState(initialData ? initialData.title : '')
  const [description, setDescription] = useState(initialData ? initialData.description : '')
  const [dueDate, setDueDate] = useState(initialData ? new Date(initialData.dueDate) : new Date())
  const [priority, setPriority] = useState(initialData ? initialData.priority : 'medium')

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setDescription(initialData.description)
      setDueDate(new Date(initialData.dueDate))
      setPriority(initialData.priority)
    } else {
      setTitle('')
      setDescription('')
      setDueDate(new Date())
      setPriority('medium')
    }
  }, [initialData, isOpen])

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      dueDate: dueDate.toISOString(),
      priority
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create Task' : 'Update Task'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Add a new task to your list.' 
              : 'Update the details of your existing task.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Task description" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Due Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <Select value={priority} onValueChange={(val) => setPriority(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{mode === 'create' ? 'Create' : 'Update'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TaskModal
