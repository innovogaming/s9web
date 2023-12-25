import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcuentaPageRoutingModule } from './addcuenta-routing.module';

import { AddcuentaPage } from './addcuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcuentaPageRoutingModule
  ],
  declarations: [AddcuentaPage]
})
export class AddcuentaPageModule {}
