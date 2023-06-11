export type Journal = {
  _id?: string;
  societyID: string;
  date: Date;
  code: string;
  reference: string;
  refNumber: string;
  description?: string;
  details: [
    {
      generalAccount?: string;
      thirdPartyAccount?: string;
      debit?: number;
      credit?: number;
    }
  ];
  isClosed: boolean;
};
