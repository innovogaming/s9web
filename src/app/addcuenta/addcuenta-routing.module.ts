import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcuentaPage } from './addcuenta.page';

const routes: Routes = [
  {
    path: '',
    component: AddcuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcuentaPageRoutingModule {}
