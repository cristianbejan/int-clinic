import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDoctorsFormComponent } from './admin-doctors-form.component';

describe('AdminDoctorsFormComponent', () => {
  let component: AdminDoctorsFormComponent;
  let fixture: ComponentFixture<AdminDoctorsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDoctorsFormComponent]
    });
    fixture = TestBed.createComponent(AdminDoctorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
