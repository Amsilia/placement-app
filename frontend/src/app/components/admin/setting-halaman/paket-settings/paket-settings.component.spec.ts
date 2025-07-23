import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaketSettingsComponent } from './paket-settings.component';

describe('PaketSettingsComponent', () => {
  let component: PaketSettingsComponent;
  let fixture: ComponentFixture<PaketSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaketSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaketSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
