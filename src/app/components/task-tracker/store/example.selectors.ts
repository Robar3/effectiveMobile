import { createFeatureSelector, createSelector} from "@ngrx/store";
import {State} from "./example.reducer";

export  namespace ExampleSelectors{
  export const state = createFeatureSelector<State>("example");
  export const tasks = createSelector(state,(state)=>state.tasks);

}
