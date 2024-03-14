import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-task-delete-modal',
  standalone: true,
  imports: [
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './task-delete-modal.component.html',
  styleUrl: './task-delete-modal.component.css'
})
export class TaskDeleteModalComponent {
  constructor(public dialogRef: MatDialogRef<TaskDeleteModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  delete() {
    this.dialogRef.close(true)
  }
}
