import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalPriceComponent } from './normal-price.component';

describe('NormalPriceComponent', () => {
  let component: NormalPriceComponent;
  let fixture: ComponentFixture<NormalPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
