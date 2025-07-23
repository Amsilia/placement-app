import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtikelAllComponent } from './artikel-all.component';

describe('ArtikelAllComponent', () => {
  let component: ArtikelAllComponent;
  let fixture: ComponentFixture<ArtikelAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtikelAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtikelAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
