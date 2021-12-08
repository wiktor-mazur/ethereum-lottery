import { Component, OnDestroy, OnInit } from '@angular/core';
import { Web3Service } from '../../services/web3.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: string | null = null;
  balance: string | null = null;

  private accountSubscription?: Subscription;

  constructor(private web3: Web3Service, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.accountSubscription = this.web3.account$.subscribe(async (account) => {
      if (account) {
        this.account = account;
        this.balance = await this.web3.eth.getBalance(account);
      } else {
        await this.router.navigate(['not-supported']);
      }
    });
  }

  ngOnDestroy() {
    this.accountSubscription && this.accountSubscription.unsubscribe();
  }
}
