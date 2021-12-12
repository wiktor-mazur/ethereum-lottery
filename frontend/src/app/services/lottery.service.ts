import { Web3Service } from './web3.service';
import { Contract } from 'web3-eth-contract';
import LotteryAbi from '../abi/lottery.abi.json';
import { Injectable, NgZone } from '@angular/core';
import { Lottery } from '../models/lottery.model';
import { Winner } from '../models/winner.model';
import { Subject } from 'rxjs';

@Injectable()
export class LotteryService {
  private contractAddress = '0xaAfcF29940841cc037A80EC9036f96Ad722E8338'; // @TODO: Move to env
  private contract: Contract;

  public playerJoined$: Subject<unknown> = new Subject();
  public playerWon$: Subject<unknown> = new Subject();

  constructor(private web3: Web3Service, private ngZone: NgZone) {
    this.contract = new this.web3.eth.Contract(LotteryAbi as any, this.contractAddress);
    this.setupEvents();
  }

  private setupEvents(): void {
    this.contract.events.PlayerJoined((event: unknown) => {
      this.ngZone.run(() => this.playerJoined$.next(event));
    });

    this.contract.events.PlayerWon((event: unknown) => {
      this.ngZone.run(() => this.playerWon$.next(event));
    });
  }

  async getLotteryData(): Promise<Lottery> {
    const balanceInWei = await this.web3.eth.getBalance(this.contractAddress)

    return new Lottery({
      balance: Number(this.web3.utils.fromWei(balanceInWei, 'ether')),
      managerAddress: await this.contract.methods.manager().call(),
      players: await this.contract.methods.getPlayers().call(),
      maxPlayers: Number(await this.contract.methods.maxPlayers().call())
    });
  }

  async getLotteryWinners(): Promise<Winner[]> {
    const events = await this.contract.getPastEvents('PlayerWon', {
      fromBlock: 0,
      toBlock: 'latest'
    });

    return events.map(event => new Winner({
      address: event.returnValues['player'],
      blockNumber: event.returnValues['blockNumber'],
      prize: Number(this.web3.utils.fromWei(event.returnValues['prize'], 'ether')),
    }))
  }
}
