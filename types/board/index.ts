export interface ITask {
  createdAt: Date;
  id: string;
  title: string;
  description: string;
  tag: string;
}

export interface IColumn {
  id: string;
  theme: string;
  title: string;
  type: string;
  tasks: ITask[];
}

export interface IBoard {
  id?: string;
  title: string;
  columns: IColumn[];
}
