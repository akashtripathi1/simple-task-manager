import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit2, Check, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

const TaskCard = ({ task, onComplete, onDelete, onUpdate }) => {
  const dueDate = new Date(task.dueDate)
  const isOverdue = !task.completed && dueDate < new Date()

  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <div className="flex gap-2 items-center">
              <Badge className={`px-2 py-1 rounded font-medium ${
                task.completed
                  ? "bg-blue-600 text-white"   // Completed tasks
                  : isOverdue
                  ? "bg-purple-600 text-white" // Overdue tasks
                  : "bg-teal-500 text-white"     // Upcoming tasks
              }`}>
                {task.completed ? "Completed" : isOverdue ? "Overdue" : format(dueDate, "PPP")}
              </Badge>
              <Badge
                className={`px-2 py-1 rounded font-medium ${
                  task.priority === "high"
                    ? "bg-red-500 text-white"
                    : task.priority === "medium"
                    ? "bg-yellow-400 text-black"
                    : "bg-green-500 text-white"
                }`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            {!task.completed && (
              <>
                <Button size="icon" variant="outline" onClick={() => onUpdate(task)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={() => onComplete(task.id)}>
                  <Check className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button size="icon" variant="destructive" onClick={() => onDelete(task.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskCard
