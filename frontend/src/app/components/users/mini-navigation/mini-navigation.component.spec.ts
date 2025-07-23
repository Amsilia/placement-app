import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniNavigationComponent } from './mini-navigation.component';

describe('MiniNavigationComponent', () => {
  let component: MiniNavigationComponent;
  let fixture: ComponentFixture<MiniNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
