import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialRegisrantComponent } from './special-regisrant.component';

describe('SpecialRegisrantComponent', () => {
  let component: SpecialRegisrantComponent;
  let fixture: ComponentFixture<SpecialRegisrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialRegisrantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialRegisrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
