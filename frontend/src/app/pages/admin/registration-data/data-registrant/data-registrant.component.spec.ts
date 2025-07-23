import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRegistrantComponent } from './data-registrant.component';

describe('DataRegistrantComponent', () => {
  let component: DataRegistrantComponent;
  let fixture: ComponentFixture<DataRegistrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataRegistrantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataRegistrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
