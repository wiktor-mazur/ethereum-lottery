import { Component, OnDestroy, OnInit } from '@angular/core';
import { Web3Service } from '../../services/web3.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LotteryService } from '../../services/lottery.service';
import { Lottery } from '../../models/lottery.model';
import { Winner } from '../../models/winner.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: string | null = null;
  balance: string | null = null;
  lottery: Lottery | null = null;
  winnersHistory: Winner[] | null = null;

  private accountSubscription?: Subscription;
  private playerJoinedSubscription?: Subscription;
  private playerWonSubscription?: Subscription;

  constructor(private web3: Web3Service, private router: Router, private lotteryService: LotteryService) { }

  ngOnInit(): void {
    this.accountSubscription = this.web3.account$.subscribe(async (account) => {
      if (account) {
        this.account = account;
        this.balance = await this.web3.eth.getBalance(account);
        this.balance = this.web3.utils.fromWei(this.balance, 'ether');
      } else {
        await this.router.navigate(['not-supported']);
      }
    });

    this.playerJoinedSubscription = this.lotteryService.playerJoined$.subscribe(() => {
      this.fetchLottery();
    });

    this.playerWonSubscription = this.lotteryService.playerWon$.subscribe(() => {
      this.fetchLottery();
      this.fetchWinnersHistory();
    });

    this.fetchLottery();
    this.fetchWinnersHistory();
  }

  private async fetchLottery(): Promise<void> {
    this.lottery = await this.lotteryService.getLotteryData();
  }

  private async fetchWinnersHistory(): Promise<void> {
    this.winnersHistory = await this.lotteryService.getLotteryWinners();
  }

  ngOnDestroy() {
    this.accountSubscription && this.accountSubscription.unsubscribe();
    this.playerJoinedSubscription && this.playerJoinedSubscription.unsubscribe();
    this.playerWonSubscription && this.playerWonSubscription.unsubscribe();
  }
}
