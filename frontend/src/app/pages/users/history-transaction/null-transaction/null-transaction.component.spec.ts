import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NullTransactionComponent } from './null-transaction.component';

describe('NullTransactionComponent', () => {
  let component: NullTransactionComponent;
  let fixture: ComponentFixture<NullTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NullTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NullTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
