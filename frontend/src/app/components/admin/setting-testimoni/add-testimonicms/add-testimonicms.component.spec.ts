import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestimonicmsComponent } from './add-testimonicms.component';

describe('AddTestimonicmsComponent', () => {
  let component: AddTestimonicmsComponent;
  let fixture: ComponentFixture<AddTestimonicmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTestimonicmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestimonicmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
