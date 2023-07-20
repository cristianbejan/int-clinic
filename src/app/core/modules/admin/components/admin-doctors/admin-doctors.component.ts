import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { Doctor } from 'src/app/core/interfaces/doctor.interface';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-doctors',
  templateUrl: './admin-doctors.component.html',
  styleUrls: ['./admin-doctors.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminDoctorsComponent implements OnInit, AfterViewInit {
  doctors: Doctor[] = [];

  columnsToDisplay = ['lastName', 'firstName', 'phone', 'email', 'specialtyIds'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Doctor;

  dataSource = new MatTableDataSource<Doctor>(this.doctors);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private doctorService: DoctorService) {}
  ngOnInit(): void {
    this.getDoctors();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getDoctors() {
    return this.doctorService
      .getDoctors()
      .pipe(
        tap(data => (this.doctors = data as Doctor[])),
        tap(console.log)
      )
      .subscribe();
  }

  onDelete(id: string) {
    if (window.confirm('Esti sigur?')) {
      this.doctorService.deleteDoctor(id);
    }
  }
}
