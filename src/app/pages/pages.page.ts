import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global/global.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {
  canCreate = false;
  constructor(private globalSerive: GlobalService, private router: Router) {}

  async ngOnInit() {
    const id = this.globalSerive.getID();
    if ((await id) == 'admin') {
      this.canCreate = true;
    }
  }

  logOut() {
    localStorage.removeItem('id');
    this.router.navigateByUrl('login');
  }
}
