export class Order {
  id: string
  asset_id: number
  price: number
  status: OrderStatus
  // status (open, pending, closed) (não pode deixar mandar o status no POST)
}

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}
