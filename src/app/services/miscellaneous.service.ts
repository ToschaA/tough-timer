import { Injectable } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DonePage } from '../modals/done/done.page';

@Injectable({
  providedIn: 'root'
})
export class MiscellaneousService {

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
  ) { }

  showDoneModal(timeElapsed: any) {
    this.modalController.create({
      component: DonePage,
      componentProps: {
        timeElapsed: timeElapsed,
      }
    }).then(modalElement => {
      modalElement.present();
    });
  }


  showToast(code: string, additionalData?: any) {
    var color = "";
    var position: any;
    var message = "";

    // error: the duration is too short
    if(code === "duration-too-short") {
      message = "The duration has to be longer than " + additionalData.minOriginDurationAllowedInSeconds + " seconds";
    }


    this.toastController.create({
      color: color || "medium",
      position: position || "top",
      message: message,
      duration: 2000,
    }).then(toastElement => {
      toastElement.present();
    })
  }
}
