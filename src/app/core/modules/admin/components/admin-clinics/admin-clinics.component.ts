import { Component, Output, ViewChild, OnInit } from '@angular/core';
import { ClinicService } from 'src/app/core/services/clinic.service';
import { Clinic } from 'src/app/core/interfaces/clinic.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { MatSort } from '@angular/material/sort';
import { Doctor } from 'src/app/core/interfaces/doctor.interface';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-admin-clinics',
  templateUrl: './admin-clinics.component.html',
  styleUrls: ['./admin-clinics.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminClinicsComponent implements OnInit {
  clinics!: Clinic[];
  doctors: Doctor[] = [];

  columnsToDisplay = ['name', 'phone', 'email', 'address'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Clinic;
  sortField = 'lastName';
  sortDirection: 'asc' | 'desc' = 'asc';
  showFirstLastButtons = true;

  @Output() dataSource!: MatTableDataSource<Clinic>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clinicService: ClinicService,
    private dialogService: ConfirmationDialogService,
    private doctorService: DoctorService
  ) {
    this.getDoctors();
  }

  ngOnInit(): void {
    this.getClinics();
  }

  getClinics() {
    this.clinicService.getClinics().subscribe(clinics => {
      this.clinics = clinics;
      this.dataSource = new MatTableDataSource(clinics);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  confirmDeleteDialog(id: string, name: string) {
    const options = {
      title: 'Stergere Clinica',
      message: `Esti sigur ca vrei sa stergi clinica ${name}?`,
      cancelText: 'Nu',
      confirmText: 'Da',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        if (id) {
          this.clinicService.deleteData(id);
        }
      }
    });
  }

  getDoctors() {
    return this.doctorService
      .getDoctors()
      .pipe(
        tap(data => {
          this.doctors = data as Doctor[];
        })
      )
      .subscribe();
  }

  getDoctorNames(doctorIds: string[] | undefined): string {
    if (!doctorIds || doctorIds.length === 0) {
      return '';
    }

    const doctorNames = doctorIds.map(doctorId => {
      const doctor = this.doctors.find(doctor => doctor.id === doctorId);
      return doctor ? doctor.firstName + ' ' + doctor.lastName : '';
    });

    return doctorNames.join(', ');
  }
}
