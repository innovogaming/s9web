import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BetPageRoutingModule } from './bet-routing.module';

import { BetPage } from './bet.page';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BetPageRoutingModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  declarations: [BetPage]
})
export class BetPageModule {}
