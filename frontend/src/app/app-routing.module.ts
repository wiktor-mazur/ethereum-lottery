import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NotSupportedComponent } from './views/not-supported/not-supported.component';
import { Web3AuthenticatedGuard } from './guards/web3-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [Web3AuthenticatedGuard]
  },
  {
    path: 'not-supported',
    component: NotSupportedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
