import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ISmokeComponent } from './features/i-smoke/i-smoke.component';
import { SmokesHistoryComponent } from './features/smokes-history/smokes-history.component';

const routes: Routes = [
  { path: '', component: ISmokeComponent },
  { path: 'history', component: SmokesHistoryComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
