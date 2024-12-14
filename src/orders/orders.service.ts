import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { OrderStatus } from './entities/order.entity'

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    if (createOrderDto.status) {
      throw new Error('Status não pode ser enviado.')
    }

    if (!createOrderDto.asset_id) {
      throw new Error('Asset_id não pode ser vazio.')
    }

    const asset = await this.prismaService.asset.findFirst({
      where: {
        id: createOrderDto.asset_id,
      },
    })

    if (!asset) {
      throw new Error('Asset não encontrado.')
    }

    return this.prismaService.order.create({
      data: {
        asset_id: createOrderDto.asset_id,
        price: createOrderDto.price,
        status: OrderStatus.PENDING,
      },
    })
  }

  findAll() {
    return this.prismaService.order.findMany({})
  }
}
