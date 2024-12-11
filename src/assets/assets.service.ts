import { Injectable } from '@nestjs/common'
import { CreateAssetDto } from './dto/create-asset.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AssetsService {
  constructor(private prismaService: PrismaService) {}

  async create(createAssetDto: CreateAssetDto) {
    if (!createAssetDto.id) {
      throw new Error('Asset id is required.')
    }

    const asset = await this.prismaService.asset.findUnique({
      where: { id: createAssetDto.id },
    })

    if (asset) {
      throw new Error('Id already used in an asset.')
    }

    return this.prismaService.asset.create({
      data: {
        id: createAssetDto.id,
        symbol: createAssetDto.symbol,
      },
    })
  }

  findAll() {
    return this.prismaService.asset.findMany({})
  }
}
