import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPacketComponent } from './data-packet.component';

describe('DataPacketComponent', () => {
  let component: DataPacketComponent;
  let fixture: ComponentFixture<DataPacketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataPacketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
