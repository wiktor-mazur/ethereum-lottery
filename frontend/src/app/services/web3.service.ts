import { Injectable, NgZone } from '@angular/core';
import Web3 from 'web3';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Web3Service {
  account$ = new BehaviorSubject<string | null>(null);
  chain$ = new BehaviorSubject<number | null>(null);
  web3: Web3;

  constructor(private ngZone: NgZone) {
    if (window.ethereum || Web3.givenProvider) {
      this.web3 = new Web3(window.ethereum || Web3.givenProvider);
      this.bindEthereumEvents();
      this.web3.eth.net.getId().then(netId => this.chain$.next(netId));
    } else {
      // @TODO: Move to .env
      const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/e53cd30eea684138b8890b440e5fcdc7');
      this.web3 = new Web3(provider);
    }
  }

  private bindEthereumEvents() {
    window.ethereum?.on('accountsChanged', (accounts: string[]) => {
      this.ngZone.run(() => this.setCurrentAccount(accounts));
    });

    window.ethereum?.on('chainChanged', (networkId: number) => {
      this.ngZone.run(() => this.chain$.next(Number(networkId)));
    });
  }

  private setCurrentAccount(accounts: string[]): void {
    if (accounts && accounts.length) {
      this.account$.next(accounts[0]);
    } else {
      this.account$.next(null);
    }
  }

  async setupAccount(): Promise<boolean> {
    if (window.ethereum && window.ethereum.request) {
      const accounts = await window?.ethereum?.request({ method: 'eth_requestAccounts' });

      this.setCurrentAccount(accounts);

      if (this.account$.getValue()) {
        return true;
      }
    }

    return false;
  }

  get eth() {
    return this.web3.eth;
  }

  get utils() {
    return this.web3.utils;
  }
}
