import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationArticleComponent } from './pagination-article.component';

describe('PaginationArticleComponent', () => {
  let component: PaginationArticleComponent;
  let fixture: ComponentFixture<PaginationArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
