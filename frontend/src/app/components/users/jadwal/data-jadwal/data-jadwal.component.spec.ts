import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataJadwalComponent } from './data-jadwal.component';

describe('DataJadwalComponent', () => {
  let component: DataJadwalComponent;
  let fixture: ComponentFixture<DataJadwalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataJadwalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataJadwalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
