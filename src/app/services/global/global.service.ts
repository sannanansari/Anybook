import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  isLoading = false;
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  setLoader() {
    this.isLoading = !this.isLoading;
  }

  showLoader(msg?, spinner?) {
    if (!this.isLoading) this.setLoader();
    return this.loadingCtrl
      .create({
        message: msg,
        spinner: spinner ? spinner : 'bubbles',
      })
      .then((res) => {
        res.present().then(() => {
          if (!this.isLoading) {
            res.dismiss().then(() => {
              console.log('Abort');
            });
          }
        });
      })
      .catch((e) => {
        console.log('error', e);
      });
  }

  hideLoader() {
    // this.isLoading = false;
    if (this.isLoading) this.setLoader();
    return this.loadingCtrl
      .dismiss()
      .then(() => console.log('dismissed'))
      .catch((e) => console.log('error hide loader: ', e));
  }

  async showAlert(msg?) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: msg ? msg : 'Sorry Unexpected Error!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async hideAlert(alert) {
    await alert.dismiss();
  }

  async showModal(options) {
    const modal = await this.modalCtrl.create(options);
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data) return data;
  }

  modalDismiss(val?) {
    let data: any = val ? val : null;
    console.log('data ', data);
    this.modalCtrl.dismiss(data);
  }
}
