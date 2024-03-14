import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfTasksComponent } from './table-of-tasks.component';

describe('TableOfTasksComponent', () => {
  let component: TableOfTasksComponent;
  let fixture: ComponentFixture<TableOfTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOfTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableOfTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
