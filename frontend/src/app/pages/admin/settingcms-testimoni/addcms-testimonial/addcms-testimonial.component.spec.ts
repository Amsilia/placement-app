import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcmsTestimonialComponent } from './addcms-testimonial.component';

describe('AddcmsTestimonialComponent', () => {
  let component: AddcmsTestimonialComponent;
  let fixture: ComponentFixture<AddcmsTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcmsTestimonialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcmsTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
