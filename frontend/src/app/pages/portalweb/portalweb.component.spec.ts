import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalwebComponent } from './portalweb.component';

describe('PortalwebComponent', () => {
  let component: PortalwebComponent;
  let fixture: ComponentFixture<PortalwebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortalwebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortalwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
