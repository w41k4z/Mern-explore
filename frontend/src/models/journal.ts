export type Journal = {
  _id: string;
  society: string;
  date: Date;
  code: string;
  reference: string;
  refNumber: string;
  details: [
    {
      generalAccount: string;
      thirdPartyAccount: string;
      description: string;
      debit: number;
      credit: number;
    }
  ];
};
