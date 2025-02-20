import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select'
import CalendarComponent from './ui/calendar'

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create Task' : 'Update Task'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label>Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" />
          </div>
          <div>
            <label>Description</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task description" />
          </div>
          <div>
            <label>Due Date</label>
            <CalendarComponent date={dueDate} onChange={setDueDate} />
          </div>
          <div>
            <label>Priority</label>
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
