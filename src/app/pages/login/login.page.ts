import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global/global.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordShow = true;
  passwordType = 'password';
  isLogin = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private globalService: GlobalService
  ) {}

  async ngOnInit() {
    const data = this.globalService.getID();
    if ((await data) == 'user') this.login();
    else if ((await data) == 'admin') this.loginAdmin();
    else this.router.navigateByUrl('login');
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.isLogin = true;
    this.globalService.showLoader();
    this.authService
      .login(form.value.email, form.value.password)
      .subscribe((data) => {
        console.log(data);

        this.globalService.hideLoader();
        if (data == 'user') this.login();
        else if (data == 'admin') this.loginAdmin();
        else this.globalService.showAlert('Error');
      });
    //   console.log("on Submit ",data);
    //   this.globalService.showLoader();
    //   if(data == "user") this.login()
    //   if(data == "admin") this.loginAdmin()
    //   else this.globalService.hideLoader()
    //   location.reload();
    // }).catch(e => {
    //   this.globalService.showAlert(e,'Error');

    // })
  }

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
    location.reload();
    this.globalService.hideLoader();
  }

  loginAdmin() {
    localStorage.setItem('id', 'admin');
    this.router.navigateByUrl('pages/admin');
    this.globalService.hideLoader();
  }
}
