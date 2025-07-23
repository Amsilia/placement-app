import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchdataAdminComponent } from './batchdata-admin.component';

describe('BatchdataAdminComponent', () => {
  let component: BatchdataAdminComponent;
  let fixture: ComponentFixture<BatchdataAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchdataAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchdataAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
