import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { NotSupportedComponent } from './views/not-supported/not-supported.component';
import { Web3Service } from './services/web3.service';
import { Web3AuthenticatedGuard } from './guards/web3-authenticated.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotSupportedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    Web3AuthenticatedGuard,
    Web3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
