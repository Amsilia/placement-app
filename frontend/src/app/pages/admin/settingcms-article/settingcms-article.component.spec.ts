import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingcmsArticleComponent } from './settingcms-article.component';

describe('SettingcmsArticleComponent', () => {
  let component: SettingcmsArticleComponent;
  let fixture: ComponentFixture<SettingcmsArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingcmsArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingcmsArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
