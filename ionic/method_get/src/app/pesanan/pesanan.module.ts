import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesananPageRoutingModule } from './pesanan-routing.module';

import { PesananPage } from './pesanan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesananPageRoutingModule
  ],
  declarations: [PesananPage]
})
export class PesananPageModule {}
