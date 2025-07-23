import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticlepageCmsComponent } from './edit-articlepage-cms.component';

describe('EditArticlepageCmsComponent', () => {
  let component: EditArticlepageCmsComponent;
  let fixture: ComponentFixture<EditArticlepageCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditArticlepageCmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditArticlepageCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
