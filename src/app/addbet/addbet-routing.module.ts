import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddbetPage } from './addbet.page';

const routes: Routes = [
  {
    path: '',
    component: AddbetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddbetPageRoutingModule {}
