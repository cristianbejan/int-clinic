import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Doctor } from 'src/app/core/interfaces/doctor.interface';
import { ClinicService } from 'src/app/core/services/clinic.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { DoctorService } from 'src/app/core/services/doctor.service';
import { ImageUploadService } from 'src/app/core/services/image-upload.service';

enum FormSubmitState {
  ADD = 'Adauga Clinica',
  EDIT = 'Actualizeaza Clinica',
}
@Component({
  selector: 'app-admin-clinics-form',
  templateUrl: './admin-clinics-form.component.html',
  styleUrls: ['./admin-clinics-form.component.scss'],
})
export class AdminClinicsFormComponent implements OnInit {
  clinicId!: string;
  buttonText: string = FormSubmitState.ADD;
  defaultFormValues!: object;
  imageUrl!: string;
  doctors: Doctor[] = [];

  constructor(
    private clinicService: ClinicService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: ConfirmationDialogService,
    private imageUploadService: ImageUploadService,
    private doctorService: DoctorService
  ) {
    this.getDoctors();
  }

  clinicForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{3}( ?)[0-9]{3}( ?)[0-9]{4}$'),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    doctorIds: new FormControl([''], Validators.required),
    address: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    imageUrl: new FormControl(`${this.imageUrl}`),
  });

  ngOnInit(): void {
    this.clinicId = this.route.snapshot.params['id'];
    this.autocompleteClinic(this.clinicId);
  }

  onSubmit() {
    if (this.clinicId) {
      const options = {
        title: 'Salveaza Modificarile',
        message: `Doriti sa modificati informatiile acestei clinici ?`,
        cancelText: 'Nu',
        confirmText: 'Da',
      };
      this.dialogService.open(options);

      this.dialogService.confirmed().subscribe(confirmed => {
        if (!confirmed) {
          return;
        }
        this.clinicService.updateData(this.clinicId, this.clinicForm);
        this.clinicService.updateImage(this.clinicId, this.imageUrl);
        this.router.navigate(['admin/clinics']);
      });
    } else {
      this.clinicService.addData(this.clinicForm);
      this.clinicForm.reset();
      this.router.navigate(['admin/clinics']);
    }

    if (event) {
      this.uploadImage(event);
    }
  }

  autocompleteClinic(id: string) {
    if (id) {
      this.clinicService
        .getClinic(id)
        .pipe(
          tap(result => {
            this.buttonText = FormSubmitState.EDIT;
            const clinic = result['data']();
            this.imageUrl = clinic.imageUrl;

            this.clinicForm.patchValue({
              name: clinic.name,
              phone: clinic.phone,
              email: clinic.email,
              doctorIds: clinic.doctorIds,
              address: clinic.address,
              description: clinic.description,
              imageUrl: clinic.imageUrl,
            });

            this.defaultFormValues = JSON.parse(JSON.stringify(this.clinicForm.value));
            console.log('autocomplete', this.defaultFormValues);
          })
        )
        .subscribe();
    }
  }

  confirmCancelDialog() {
    const options = {
      title: 'Inchidere Formular',
      message: `Esti sigur ca vrei sa inchizi formularul?`,
      cancelText: 'Nu',
      confirmText: 'Da',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.router.navigate(['admin/clinics']);
      }
    });
  }

  confirmResetDialog() {
    const options = {
      title: 'Resetare Formular',
      message: `Esti sigur ca vrei sa resetezi formularul?`,
      cancelText: 'Nu',
      confirmText: 'Da',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        if (this.clinicId) {
          this.autocompleteClinic(this.clinicId);
        }
        this.clinicForm.reset();
      }
    });
  }

  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }

    this.imageUploadService.uploadImage(file, 'clinics').subscribe(downloadURL => {
      this.imageUrl = downloadURL;
      this.clinicForm.get('imageUrl')?.setValue(downloadURL);
    });
  }

  getDoctors() {
    return this.doctorService
      .getDoctors()
      .pipe(
        tap(data => {
          this.doctors = data as Doctor[];
          console.log('doctors', this.doctors);
        })
      )
      .subscribe();
  }
}
