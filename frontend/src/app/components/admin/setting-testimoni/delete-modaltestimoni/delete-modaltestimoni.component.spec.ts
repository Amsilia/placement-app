import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModaltestimoniComponent } from './delete-modaltestimoni.component';

describe('DeleteModaltestimoniComponent', () => {
  let component: DeleteModaltestimoniComponent;
  let fixture: ComponentFixture<DeleteModaltestimoniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModaltestimoniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteModaltestimoniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
