import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcmsTestimonialComponent } from './editcms-testimonial.component';

describe('EditcmsTestimonialComponent', () => {
  let component: EditcmsTestimonialComponent;
  let fixture: ComponentFixture<EditcmsTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcmsTestimonialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcmsTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
