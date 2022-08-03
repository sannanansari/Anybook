import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  passwordShow = true;
  passwordConfirmShow = true;
  passwordConfirmType = 'password';
  passwordType = 'password';
  passwordEqual = false;

  constructor(private authService: AuthService,private router:Router) { }

  ngOnInit() {
  }

  changeType() {
    if(this.passwordShow) {
      this.passwordType = 'text';
      this.passwordShow = false;
    } else {
      this.passwordType = 'password';
      this.passwordShow = true
    }
  }

  changeConfirmType(){
    if(this.passwordShow) {
      this.passwordConfirmType = 'text';
      this.passwordConfirmShow = false;
    } else {
      this.passwordConfirmType = 'password';
      this.passwordShow = true
    }}

  onSubmit(form: NgForm) {
    console.log(form);
    if(form.value.password == form.value.confirmPassword) {
      console.log("Equal");
      this.authService.register(form.value).then((data: any) => {
        // this.router.navigateByUrl("/login")
      })
    }
    else {
      console.log("Not Equal");
      this.passwordEqual = true;
    }
  }
}
