import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBatchDataComponent } from './all-batch-data.component';

describe('AllBatchDataComponent', () => {
  let component: AllBatchDataComponent;
  let fixture: ComponentFixture<AllBatchDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllBatchDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBatchDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
