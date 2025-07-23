import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteArticleComponent } from './modal-delete-article.component';

describe('ModalDeleteArticleComponent', () => {
  let component: ModalDeleteArticleComponent;
  let fixture: ComponentFixture<ModalDeleteArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
