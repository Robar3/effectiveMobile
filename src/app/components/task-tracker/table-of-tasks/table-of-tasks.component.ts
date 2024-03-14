import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatSort, MatSortModule} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {Task, Tasks} from "../interfaces/task-interfaces";
import {MatDialog} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {RouterLink} from "@angular/router";
import {DataPipe} from "../pipes/data.pipe";

@Component({
  selector: 'app-table-of-tasks',
  standalone: true,
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatFormField,
    MatInput,
    MatTable,
    MatHeaderCellDef,
    MatCheckbox,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatSort,
    MatLabel,
    MatSortModule,
    RouterLink,
    DataPipe
  ],
  templateUrl: './table-of-tasks.component.html',
  styleUrl: './table-of-tasks.component.css'
})
export class TableOfTasksComponent {
  displayedColumns = [ "header","name", "deadline", "priority", "status","contractors"];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef, private _liveAnnouncer: LiveAnnouncer) {
    const storage = localStorage.getItem('tasks');
    if (storage !== null) {
      const date: Tasks = JSON.parse(storage)
      let allColumnData:Task[] = []
      for (let key in date) {
        if (date.hasOwnProperty(key)) {
          allColumnData = allColumnData.concat(date[key])
        }
      }
      this.dataSource.data = allColumnData
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


}
