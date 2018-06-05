
export class Car
{
  _id: string;
  model: string;
  plate_no: string;
  status: string;
  capacity: string;
  fuel: string;
  drive: string;
  photo: string;
  engine: string;
  steering: string;
  pricing: Price[];
  date_created: string;
}
export class Price
{
  amount: string;
  desc: string;
  _id: string;
}
