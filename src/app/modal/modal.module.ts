import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPageRoutingModule } from './modal-routing.module';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { ModalPage } from './modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageRoutingModule,
    NgxIonicImageViewerModule
  ],
  declarations: [ModalPage]
})
export class ModalPageModule {}
