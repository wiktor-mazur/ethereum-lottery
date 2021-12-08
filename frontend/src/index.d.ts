export interface WindowEthereum {
  on: (eventName: string, callback: (...args: any[]) => void) => void;
  request?: (request: { method: string, params?: Array<any> }) => Promise<any>
}

declare global {
  interface Window {
    ethereum?: WindowEthereum;
  }
}
