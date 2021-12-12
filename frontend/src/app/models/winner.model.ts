export class Winner {
  address: string;
  prize: number;
  blockNumber: string;

  constructor(winner: Winner) {
    this.address = winner.address;
    this.prize = winner.prize;
    this.blockNumber = winner.blockNumber;
  }
}
