import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskColumnComponent } from './add-task-column.component';

describe('AddTaskColumnComponent', () => {
  let component: AddTaskColumnComponent;
  let fixture: ComponentFixture<AddTaskColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskColumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTaskColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
