import {Component, OnInit} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from "@angular/cdk/drag-drop";
import {RouterLink} from "@angular/router";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {TaskCrudModalComponent} from "../task-crud-modal/task-crud-modal.component";
import {Task, Tasks} from "../interfaces/task-interfaces";
import {Store} from "@ngrx/store";
import {ExampleActions} from "../store/example.actions";
import {ExampleSelectors} from "../store/example.selectors";
import {TaskDeleteModalComponent} from "../task-delete-modal/task-delete-modal.component";
import {MatIcon} from "@angular/material/icon";
import {AddTaskColumnComponent} from "../add-task-column/add-task-column.component";

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    RouterLink,
    NgOptimizedImage,
    NgForOf,
    MatIcon
  ],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.css'
})
export class TaskTableComponent implements OnInit {

  statuses: Array<string> = [];
  tasks: Tasks = {};

  constructor(public dialog: MatDialog, private store$: Store) {
  }

  ngOnInit(): void {

    this.store$.select(ExampleSelectors.tasks).subscribe(value => {
      console.log(value)
      this.tasks = value
      this.statuses = Object.keys(this.tasks)
    })
    this.store$.dispatch(ExampleActions.getData())

    this.statuses = Object.keys(this.tasks)
  }

  drop(event: CdkDragDrop<Task[]>, status: string) {
    if (event.previousContainer === event.container) {
      const newTasks: Tasks = JSON.parse(JSON.stringify(this.tasks))
      const from = this.clamp(event.previousIndex, newTasks[status].length - 1);
      const to = this.clamp(event.currentIndex, newTasks[status].length - 1);
      if (from === to) {
        return;
      }
      const target = newTasks[status][from];
      const delta = to < from ? -1 : 1;
      for (let i = from; i !== to; i += delta) {
        newTasks[status][i] = newTasks[status][i + delta];
      }
      newTasks[status][to] = target;
      this.store$.dispatch(ExampleActions.addTask({tasks: newTasks}))
    } else {
      const newTasks: Tasks = JSON.parse(JSON.stringify(this.tasks))
      const from = this.clamp(event.previousIndex, newTasks[event.previousContainer.data[0].status].length - 1);
      const to = this.clamp(event.currentIndex, newTasks[status].length);
      newTasks[status].splice(to, 0, newTasks[event.previousContainer.data[0].status].splice(from, 1)[0]);
      newTasks[status].forEach(value => {
        value.status = status;
      })
      this.store$.dispatch(ExampleActions.addTask({tasks: newTasks}))

    }

    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask(column: string) {
    this.dialog.open(TaskCrudModalComponent, {
      maxWidth: '450px',
      data: {
        method: 'Новая задача',
        status: column,
        statuses: this.statuses
      },
      autoFocus: false,
    }).afterClosed().subscribe(refactoredTAsk => {
      if (refactoredTAsk !== undefined) {
        const newTasks: Tasks = JSON.parse(JSON.stringify(this.tasks))
        newTasks[refactoredTAsk.status].push(refactoredTAsk)
        this.store$.dispatch(ExampleActions.addTask({tasks: newTasks}))
        localStorage.setItem("tasks", JSON.stringify(this.tasks));

      }

    })
  }

  deleteTask(task: Task) {
    console.log(this.tasks)
    this.dialog.open(TaskDeleteModalComponent, {
      maxWidth: '400px',
      data: task.name,
      autoFocus: false,
    }).afterClosed().subscribe(isDelete => {
      if (isDelete) {
        const newTasks: Tasks = JSON.parse(JSON.stringify(this.tasks))
        newTasks[task.status] = newTasks[task.status].filter(allTask => task.id.indexOf(allTask.id) === -1)
        this.store$.dispatch(ExampleActions.addTask({tasks: newTasks}))
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      }
    })
  }

  refactorTask(item: Task) {
    this.dialog.open(TaskCrudModalComponent, {
      maxWidth: '450px',
      data: {
        method: 'Редактирование',
        status: item.status,
        item: item,
        statuses: this.statuses
      },
      autoFocus: false,
    }).afterClosed().subscribe(refactoredTAsk => {
      if (refactoredTAsk !== undefined) {
        const newTasks: Tasks = JSON.parse(JSON.stringify(this.tasks))

        const itemId = newTasks[item.status].findIndex(task => item.id === task.id)

        if (itemId !== -1) {
          if (item.status !== refactoredTAsk) {

            newTasks[item.status].splice(itemId, 1)
            newTasks[refactoredTAsk.status].push(refactoredTAsk)
          } else {
            newTasks[refactoredTAsk.status][itemId] = refactoredTAsk
          }
          this.store$.dispatch(ExampleActions.addTask({tasks: newTasks}))
          localStorage.setItem("tasks", JSON.stringify(this.tasks));
        }


      }

    })
  }

  addColumn() {
    this.dialog.open(AddTaskColumnComponent, {
      maxWidth: '450px',
      data: {
        method: 'Новая колонка'
      },
      autoFocus: false,
    }).afterClosed().subscribe(refactoredTAsk => {
      if (refactoredTAsk !== undefined) {
        const newTasks: Tasks = JSON.parse(JSON.stringify(this.tasks))
        newTasks[refactoredTAsk] = []
        this.store$.dispatch(ExampleActions.addTask({tasks: newTasks}))
        localStorage.setItem("tasks", JSON.stringify(this.tasks));

      }

    })
  }

  deleteColumn(status: string) {
    this.dialog.open(TaskDeleteModalComponent, {
      maxWidth: '400px',
      data: status,
      autoFocus: false,
    }).afterClosed().subscribe(isDelete => {
      if (isDelete) {
        const newTasks: Tasks = JSON.parse(JSON.stringify(this.tasks))
        delete newTasks[status]
        this.store$.dispatch(ExampleActions.addTask({tasks: newTasks}))
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      }
    })
  }

  clamp(value: any, max: any) {
    return Math.max(0, Math.min(max, value));
  }
}
