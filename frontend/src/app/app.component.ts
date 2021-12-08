import { Component, OnDestroy, OnInit } from '@angular/core';
import { Web3Service } from './services/web3.service';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isWrongNetwork = false;
  supportedNetwork = environment.supportedNetwork;

  private chainSubscription?: Subscription;

  constructor(private web3: Web3Service) {}

  ngOnInit(): void {
    this.chainSubscription = this.web3.chain$.subscribe((network) => {
      console.log(network)
      this.isWrongNetwork = this.supportedNetwork.id !== network;
    });
  }

  ngOnDestroy() {
    this.chainSubscription && this.chainSubscription.unsubscribe();
  }
}
