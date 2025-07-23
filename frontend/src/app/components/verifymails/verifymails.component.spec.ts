import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifymailsComponent } from './verifymails.component';

describe('VerifymailsComponent', () => {
  let component: VerifymailsComponent;
  let fixture: ComponentFixture<VerifymailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifymailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifymailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
