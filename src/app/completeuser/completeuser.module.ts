import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteuserPageRoutingModule } from './completeuser-routing.module';

import { CompleteuserPage } from './completeuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteuserPageRoutingModule
  ],
  declarations: [CompleteuserPage]
})
export class CompleteuserPageModule {}
