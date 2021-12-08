import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Web3Service } from '../services/web3.service';

@Injectable()
export class Web3AuthenticatedGuard implements CanActivate {
  constructor(private web3: Web3Service, private router: Router) {}

  async canActivate(): Promise<UrlTree | true> {
    try {
      return (await this.web3.setupAccount()) ? true : this.getNotSupportedUrlTree();
    } catch (err: any) {
      console.error(err);

      return this.getNotSupportedUrlTree();
    }
  }

  private getNotSupportedUrlTree(): UrlTree {
    return this.router.parseUrl('/not-supported');
  }
}
