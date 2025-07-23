import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingcmsTestimoniComponent } from './settingcms-testimoni.component';

describe('SettingcmsTestimoniComponent', () => {
  let component: SettingcmsTestimoniComponent;
  let fixture: ComponentFixture<SettingcmsTestimoniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingcmsTestimoniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingcmsTestimoniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
