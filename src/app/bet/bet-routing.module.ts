import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BetPage } from './bet.page';

const routes: Routes = [
  {
    path: '',
    component: BetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BetPageRoutingModule {}
