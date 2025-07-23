import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingUsersComponent } from './pricing-users.component';

describe('PricingUsersComponent', () => {
  let component: PricingUsersComponent;
  let fixture: ComponentFixture<PricingUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
