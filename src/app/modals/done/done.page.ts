import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})
export class DonePage implements OnInit {

  @Input() timeElapsed: any;
  timeElapsedString: string = "";

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.timeElapsedString = moment(this.timeElapsed).format('mm:ss');
  }

  close() {
    this.modalController.dismiss();
  }

}
