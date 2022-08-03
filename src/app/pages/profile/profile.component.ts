import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  name = '';
  email = '';
  number = '0000000';
  gender = 'M';
  profile: Object = {};
  constructor(private fetch: FetchService) {}

  ngOnInit() {
    var user;
    const profile = localStorage.getItem('id');
    if (profile == 'admin') user = 2;
    else user = 1;
    this.fetch.getProfile(user).subscribe((data: any) => {
      this.profile = data;
      console.log(data);
      this.name = this.profile['name'];
      this.gender = this.profile['gender'];
      this.number = this.profile['number'];
      this.email = this.profile['email'];
    });
  }

  saveIt(event: any) {
    this.profile['name'] = this.name;
    this.profile['gender'] = this.gender;
    this.profile['number'] = this.number;
    this.profile['email'] = this.email;
    console.log(this.profile);

    this.fetch.postProfile(this.profile).subscribe((data: any) => {
      console.log(data);
    });
  }
}
