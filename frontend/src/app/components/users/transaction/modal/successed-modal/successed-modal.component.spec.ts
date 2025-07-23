import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessedModalComponent } from './successed-modal.component';

describe('SuccessedModalComponent', () => {
  let component: SuccessedModalComponent;
  let fixture: ComponentFixture<SuccessedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessedModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
