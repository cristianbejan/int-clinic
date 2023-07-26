import { Component, OnInit, ViewChild } from '@angular/core';
import { Doctor } from 'src/app/core/interfaces/doctor.interface';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { tap } from 'rxjs';
import { ThemePalette } from '@angular/material/core';

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
export class AdminDoctorsComponent implements OnInit {
  doctors: Doctor[] = [];

  dataSource!: MatTableDataSource<Doctor>;
  columnsToDisplay = ['lastName', 'firstName', 'phone', 'email', 'specialtyIds'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Doctor;

  pageSize = 5;
  pageSizeOptions: number[] = [2, 3, 5, 7, 10, 15, 20, 30];
  sortField = 'lastName';
  sortDirection: 'asc' | 'desc' = 'asc';
  showFirstLastButtons = true;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  loading = true;
  color: ThemePalette = 'primary';
  diameter = 50;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.loading = true;
    return this.doctorService
      .getDoctors()
      .pipe(
        tap(data => {
          this.doctors = data as Doctor[];
          this.dataSource = new MatTableDataSource(this.doctors);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;
        })
      )
      .subscribe();
  }

  onDelete(id: string) {
    if (window.confirm('Esti sigur?')) {
      this.doctorService.deleteDoctor(id);
    }
  }

  onSortChange(sortEvent: Sort): void {
    this.sortField = sortEvent.active;
    this.sortDirection = sortEvent.direction as 'asc' | 'desc';
    this.paginator.firstPage();
    this.paginator.pageIndex = 0;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
