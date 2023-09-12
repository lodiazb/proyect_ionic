import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PreguntaPageRoutingModule } from './pregunta-routing.module';

import { PreguntaPage } from './pregunta.page';
@NgModule({
  declarations: [
    PreguntaPage, 
  ],
  imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot(),
        PreguntaPageRoutingModule
      ],
// @NgModule({
//   declarations: [
    
//   ],
//   imports: [
//     CommonModule,
//     FormsModule,
//     IonicModule.forRoot(),
//     PreguntaPageRoutingModule
//   ],

})
export class PreguntaPageModule {}
