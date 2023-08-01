import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.scss'],
})
export class PatientAppointmentComponent {
  constructor(private _formBuilder: FormBuilder) {}
  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });
}
