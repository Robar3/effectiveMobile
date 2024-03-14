import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCrudModalComponent } from './task-crud-modal.component';

describe('TaskCrudModalComponent', () => {
  let component: TaskCrudModalComponent;
  let fixture: ComponentFixture<TaskCrudModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCrudModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCrudModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
