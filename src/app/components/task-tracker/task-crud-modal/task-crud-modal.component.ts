import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {ExampleActions} from "../store/example.actions";
import addTask = ExampleActions.addTask;
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-task-crud-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgIf,
    MatLabel,
    MatError,
    NgForOf,
    MatSelect,
    MatOption,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatHint,
    MatDatepickerModule,
    MatFormFieldModule, MatInputModule
  ],
  templateUrl: './task-crud-modal.component.html',
  styleUrl: './task-crud-modal.component.css'
})
export class TaskCrudModalComponent implements OnInit {
  taskForm: FormGroup;
  statuses: Array<string>;

  constructor(public dialogRef: MatDialogRef<TaskCrudModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder, private taskService: TaskService) {
    this.statuses = data.statuses;
    if (data.method === 'Новая задача') {
      this.taskForm = this.fb.group({
        header: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        deadline: new FormControl('', [Validators.required]),
        priority: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
        contractors: new FormArray([], [Validators.required]),
      })
      this.addContractors();
    } else {
      this.taskForm = this.fb.group({
        header: new FormControl({value: data.item.header, disabled: true}, [Validators.required]),
        name: new FormControl({value: data.item.name, disabled: true}, [Validators.required]),
        deadline: new FormControl({value: data.item.deadline, disabled: true}, [Validators.required]),
        priority: new FormControl({value: data.item.priority, disabled: true}, [Validators.required]),
        status: new FormControl(data.item.status, [Validators.required]),
        contractors: new FormArray([], [Validators.required]),
      })
      for (let i = 0; i < data.item.contractors.length; i++) {
        this.addContractors(data.item.contractors[i]);

      }
    }
  }

  ngOnInit(): void {

  }

  public get f() {
    return this.taskForm.controls;
  }

  save() {
    const contractorsFormValue = this.taskForm.get("contractors")?.value
    let contractors: string[] = []
    for (let i = 0; i < contractorsFormValue.length; i++) {
      contractors.push(contractorsFormValue[i].user)
    }
    if (this.data.method === "Новая задача") {
      this.dialogRef.close({
        ...this.taskForm.getRawValue(),
        contractors,
        id: (this.taskService.getRandomId()).toString()
      })
    } else if (this.data.method === "Редактирование") {
      this.dialogRef.close({...this.taskForm.getRawValue(), contractors, id: this.data.item.id})
    }
  }

  cancel() {
    this.dialogRef.close(undefined)
  }

  addContractors(value?: any, i?: number) {
    let contractors = this.taskForm.get('contractors') as FormArray
    let inputData = new FormGroup({
      user: new FormControl(value === undefined ? '' : value, Validators.required),
    })
    contractors.push(inputData)
  }

  deleteContractors(index: number) {
    (this.taskForm.get('contractors') as FormArray).removeAt(index)
  }

  get formTasks() {
    return (this.taskForm.get('contractors') as FormArray).controls
  }


}
