import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddbetPageRoutingModule } from './addbet-routing.module';

import { AddbetPage } from './addbet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddbetPageRoutingModule
  ],
  declarations: [AddbetPage]
})
export class AddbetPageModule {}
