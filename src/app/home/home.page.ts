import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('form') timeForm: any;

  constructor(
    private timerService: TimerService,
    private navController: NavController,
  ) {}


  startTimer() {
    var pickedMomentToEnd = moment().add({ minutes: this.timeForm.value.minutes, seconds: this.timeForm.value.seconds});

    this.timerService.startTimer(pickedMomentToEnd).then(() => {
      this.navController.navigateForward(['active']);
    });
  }

}
