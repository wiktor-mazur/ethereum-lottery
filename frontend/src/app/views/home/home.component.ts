import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  account: string | null = null;
  balance: string | null = null;

  constructor(private web3: Web3Service) { }

  async ngOnInit(): Promise<void> {
    const accounts = await this.web3.eth.getAccounts()
    const firstAccount = accounts.length ? accounts[0] : null;

    if (firstAccount) {
      this.account = firstAccount;
      this.balance = await this.web3.eth.getBalance(firstAccount);
    }
  }

}
