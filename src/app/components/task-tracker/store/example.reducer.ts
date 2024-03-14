import {Action, createReducer, on} from "@ngrx/store";
import {ExampleActions} from "./example.actions";
import {Task, Tasks} from "../interfaces/task-interfaces";

export interface State{
  tasks:Tasks
}


const initialState:State= {
  tasks:{
    todo: [],
    done: []
  }
}
export const exampleReducer = createReducer(
  initialState,
  on(ExampleActions.addTask,(state,{tasks})=>({
    ...state,
    tasks:tasks
  }))
)

export function reducer(state:State,actions:Action){
  return exampleReducer(state,actions)
}
// export const initialState = 5;
//
// export const counterReducer = createReducer(
//   initialState,
//   on(increment, (state) => state + 1),
//   on(decrement, (state) => state - 1),
//   on(reset, (state) => 0)
// );
