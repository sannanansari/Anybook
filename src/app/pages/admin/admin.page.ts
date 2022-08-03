import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AnimationController, Animation, GestureDetail } from '@ionic/angular';
import { Gesture, GestureController } from '@ionic/angular';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  // @ViewChild('square') sqaure;
  // @ViewChild('squareA', { static: true }) squareA: ElementRef;
  animation: AnimationItem;
  options: AnimationOptions = {
    path: '../../../assets/lottie/bookshelf.json',
  };
  constructor(
    private animationCtrl: AnimationController,
    private gestureCtrl: GestureController,
    private global: GlobalService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    // this.animation = this.animationCtrl
    //   .create()
    //   .addElement(this.squareA.nativeElement)
    //   .duration(1000)
    //   .iterations(Infinity)
    //   .fromTo('opacity', '1', '0.3');
  }

  // play() {
  //   this.animation.play();
  // }

  // pause() {
  //   this.animation.pause();
  // }

  // stop() {
  //   this.animation.stop();
  // }

  loader() {
    this.global.showLoader();
    setTimeout(() => {
      this.global.hideLoader();
    }, 3000);
  }

  created(animation: AnimationItem) {
    this.animation = animation;
  }

  play() {
    this.ngZone.runOutsideAngular(() => this.animation.play());
  }
}
