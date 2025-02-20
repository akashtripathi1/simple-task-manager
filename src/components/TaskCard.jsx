import React from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
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
              <Badge variant={task.completed ? "secondary" : isOverdue ? "destructive" : "default"}>
                {task.completed ? "Completed" : isOverdue ? "Overdue" : format(dueDate, "PPP")}
              </Badge>
              <Badge variant={
                task.priority === "high" ? "destructive" :
                task.priority === "medium" ? "default" :
                "secondary"
              }>
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
