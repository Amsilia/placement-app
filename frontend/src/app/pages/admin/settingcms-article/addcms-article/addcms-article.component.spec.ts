import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcmsArticleComponent } from './addcms-article.component';

describe('AddcmsArticleComponent', () => {
  let component: AddcmsArticleComponent;
  let fixture: ComponentFixture<AddcmsArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcmsArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcmsArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
