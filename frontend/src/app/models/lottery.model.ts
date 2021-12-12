export class Lottery {
  balance: number;
  managerAddress: number;
  players: string[];
  maxPlayers: number;

  constructor(lottery: Lottery) {
    this.balance = lottery.balance;
    this.managerAddress = lottery.managerAddress;
    this.players = lottery.players;
    this.maxPlayers = lottery.maxPlayers;
  }
}
