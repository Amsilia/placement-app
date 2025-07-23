import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledModalComponent } from './canceled-modal.component';

describe('CanceledModalComponent', () => {
  let component: CanceledModalComponent;
  let fixture: ComponentFixture<CanceledModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanceledModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanceledModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
