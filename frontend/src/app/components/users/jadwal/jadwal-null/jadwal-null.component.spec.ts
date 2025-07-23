import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JadwalNullComponent } from './jadwal-null.component';

describe('JadwalNullComponent', () => {
  let component: JadwalNullComponent;
  let fixture: ComponentFixture<JadwalNullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JadwalNullComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JadwalNullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
