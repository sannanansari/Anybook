import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global/global.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import firebase from 'firebase/compat/app';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordShow = true;
  passwordType = 'password';
  isLogin = false;
  CountryJson = [{ name: 'India', dial_code: '+91', code: 'IN' }];
  CountryCode!: any;
  OTPmessage: string =
    'An OTP is sent to your number. You should receive it in 15 s';
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  phoneNo!: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private globalService: GlobalService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const data = this.globalService.getID();
    if ((await data) == 'user') this.login();
    else if ((await data) == 'admin') this.loginAdmin();
    else this.router.navigateByUrl('login');
    // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    //   'recaptcha-container',
    //   {
    //     size: 'visible',
    //     callback: (response) => {},
    //     'expired-callback': () => {},
    //   }
    // );
    // console.log('recaptca ', this.recaptchaVerifier);
  }

  // async ionViewDidEnter() {
  //   console.log(this.recaptchaVerifier);

  //   this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  //     'recaptcha-container'
  //   );
  // }
  // ionViewDidLoad() {
  //   this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  //     'sign-in-button',
  //     {
  //       size: 'invisible',
  //       callback: (response) => {},
  //       'expired-callback': () => {},
  //     }
  //   );
  //   console.log('test ', this.recaptchaVerifier);
  // }
  countryCodeChange($event) {
    this.CountryCode = $event.detail.value;
  }

  onSubmit(form: NgForm) {
    this.isLogin = true;
    this.globalService.showLoader();
    this.authService
      .login(form.value.email, form.value.password)
      .then((data) => {
        console.log(data);

        this.globalService.hideLoader();
        if (data == 'user') this.login();
        else if (data == 'admin') this.loginAdmin();
        else this.globalService.showAlert('Error');
      });
    // console.log(this.phoneNo, this.CountryCode);
    // this.isLogin = true;
    // if (this.phoneNo && this.CountryCode) {
    //   this.authService
    //     .signInWithPhoneNumber(
    //       this.recaptchaVerifier,
    //       this.CountryCode + this.phoneNo
    //     )
    //     .then((success) => {
    //       this.OtpVerification();
    //     });
  }
  // this.globalService.showLoader();
  // this.authService
  //   .login(form.value.email, form.value.password)
  //   .then((data) => {
  //     console.log(data, typeof data);
  //     let token = 'Bearer ' + data['jwt-token'];
  //     localStorage.setItem('token', token);
  //     this.globalService.hideLoader();
  //     if (data['jwt-token']) this.loginAdmin();
  //     // if (data == 'user') this.login();
  //     // else if (data == 'admin') this.loginAdmin();
  //     // else this.globalService.showAlert('Error');
  //   });
  //   console.log("on Submit ",data);
  //   this.globalService.showLoader();
  //   if(data == "user") this.login()
  //   if(data == "admin") this.loginAdmin()
  //   else this.globalService.hideLoader()
  //   location.reload();
  // }).catch(e => {
  //   this.globalService.showAlert(e,'Error');

  // })
  // }

  // async OtpVerification() {
  //   const alert = await this.alertController.create({
  //     header: 'Enter OTP',
  //     backdropDismiss: false,
  //     inputs: [
  //       {
  //         name: 'otp',
  //         type: 'text',
  //         placeholder: 'Enter your otp',
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Enter',
  //         handler: (res) => {
  //           this.authService.enterVerificationCode(res.otp).then((userData) => {
  //             // this.showSuccess();
  //             this.router.navigate['/home'];
  //             console.log(userData);
  //           });
  //         },
  //       },
  //     ],
  //   });
  //   await alert.present();
  // }

  changeType() {
    if (this.passwordShow) {
      this.passwordType = 'text';
      this.passwordShow = false;
    } else {
      this.passwordType = 'password';
      this.passwordShow = true;
    }
  }

  login() {
    localStorage.setItem('id', 'user');
    this.router.navigateByUrl('pages/home');
    this.globalService.hideLoader();
  }

  loginAdmin() {
    localStorage.setItem('id', 'admin');
    this.router.navigateByUrl('pages/admin');
    this.globalService.hideLoader();
  }
}
