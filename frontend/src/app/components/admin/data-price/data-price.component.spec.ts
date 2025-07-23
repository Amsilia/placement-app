import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPriceComponent } from './data-price.component';

describe('DataPriceComponent', () => {
  let component: DataPriceComponent;
  let fixture: ComponentFixture<DataPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
