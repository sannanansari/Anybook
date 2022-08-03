import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashPageRoutingModule } from './splash-routing.module';

import { SplashPage } from './splash.page';
import { LottieModule } from 'ngx-lottie';
import LottiePlayer from 'lottie-web';

export function playerFactory() {
  return LottiePlayer;
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottieModule.forRoot({ player: playerFactory }),
    SplashPageRoutingModule,
  ],
  declarations: [SplashPage],
})
export class SplashPageModule {}
