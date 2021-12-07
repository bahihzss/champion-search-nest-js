import { Module } from '@nestjs/common'
import { UserPrismaRepository } from '../../infra/user/user.prisma.repository'
import { UserRegisterController } from './user.register.controller'
import { PrismaService } from '../../infra/shared/prisma.service'
import { UserFindByIdController } from './user.find-by-id.controller'

@Module({
  providers: [
    PrismaService,
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
  ],
  controllers: [UserRegisterController, UserFindByIdController],
})
export class UserModule {}
