import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StroopGamePageRoutingModule } from './stroop-game-routing.module';

import { StroopGamePage } from './stroop-game.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StroopGamePageRoutingModule,
    SharedModule
  ],
  declarations: [StroopGamePage]
})
export class StroopGamePageModule {}
