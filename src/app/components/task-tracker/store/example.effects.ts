import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, exhaustMap, map, mergeMap} from "rxjs";
import {ExampleActions} from "./example.actions";
import {TaskService} from "../task.service";
import {Tasks} from "../interfaces/task-interfaces";


@Injectable()
export class ExampleEffects{
  constructor(
    private actions$: Actions,
    private taskService:TaskService
  ) {}

  loadMovies$ = createEffect(() => this.actions$.pipe(
      ofType(ExampleActions.getData),
      exhaustMap(() => this.taskService.getTasks()
        .pipe(
          map(tasks=>{
            let request={};
            if (tasks!==null&&tasks!==undefined){
              request=tasks
            }else {
              request = {
                todo: [],
                done: []
              }
            }
            this.taskService.setTasks(request)
            return ExampleActions.addTask({tasks:request})},
          catchError(() => EMPTY)
        ))
    )
  ))
  setData = createEffect(() => this.actions$.pipe(
      ofType(ExampleActions.setData),
      exhaustMap((tasks) => this.taskService.setTasks(tasks)
        .pipe(
          map(tasks=>{
            return ExampleActions.setDataOk()},
          catchError(() => EMPTY)
        ))
    )
  ))


}
