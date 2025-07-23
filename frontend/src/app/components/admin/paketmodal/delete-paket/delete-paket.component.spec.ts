import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePaketComponent } from './delete-paket.component';

describe('DeletePaketComponent', () => {
  let component: DeletePaketComponent;
  let fixture: ComponentFixture<DeletePaketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePaketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePaketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
