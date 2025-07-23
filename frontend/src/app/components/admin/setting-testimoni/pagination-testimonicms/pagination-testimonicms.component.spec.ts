import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationTestimonicmsComponent } from './pagination-testimonicms.component';

describe('PaginationTestimonicmsComponent', () => {
  let component: PaginationTestimonicmsComponent;
  let fixture: ComponentFixture<PaginationTestimonicmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationTestimonicmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationTestimonicmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
