export interface ITodos {
  id: string;
  title: string;
  date: Date;
  description: string;
  status: Status;
}

export enum Status {
  done = 'done',
  inProgress = 'inProgress',
  ToDo = 'ToDo',
}
