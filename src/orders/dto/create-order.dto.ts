import { OrderStatus } from '../entities/order.entity'

export class CreateOrderDto {
  asset_id: string
  price: number
  status: OrderStatus
}
