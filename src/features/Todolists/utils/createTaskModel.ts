import { DomainTask, UpdateTaskModel } from "@/features/Todolists/api/tasksApi.types.ts"

export const createTaskModel = (task: DomainTask, domainModel: Partial<UpdateTaskModel>): UpdateTaskModel => ({
  status: task.status,
  title: task.title,
  deadline: task.deadline,
  description: task.description,
  priority: task.priority,
  startDate: task.startDate,
  ...domainModel,
})
