import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  Check,
  AlertCircle,
  CheckCircle2,
  Filter,
  CalendarClock
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '../lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Toaster, useToast } from '@/components/ui/toaster'
import TaskCard from './TaskCard'
import TaskModal from './TaskModal'
import { addTask, updateTask, deleteTask, completeTask } from '../redux/tasksSlice'
import { format } from 'date-fns'
  
const TaskManager = () => {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const tasks = useSelector(state => state.tasks.tasks)
  
  const [activeTab, setActiveTab] = useState('upcoming')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPriority, setFilterPriority] = useState('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    const dueDate = new Date(task.dueDate)
    const isOverdue = !task.completed && dueDate < new Date()

    switch (activeTab) {
      case 'upcoming':
        return !task.completed && !isOverdue && matchesSearch && matchesPriority
      case 'overdue':
        return isOverdue && matchesSearch && matchesPriority
      case 'completed':
        return task.completed && matchesSearch && matchesPriority
      default:
        return false
    }
  })

  const handleCreateTask = (formData) => {
    const task = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      completed: false
    }
    dispatch(addTask(task))
    setIsCreateModalOpen(false)
  }

  const handleUpdateTask = (formData) => {
    dispatch(updateTask({ ...formData, id: currentTask.id }))
    setIsUpdateModalOpen(false)
    setCurrentTask(null)
  }

  const handleDeleteTask = (taskId) => {
    const taskToDelete = tasks.find(task => task.id === taskId)
    dispatch(deleteTask(taskId))
    toast({
      title: "Task Deleted",
      description: `Successfully deleted task: ${taskToDelete.title}`,
      variant: "destructive"
    })
  }

  const handleCompleteTask = (taskId) => {
    const taskToComplete = tasks.find(task => task.id === taskId)
    dispatch(completeTask(taskId))
    toast({
      title: "Task Completed",
      description: `Marked as complete: ${taskToComplete.title}`
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Priority</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterPriority('all')}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterPriority('high')}>High ⚠️</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterPriority('medium')}>Medium ⚡</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterPriority('low')}>Low 📌</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="flex gap-2 mb-6 border-b">
        {[
          { id: 'upcoming', icon: CalendarClock, label: 'Upcoming' },
          { id: 'overdue', icon: AlertCircle, label: 'Overdue' },
          { id: 'completed', icon: CheckCircle2, label: 'Completed' }
        ].map(({ id, icon: Icon, label }) => (
          <Button
            key={id}
            variant={activeTab === id ? 'default' : 'ghost'}
            className={cn(
              "flex items-center gap-2 capitalize",
              activeTab === id && "border-b-2 border-primary"
            )}
            onClick={() => setActiveTab(id)}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No tasks found. {activeTab === 'upcoming' && 'Create a new task to get started!'}
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
              onUpdate={(task) => {
                setCurrentTask(task)
                setIsUpdateModalOpen(true)
              }}
            />
          ))
        )}
      </div>

      <TaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
        mode="create"
      />
      <TaskModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false)
          setCurrentTask(null)
        }}
        onSubmit={handleUpdateTask}
        initialData={currentTask}
        mode="update"
      />
      <Toaster />
    </div>
  )
}

export default TaskManager
