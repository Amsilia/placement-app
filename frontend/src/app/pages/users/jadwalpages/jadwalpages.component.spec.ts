import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JadwalpagesComponent } from './jadwalpages.component';

describe('JadwalpagesComponent', () => {
  let component: JadwalpagesComponent;
  let fixture: ComponentFixture<JadwalpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JadwalpagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JadwalpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
