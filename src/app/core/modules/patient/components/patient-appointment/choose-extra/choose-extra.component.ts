import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Appointment } from 'src/app/core/interfaces/appointment.interface';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-choose-extra',
  templateUrl: './choose-extra.component.html',
  styleUrls: ['./choose-extra.component.scss'],
})
export class ChooseExtraComponent {
  fileUrl = '';
  fileName = '';
  appointmentData!: Appointment;

  constructor(
    private fileUploadService: FileUploadService,
    private dataStoreService: DataStoreService,
    private matStepper: MatStepper
  ) {}

  ngOnInit(): void {
    this.getAppointment();
  }

  extraDetailsForm = new FormGroup({
    comment: new FormControl(''),
  });

  getAppointment() {
    this.dataStoreService.appointmentDetails.subscribe(data => {
      this.appointmentData = data;
    });
  }

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      return;
    }

    this.fileUploadService.uploadFile(file, 'extraFiles').subscribe(downloadURL => {
      this.fileUrl = downloadURL;
      this.fileName = file.name;
    });
  }

  ngAfterViewInit(): void {
    this.matStepper.selectionChange.subscribe(() => {
      const formValue = this.extraDetailsForm.value;
      const newData = {
        ...this.appointmentData,
        extraDetails: { comment: formValue.comment, file: { name: this.fileName, url: this.fileUrl } },
      };
      this.dataStoreService.addData(newData);
    });
  }
}
