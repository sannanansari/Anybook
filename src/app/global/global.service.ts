import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { actionSheetController } from '@ionic/core';
import { FetchService } from 'src/app/services/fetch.service';
import { book } from '../interface/book.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  isLoading = false;
  id: string = localStorage.getItem('id');
  uid = localStorage.getItem('uid');
  constructor(
    private fetch: FetchService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private route: Router
  ) {}

  async getID() {
    console.log('get ID ', localStorage.getItem('id'));
    this.id = localStorage.getItem('id');
    return await this.id;
  }

  async expand(event: any, id: number, title: string, data: book) {
    let buttonAdmin = [
      {
        text: 'Edit',
        icon: 'create-sharp',

        handler() {
          location.href = `/pages/create/${id}`;
        },
      },
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.showLoader('Deleting');
          this.fetch.deleteBooks(id).then(() => {
            this.hideLoader();
            this.route.navigateByUrl('/pages/home');
          });

          // location.reload();
        },
      },
    ];
    let buttonUser = [
      {
        text: 'Add to Favorite',
        icon: 'heart',
        handler: () => {
          this.addToFavorites(data);
        },
      },
    ];
    let button;
    if (this.id == 'admin') {
      button = buttonAdmin;
    } else {
      button = buttonUser;
    }
    const actionSheet = await actionSheetController.create({
      header: title,
      cssClass: 'my-custom-class',
      mode: 'ios',
      buttons: [
        ...button,
        { text: 'Cancel', icon: 'backspace-sharp', role: 'cancel' },
      ],
    });

    await actionSheet.present();
  }

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

  // showAlert(msg?, spinner?) {
  //   if (!this.isLoading) this.setLoader();
  //   return this.loadingCtrl
  //     .create({
  //       message: msg,
  //       spinner: spinner ? spinner : 'bubbles',
  //     })
  //     .then((res) => {
  //       res.present().then(() => {
  //         if (!this.isLoading) {
  //           res.dismiss().then(() => {
  //             console.log('Abort');
  //           });
  //         }
  //       });
  //     })
  //     .catch((e) => {
  //       console.log('error', e);
  //     });
  // }

  //page 1 --- > showAlert("This is alert 1")

  // page 2 ---> showAlert("This is alert 2")
  hideLoader() {
    // this.isLoading = false;
    if (this.isLoading) this.setLoader();
    return this.loadingCtrl
      .dismiss()
      .then(() => console.log('dismissed'))
      .catch((e) => console.log('error hide loader: ', e));
  }

  addToFavorites(data: book) {
    // this.fetch.getBookById(id).subscribe((data: any) => {
    console.log(data);

    this.fetch.postFavorites(data, this.uid).then((data: any) => {
      console.log('post', data);
      // location.reload();
    });
    // })
  }

  async createModal(options) {
    const modal = await this.modalCtrl.create(options);
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data) return data;
  }

  modalDismiss(val?) {
    let data: any = val ? val : null;
    console.log('data: ', data);
    this.modalCtrl.dismiss();
  }

  // async showAlert(msg?, error?) {
  //   const alert = await this.alertCtrl.create({
  //     header: error,
  //     message: msg ? msg : 'Sorry Unexpected Error!',
  //     buttons: ['OK'],
  //   });
  //   await alert.present();
  // }

  async hideAlert(alert) {
    await alert.dismiss();
  }

  showAlert(message: string, header?, buttonArray?, inputs?) {
    this.alertCtrl
      .create({
        header: header ? header : 'Authentication failed',
        message: message,
        inputs: inputs ? inputs : [],
        buttons: buttonArray ? buttonArray : ['Okay'],
      })
      .then((alertEl) => alertEl.present());
  }
}
