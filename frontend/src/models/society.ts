export type Society = {
  _id: string;
  name: string;
  ceo: string;
  logo: string;
  password: string;
  object: string;
  address: string;
  headquarters: string;
  creationDate: Date;
  taxIdentificationNumber: string;
  statisticalNumber: string;
  commercialRegisterNumber: string;
  status: string;
  startDateOfAccountingPeriod: Date;
  accountingCurrency: string;
  equivalentCurrencies: [
    {
      currencyID: string;
      value: number;
    }
  ];
};
