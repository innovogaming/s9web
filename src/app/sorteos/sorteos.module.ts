import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SorteosPageRoutingModule } from './sorteos-routing.module';

import { SorteosPage } from './sorteos.page';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SorteosPageRoutingModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  declarations: [SorteosPage]
})
export class SorteosPageModule {}
