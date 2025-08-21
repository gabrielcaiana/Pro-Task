export interface TaskItem {
  createdAt: Date;
  updatedAt?: Date;
  id: string;
  title: string;
  description: string;
  tag: string;
  completed: boolean;
}
