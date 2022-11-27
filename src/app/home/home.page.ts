import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private timerService: TimerService,
    private navController: NavController,
  ) {}

  startTimer() {
    this.timerService.startTimer(25);
  }
}
