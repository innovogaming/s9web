import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidarPage } from './validar.page';

const routes: Routes = [
  {
    path: '',
    component: ValidarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidarPageRoutingModule {}
