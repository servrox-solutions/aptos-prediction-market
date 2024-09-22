import { marketTypes } from "../get-available-markets";

export type Address = `0x${string}`;

export interface MarketData {
  name: string;
  address: Address;
  tradingPair: { one: (typeof marketTypes)[number]; two: string };
  creator: Address;
  startPrice: number;
  startTime: number;
  endTime: number;
  minBet: number;
  upBetsSum: number;
  downBetsSum: number;
  fee: number;
  priceUp: boolean | null;
  priceDelta: number;
  upBets: Map<Address, number>;
  downBets: Map<Address, number>;
  userVotes: Map<Address, boolean>;
  upVotesSum: number;
  downVotesSum: number;
  upWinFactor: number;
  downWinFactor: number;
}

export interface MarketOld {
  key: string;
  tradingPair: string;
  store: {
    start_price: bigint;
    start_time: number;
    end_time: number;
    min_bet: number;
    up_bets_sum: number;
    down_bets_sum: number;
    up_bets: Map<
      string,
      {
        amount: number;
        timestamp: number;
      }
    >;
    down_bets: Map<
      string,
      {
        amount: number;
        timestamp: number;
      }
    >;
  };
}
