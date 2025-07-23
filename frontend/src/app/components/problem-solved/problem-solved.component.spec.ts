import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemSolvedComponent } from './problem-solved.component';

describe('ProblemSolvedComponent', () => {
  let component: ProblemSolvedComponent;
  let fixture: ComponentFixture<ProblemSolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemSolvedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProblemSolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
