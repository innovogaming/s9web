import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditbetPageRoutingModule } from './editbet-routing.module';

import { EditbetPage } from './editbet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditbetPageRoutingModule
  ],
  declarations: [EditbetPage]
})
export class EditbetPageModule {}
