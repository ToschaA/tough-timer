import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MiscellaneousService } from './miscellaneous.service';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class TimerService {

  updateInterval: any;
  duration: number = 0;
  momentStarted: any = 0;
  momentToEnd: any = 0;
  timeLeft: number = 0;

  minDurationAllowedInSeconds = 20;

  constructor(
    private miscellaneousService: MiscellaneousService,
    private navController: NavController,
  ) {}

  // Start
  async startTimer(duration: number) {
    if(duration < this.minDurationAllowedInSeconds) {
      await this.miscellaneousService.showToast("duration-too-short", { minDurationAllowedInSeconds: this.minDurationAllowedInSeconds });
      return;
    }
    this.duration = duration;

    this.momentStarted = moment();
    this.momentToEnd = this.momentStarted.add({minutes: 0, seconds: duration});

    this.updateInterval = setInterval(() => {
      this.updateTimer();
    }, 1000);

    this.navController.navigateForward(['active']);
  }

  // Update timer
  updateTimer() {
    var currentTime = moment();
    this.timeLeft = moment(this.momentToEnd.diff(currentTime)).seconds();
  }

}
