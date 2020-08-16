import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilPageRoutingModule } from './profil-routing.module';

import { ProfilPage } from './profil.page';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

@NgModule({
  imports: [
 
  CommonModule,
  CommonModule,
  FormsModule,
  IonicModule,
  ProfilPageRoutingModule,
  NgxIonicImageViewerModule
  ],
  declarations: [ProfilPage]
})
export class ProfilPageModule {}
