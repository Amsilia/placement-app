import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryNullComponent } from './history-null.component';

describe('HistoryNullComponent', () => {
  let component: HistoryNullComponent;
  let fixture: ComponentFixture<HistoryNullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryNullComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryNullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
