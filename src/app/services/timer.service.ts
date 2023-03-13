import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MiscellaneousService } from './miscellaneous.service';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TimerState } from '../models/timerState.model';


@Injectable({
  providedIn: 'root'
})
export class TimerService {

  updateInterval: any;
  addTimeCheckInterval: any;
  durationInSeconds: number = 0;
  momentStarted: any = 0;
  momentToEnd: any = 0;
  momentToEndOrigin: any = 0;
  momentDiff: any;

  timeLeft = new Subject<number>;
  timeLeftInSeconds: number = 0;
  timerStateSub = new BehaviorSubject<TimerState>(TimerState.STOPPED);

  totalTimeElapsed: any;
  totalTimeAddedInSeconds: number = 0;
  countChangesMade: number = 0;

  allowedToMakeChanges: boolean = true;

  minOriginDurationAllowedInSeconds = 20;
  maxAddedSeconds = 30;
  minAddedSeconds = 5;
  chanceOfChangePerSecond = 0.10;
  chanceOfDisablingChanges = 0.05;
  maxChanges: number = 8;

  // Preferences
  isShowingTime: boolean = true;
  

  constructor(
    private miscellaneousService: MiscellaneousService,
    private navController: NavController,
  ) {}

  // ---- Timer handling -----


  // Start
  async startTimer(momentToEnd: any) {
    this.countChangesMade = 0;
    this.totalTimeAddedInSeconds = 0;

    momentToEnd.add(1, 'seconds'); // prevent delay between start and display of time from giving false numbers

    return new Promise( async (resolve, reject) => {
      


      this.momentStarted = moment();
      this.momentToEndOrigin = momentToEnd;
      this.momentToEnd = this.momentToEndOrigin;
      var durationDiff: any = moment(moment(this.momentToEndOrigin).diff(this.momentStarted));
      this.durationInSeconds = Math.floor(moment.duration(durationDiff).asSeconds());
      
      if(this.durationInSeconds < this.minOriginDurationAllowedInSeconds) {
        await this.miscellaneousService.showToast("duration-too-short", { minOriginDurationAllowedInSeconds: this.minOriginDurationAllowedInSeconds });
        reject("Duration too short");
        return;
      }

      this.allowedToMakeChanges = true;
      
      this.timerStateSub.next(TimerState.RUNNING);
      
      // Start timer interval
      this.updateTimer();
      this.updateInterval = setInterval(() => {
        this.updateTimer();
      }, 1000);

      // Start check change interval
      var randomAddTimeCheckInterval = Math.floor(Math.random() * 10000) + 3000;
      console.log(randomAddTimeCheckInterval);
      this.addTimeCheckInterval = setInterval(() => {
        this.addTimeCheck();
      }, randomAddTimeCheckInterval);

      resolve(this.timeLeft);
    });
  }

  // Update timer
  updateTimer() {
    var currentTime = moment();
    this.momentDiff = moment(this.momentToEnd.diff(currentTime));
    this.timeLeftInSeconds = Math.floor(moment.duration(this.momentDiff).asSeconds());
    this.timeLeft.next(this.momentDiff.seconds());
    
    if(this.timeLeftInSeconds === 0) {
      this.finishTimer();
    }
  }

  // Stop timer
  async stopTimer() {
    this.timerStateSub.next(TimerState.STOPPED);
    clearInterval(this.updateInterval);
    clearInterval(this.addTimeCheckInterval);
    this.totalTimeElapsed = this.calculateTotalTimeElapsed();

    await this.miscellaneousService.showDoneModal(this.totalTimeElapsed);
    await this.navController.navigateBack(['home']);

    return this.totalTimeElapsed;
  }

  // Finish timer
  async finishTimer() {
    this.timerStateSub.next(TimerState.FINISHED);
    clearInterval(this.updateInterval);
    clearInterval(this.addTimeCheckInterval);
    this.totalTimeElapsed = this.calculateTotalTimeElapsed();
    
    await this.miscellaneousService.showDoneModal(this.totalTimeElapsed);
    await this.navController.navigateBack(['home']);

    return this.totalTimeElapsed;
  }

  // Get timer left
  getTimeLeft(): Subject<any> {
    return this.timeLeft;
  }




  // ----- Changes and calculations ------
  
  // Calculate time elapsed
  calculateTotalTimeElapsed() {
    var currentTime = moment();
    var diff = moment(moment(currentTime).diff(this.momentStarted));
    console.log(this.totalTimeAddedInSeconds, diff.format('mm:ss'));
    return diff;
  }


  // Randomly add time at random times
  addTimeCheck() {
    console.log("Check if time should be added...")
    if(this.allowedToMakeChanges) {
      // Check if timer should stop adding time
      var disableChanges: boolean = Math.random() <= this.chanceOfDisablingChanges;
      if(disableChanges) {
        console.log("Disabled changes to time.");
        this.allowedToMakeChanges = false;
      }

      // Check if changs made exceed max changes
      if(this.countChangesMade < this.maxChanges) {
        // Check if timer should add time
        var willChange: boolean = Math.random() <= this.chanceOfChangePerSecond;
        if(willChange) {
          console.log("Added time");
          this.addTime();
        }
      } else {
        console.log("Max changes reached.");
      }
    }
  }
  addTime() {
    var timeToAdd = Math.floor(Math.random() * (this.maxAddedSeconds - this.minAddedSeconds)) + this.minAddedSeconds;
    this.momentToEnd.add(timeToAdd, 'seconds');
    this.totalTimeAddedInSeconds += timeToAdd;
    this.countChangesMade += 1;
  }

}
