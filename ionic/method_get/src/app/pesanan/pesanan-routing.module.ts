import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesananPage } from './pesanan.page';

const routes: Routes = [
  {
    path: '',
    component: PesananPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesananPageRoutingModule {}
