import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilestoAdminComponent } from './profilesto-admin.component';

describe('ProfilestoAdminComponent', () => {
  let component: ProfilestoAdminComponent;
  let fixture: ComponentFixture<ProfilestoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilestoAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilestoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
