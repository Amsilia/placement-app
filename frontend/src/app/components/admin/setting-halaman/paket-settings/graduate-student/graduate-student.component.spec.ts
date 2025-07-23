import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateStudentComponent } from './graduate-student.component';

describe('GraduateStudentComponent', () => {
  let component: GraduateStudentComponent;
  let fixture: ComponentFixture<GraduateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraduateStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraduateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
