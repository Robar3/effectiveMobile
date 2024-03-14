import { Routes } from '@angular/router';
import {TaskTableComponent} from "./components/task-tracker/task-table/task-table.component";
import {TableOfTasksComponent} from "./components/task-tracker/table-of-tasks/table-of-tasks.component";

export const routes: Routes = [
  { path: '', component: TaskTableComponent },
  { path: 'table', component: TableOfTasksComponent }
];
