import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalRegisrantComponent } from './normal-regisrant.component';

describe('NormalRegisrantComponent', () => {
  let component: NormalRegisrantComponent;
  let fixture: ComponentFixture<NormalRegisrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalRegisrantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalRegisrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
