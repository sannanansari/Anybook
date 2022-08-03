import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { LottieModule } from 'ngx-lottie';
import { playerFactory } from '../splash/splash.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottieModule.forRoot({ player: playerFactory }),
    AdminPageRoutingModule,
  ],
  declarations: [AdminPage],
})
export class AdminPageModule {}
