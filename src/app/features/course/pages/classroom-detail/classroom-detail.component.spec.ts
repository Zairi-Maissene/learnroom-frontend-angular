import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomDetailComponent } from './classroom-detail.component';

describe('ClassroomDetailComponent', () => {
  let component: ClassroomDetailComponent;
  let fixture: ComponentFixture<ClassroomDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomDetailComponent],
    });
    fixture = TestBed.createComponent(ClassroomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
