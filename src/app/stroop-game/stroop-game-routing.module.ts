import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StroopGamePage } from './stroop-game.page';

const routes: Routes = [
  {
    path: '',
    component: StroopGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StroopGamePageRoutingModule {}
