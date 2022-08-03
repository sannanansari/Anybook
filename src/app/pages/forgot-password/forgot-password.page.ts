import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalService } from 'src/app/global/global.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private authService: AuthService,private globalService: GlobalService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form.value.email);
    this.authService.forgot(form.value.email)
    this.globalService.showAlert(`If We have following Email address ${form.value.email} then you will get the reset mail`,'Success')
  }

}
