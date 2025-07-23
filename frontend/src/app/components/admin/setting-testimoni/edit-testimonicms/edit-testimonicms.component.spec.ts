import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestimonicmsComponent } from './edit-testimonicms.component';

describe('EditTestimonicmsComponent', () => {
  let component: EditTestimonicmsComponent;
  let fixture: ComponentFixture<EditTestimonicmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTestimonicmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTestimonicmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
