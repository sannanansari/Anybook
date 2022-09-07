import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/global/global.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGraud implements CanLoad {
  constructor(private gloablService: GlobalService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<any | UrlTree> {
    return true;
    // this.gloablService.getID().then(data => {
    //   console.log("Auth Guard Enter",data);
    //   if(data) {
    //     return true
    //   }
    //        else     {
    //     this.router.navigateByUrl("login")
    //     return false;
    //   }
    // }).catch(e => {
    //   this.router.navigateByUrl("login")
    //   return false;
    // })
  }
}
