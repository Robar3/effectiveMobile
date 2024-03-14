import {Component, Inject} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-add-task-column',
  standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './add-task-column.component.html',
  styleUrl: './add-task-column.component.css'
})
export class AddTaskColumnComponent {
  taskForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddTaskColumnComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,) {
      this.taskForm = this.fb.group({
        header: new FormControl('', [Validators.required]),
      })
  }

  save() {
    this.dialogRef.close(this.taskForm.get('header')?.value)
  }

  cancel() {
    this.dialogRef.close(undefined)
  }


}
