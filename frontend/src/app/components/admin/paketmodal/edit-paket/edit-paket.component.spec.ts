import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaketComponent } from './edit-paket.component';

describe('EditPaketComponent', () => {
  let component: EditPaketComponent;
  let fixture: ComponentFixture<EditPaketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPaketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPaketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
