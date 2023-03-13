import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TimerState } from '../models/timerState.model';
import { TimerService } from '../services/timer.service';
import * as moment from 'moment';
import { MiscellaneousService } from '../services/miscellaneous.service';


@Component({
  selector: 'app-active',
  templateUrl: './active.page.html',
  styleUrls: ['./active.page.scss'],
})
export class ActivePage implements OnInit {

  timerState: TimerState = 0;
  timeLeft: number = 0;
  timeString: string = "";

  constructor(
    private timerService: TimerService,
    private miscellaneousService: MiscellaneousService,
  ) { }

  ionViewWillEnter() {
    this.timerService.timerStateSub.subscribe(async (state) => {
      this.timerState = state;

      if(this.timerState === TimerState.RUNNING) {
        this.timerService.getTimeLeft().subscribe(time => {
          this.timeLeft = time;
          this.timeString = this.timerService.momentDiff.format("mm:ss");
        });
      } 
    });
    
  }

  ngOnInit() {
    
  }

  stopTimer() {
    this.timerService.stopTimer();
  }


  showAsFinished() {
    
  }
}
