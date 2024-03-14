export interface Task{
  id:string
  header: string;
  name: string;
  deadline: string;
  priority: string;
  status: string;
  contractors: string[];
}
export interface Tasks{
  [key: string]: Array<Task>|never
}
