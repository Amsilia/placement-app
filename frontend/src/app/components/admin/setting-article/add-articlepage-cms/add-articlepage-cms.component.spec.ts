import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticlepageCmsComponent } from './add-articlepage-cms.component';

describe('AddArticlepageCmsComponent', () => {
  let component: AddArticlepageCmsComponent;
  let fixture: ComponentFixture<AddArticlepageCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddArticlepageCmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArticlepageCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
