import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  @ViewChild('image', { static: true }) image;
  @ViewChild('text', { static: true }) text;

  animationImage: Animation;
  animationText: Animation;
  animation: AnimationItem;
  options: AnimationOptions = {
    path: '../../../assets/lottie/books.json',
  };
  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private lottie: LottieSplashScreen,
    private ngZone: NgZone
  ) {
    // this.initializeApp();
  }

  ngOnInit() {
    // this.animationImage = this.animationCtrl
    //   .create()
    //   .addElement(this.image.nativeElement)
    //   .duration(2500)
    //   .fromTo('height', '0', '100')
    //   .fromTo('width', '0', '100');
    // this.animationImage.play();
    this.animationText = this.animationCtrl
      .create()
      .addElement(this.text.nativeElement)
      .duration(2000)
      .fromTo('color', 'white', 'darkblue')
      .fromTo('fontWeight', 'bold', 'bolder');
    this.animationText.play();
    setTimeout(() => {
      this.router.navigateByUrl('/pages/home');
    }, 3000);
    // let path = '../../../assests/lottie/book.json';
    // this.lottie.show(path, false, 1024, 768);
    // .then((res: any) => console.log(res))
    // .catch((error: any) => console.error(error));
  }

  initializeApp(animation: AnimationItem) {
    this.animation = animation;
  }

  play() {
    this.ngZone.runOutsideAngular(() => this.animation.play());
  }
}
