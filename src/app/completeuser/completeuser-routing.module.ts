import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteuserPage } from './completeuser.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteuserPageRoutingModule {}
