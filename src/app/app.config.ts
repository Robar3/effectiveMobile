import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as reducer from "./components/task-tracker/store/example.reducer"
import {ExampleEffects} from "./components/task-tracker/store/example.effects";
import {provideHttpClient} from "@angular/common/http";
import {provideNativeDateAdapter} from "@angular/material/core";
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideStore({example:reducer.exampleReducer}), provideEffects([ExampleEffects]),provideHttpClient(),
    provideNativeDateAdapter()]
};
