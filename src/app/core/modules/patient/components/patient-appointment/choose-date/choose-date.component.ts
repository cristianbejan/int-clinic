import { Component } from '@angular/core';

@Component({
  selector: 'app-choose-date',
  templateUrl: './choose-date.component.html',
  styleUrls: ['./choose-date.component.scss'],
})
export class ChooseDateComponent {
  doctor = {
    bookedSlots: [
      {
        date: 'Aug 11 2023',
        timeSlots: ['10 AM', '5 PM'],
      },
      {
        date: 'Aug 19 2023',
        timeSlots: ['9 AM', '2PM', '3 PM'],
      },
    ],
  };

  selected!: string;
  timeSlots: string[] = ['9 AM', '10 AM', '11 AM', '12 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'];

  test(event: any) {
    // this.selected = this.selected
    //   .toString()
    //   .slice(4)
    //   .substring(11, this.selected.length - 1);
    // const test = this.doctor.bookedSlots.find(slot => {
    //   return slot.date == this.selected;
    // });
    // if (test == undefined) {
    //   console.log('here');
    //   this.timeSlots = ['9 AM', '10 AM', '11 AM', '12 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'];
    // }
    // this.timeSlots = this.timeSlots.filter(res => {
    //   return !test?.timeSlots.includes(res);
    // });
    // console.log(test);
  }
}
