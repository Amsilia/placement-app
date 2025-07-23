import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimoniSectionComponent } from './testimoni-section.component';

describe('TestimoniSectionComponent', () => {
  let component: TestimoniSectionComponent;
  let fixture: ComponentFixture<TestimoniSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimoniSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestimoniSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
