import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsCareerComponent } from './brands-career.component';

describe('BrandsCareerComponent', () => {
  let component: BrandsCareerComponent;
  let fixture: ComponentFixture<BrandsCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsCareerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
