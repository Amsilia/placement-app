import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTransactionComponent } from './history-transaction.component';

describe('HistoryTransactionComponent', () => {
  let component: HistoryTransactionComponent;
  let fixture: ComponentFixture<HistoryTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
