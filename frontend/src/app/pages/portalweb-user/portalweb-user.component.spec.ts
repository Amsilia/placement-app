import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalwebUserComponent } from './portalweb-user.component';

describe('PortalwebUserComponent', () => {
  let component: PortalwebUserComponent;
  let fixture: ComponentFixture<PortalwebUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalwebUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortalwebUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
