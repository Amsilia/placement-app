import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaseSectionComponent } from './fase-section.component';

describe('FaseSectionComponent', () => {
  let component: FaseSectionComponent;
  let fixture: ComponentFixture<FaseSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaseSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaseSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
