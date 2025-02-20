import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { CustomCalendar } from '@/components/ui/CustomCalendar';
import { Button } from '@/components/ui/button';

const TaskModal = ({ isOpen, onClose, onSubmit, mode, initialData }) => {
  const [title, setTitle] = useState(initialData ? initialData.title : '');
  const [description, setDescription] = useState(initialData ? initialData.description : '');
  const [dueDate, setDueDate] = useState(initialData ? new Date(initialData.dueDate) : new Date());
  const [priority, setPriority] = useState(initialData ? initialData.priority : 'medium');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDueDate(new Date(initialData.dueDate));
      setPriority(initialData.priority);
    } else {
      setTitle('');
      setDescription('');
      setDueDate(new Date());
      setPriority('medium');
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      dueDate: dueDate.toISOString(),
      priority
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-md">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create Task' : 'Update Task'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Add a new task to your list.' 
              : 'Update the details of your existing task.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Task description" 
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <CustomCalendar selectedDate={dueDate} onSelect={setDueDate} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium mb-1">Priority</label>
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
  );
};

export default TaskModal;
