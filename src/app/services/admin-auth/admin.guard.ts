import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/global/global.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(private globalService: GlobalService,private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.globalService.getID().then(data => {
      console.log("Admin Auth Guard Enter",data);
      if(data == "admin") {
        return true
      }
           else     {
        this.router.navigateByUrl("login")
        return false;
      }
    }).catch(e => {
      this.router.navigateByUrl("login")
      return false;
    })
  }
  
}
