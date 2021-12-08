import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { provider } from 'web3-core';

declare var window: {
  ethereum?: any;
}

type Web3Provider = provider & {
  enable?: () => Promise<unknown>;
}

@Injectable()
export class Web3Service {
  web3: Web3;

  constructor() {
    let provider = 'ethereum' in window ? window.ethereum : Web3.givenProvider;

    if (!provider) {
      // @TODO: Move to .env
      provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/e53cd30eea684138b8890b440e5fcdc7');
    }

    this.web3 = new Web3(provider);
  }

  get eth() {
    return this.web3.eth;
  }

  getProvider(): Web3Provider | null {
    const provider = this.web3.currentProvider;

    return provider && typeof provider === 'object' ? provider as Web3Provider : null;
  }

  async enable() {
    const provider = this.getProvider();

    if (provider && provider.enable) {
      await provider.enable();
    } else {
      throw new Error('No Web3 provider was found.');
    }
  }
}
