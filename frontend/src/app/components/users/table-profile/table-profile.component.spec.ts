import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProfileComponent } from './table-profile.component';

describe('TableProfileComponent', () => {
  let component: TableProfileComponent;
  let fixture: ComponentFixture<TableProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
