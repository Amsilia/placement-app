import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcmsArticleComponent } from './editcms-article.component';

describe('EditcmsArticleComponent', () => {
  let component: EditcmsArticleComponent;
  let fixture: ComponentFixture<EditcmsArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcmsArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcmsArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
