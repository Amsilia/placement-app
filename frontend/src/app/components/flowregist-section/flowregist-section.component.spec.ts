import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowregistSectionComponent } from './flowregist-section.component';

describe('FlowregistSectionComponent', () => {
  let component: FlowregistSectionComponent;
  let fixture: ComponentFixture<FlowregistSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowregistSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlowregistSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
