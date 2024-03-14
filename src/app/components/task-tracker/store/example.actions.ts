import {createAction, props} from "@ngrx/store";
import {Task, Tasks} from "../interfaces/task-interfaces";

export namespace  ExampleActions{
  export const addTask = createAction('ADD_TASK',props<{tasks:Tasks}>());

  export const getData = createAction("GET_DATA");
  export const setData = createAction("SET_DATA",props<{tasks:Tasks}>());
  export const setDataOk = createAction("SET_DATA_OK");
}
