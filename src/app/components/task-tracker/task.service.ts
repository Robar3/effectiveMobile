import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
  getTasks(){
    const storage = localStorage.getItem('tasks');
    if (storage !== null) {

      return new Observable((sub) => {
        sub.next(JSON.parse(storage));

      });
    }else {
      return new Observable((sub) => {
        sub.next(null);

      });
    }
  }
  setTasks(tasks:any){

    localStorage.setItem("tasks", JSON.stringify(tasks));
    return new Observable((sub) => {
      sub.next(true);

    });

  }

  getRandomId() {
    return Math.floor((Math.random()*99)+1);
  }
}
