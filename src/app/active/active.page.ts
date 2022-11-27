import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.page.html',
  styleUrls: ['./active.page.scss'],
})
export class ActivePage implements OnInit {

  constructor(
    private timerService: TimerService,
    private navController: NavController,
  ) { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    
  }

  stopTimer() {
    
  }
}
