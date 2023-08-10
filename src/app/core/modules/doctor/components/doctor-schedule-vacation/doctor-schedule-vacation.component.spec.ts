import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduleVacationComponent } from './doctor-schedule-vacation.component';

describe('DoctorScheduleVacationComponent', () => {
  let component: DoctorScheduleVacationComponent;
  let fixture: ComponentFixture<DoctorScheduleVacationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorScheduleVacationComponent]
    });
    fixture = TestBed.createComponent(DoctorScheduleVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
