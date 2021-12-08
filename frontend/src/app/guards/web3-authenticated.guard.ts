import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Web3Service } from '../services/web3.service';

@Injectable()
export class Web3AuthenticatedGuard implements CanActivate {
  constructor(private web3: Web3Service, private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      await this.web3.enable();

      return true;
    } catch (e) {
      console.error(e);
      await this.router.navigate(['not-supported']);

      return false;
    }
  }
}
