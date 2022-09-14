export enum Currency {
  USD = "USD $",
  DOP = "DOP $",
}

export interface Price {
  value: number;
  currency: Currency;
}
