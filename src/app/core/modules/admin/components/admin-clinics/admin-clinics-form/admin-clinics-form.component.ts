import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { ClinicService } from 'src/app/core/services/clinic.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
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

  constructor(
    private clinicService: ClinicService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: ConfirmationDialogService,
    private formBuilder: FormBuilder,
    private imageUploadService: ImageUploadService
  ) {}

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
    address: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    imageUrl: new FormControl(''),
  });

  ngOnInit(): void {
    this.clinicId = this.route.snapshot.params['id'];
    this.autocompleteClinic(this.clinicId);
    console.log('On init', this.defaultFormValues);
  }

  onSubmit() {
    if (this.clinicId) {
      const isFormUnchanged = JSON.stringify(this.clinicForm.value) === JSON.stringify(this.defaultFormValues);

      if (isFormUnchanged) {
        const options = {
          title: 'Informatii nemodificate',
          message: `Doriti sa modificati informatiile acestei clinici ?`,
          cancelText: 'Nu',
          confirmText: 'Da',
        };
        this.dialogService.open(options);

        this.dialogService.confirmed().subscribe(confirmed => {
          if (confirmed) {
            return;
          }
          this.router.navigate(['admin/clinics']);
        });
      } else {
        this.clinicService.updateData(this.clinicId, this.clinicForm);
        this.clinicService.updateImage(this.clinicId, this.imageUrl);
        this.router.navigate(['admin/clinics']);
      }
    } else if (this.clinicForm.valid) {
      const formData = { ...this.clinicForm.value, imageUrl: this.imageUrl };

      const formDataGroup: FormGroup = this.formBuilder.group(formData);

      this.clinicService.addData(formDataGroup);
      this.clinicForm.reset();
      this.router.navigate(['admin/clinics']);
    }

    if (event) {
      this.uploadImage(event);
    }
  }

  autocompleteClinic(id: string) {
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

  confirmCancelDialog() {
    const options = {
      title: 'Inchidere Formular',
      message: `Esti sigur ca vrei sa inchizi formularul ?`,
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
      message: `Esti sigur ca vrei sa resetezi formularul ?`,
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
    });
  }
}
