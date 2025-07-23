import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPacketDataComponent } from './all-packet-data.component';

describe('AllPacketDataComponent', () => {
  let component: AllPacketDataComponent;
  let fixture: ComponentFixture<AllPacketDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPacketDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPacketDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
