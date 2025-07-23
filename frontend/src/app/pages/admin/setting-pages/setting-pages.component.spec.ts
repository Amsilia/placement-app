import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPagesComponent } from './setting-pages.component';

describe('SettingPagesComponent', () => {
  let component: SettingPagesComponent;
  let fixture: ComponentFixture<SettingPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
