import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSettingsComponent } from './hero-settings.component';

describe('HeroSettingsComponent', () => {
  let component: HeroSettingsComponent;
  let fixture: ComponentFixture<HeroSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
