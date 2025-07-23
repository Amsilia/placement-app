import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaketNavigationComponent } from './paket-navigation.component';

describe('PaketNavigationComponent', () => {
  let component: PaketNavigationComponent;
  let fixture: ComponentFixture<PaketNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaketNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaketNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
