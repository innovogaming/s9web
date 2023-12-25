import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditbetPage } from './editbet.page';

const routes: Routes = [
  {
    path: '',
    component: EditbetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditbetPageRoutingModule {}
