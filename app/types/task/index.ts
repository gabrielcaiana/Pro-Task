export interface TaskItem {
  createdAt: Date;
  id: string;
  title: string;
  description: string;
  tag: string;
  completed?: boolean;
}
