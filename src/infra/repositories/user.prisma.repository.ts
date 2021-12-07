import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma.service'
import { UserRepository } from '../../domain/user/user.repository'
import { User } from '../../domain/user/user.entity'

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async save(user: User) {
    await this.prisma.user.upsert({
      where: { id: user.id },
      create: user,
      update: user,
    })
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })

    return user ? User.reconstruct(user) : null
  }
}
